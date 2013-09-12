<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Publication implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* search */
        $controllers->get('/', function (Application $app, Request $request) {
    		$sort = '';
    		if ($request->get('sort')){
    			$sort = json_decode($request->get('sort'), true);
    		}
    		$filter = array();
    		if ($request->get('filter')){
    			$filter = json_decode($request->get('filter'), true);
    		}
    		$search = array();
    		if ($request->get('search')){
    			$search = json_decode($request->get('search'), true);
    		}
            list($totalCount, $res) = $app['business.publication']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "publication"=>$res));
        });

		/* get */
		$controllers->get('/{id}', function(Application $app, $id, Request $request) {
	        $result = $app['business.publication']->getById($id);
	        $result['territory'] = $app['business.territory']->getById($result['territory_id']);
	        $result['postal_codes'] = $app['business.postalcode']->getByPublicationId($result['id']);
	        $result['contentcoord'] =  $app['business.user']->getById($result['contentcoord_id']);
	        $result['publisher'] =  $app['business.user']->getById($result['publisher_id']);
	        $result['baselines'] = $app['business.publication']->getBaselinesByPublication($result['id']);
	        return $app->json(array("success"=>true,"totalCount"=>($result['id']?1:0),"publication"=>$result));
	    });

		$controllers->post('/new', function(Application $app, Request $request) {
    		$params = json_decode($request->getContent(),true);
    		$error = $app['business.publication']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.publication']->create($params);
            	return $app->json(array("success"=>true,"publication"=>$result));
            }
        });

        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.publication']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.publication']->update($id, $params, $app);
            	return $app->json(array("success"=>true,"publication"=>$result));
            }
        });

        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.publication']->delete($id);
            return $app->json(array("success"=>true,"publication"=>$result));
        });

        /**
        * Route for main website content submission form
        **/
        $controllers->get('/list/', function(Application $app, Request $request){
            $postal_code = json_decode($request->get('zip'));
            $result = null;
            if($postal_code != null){
                $result = $app['business.publication']->getByPostalCode($postal_code,$app);
            }
            $success = count($result)>=1?true:false;
            $data = json_encode(array("publication"=>$result, "success"=>$success));
            $callback = $request->get('callback');
            $response = new Response($callback."(".$data.");");
            $response->headers->set('Content-Type', 'text/javascript; charset=utf-8');
            return $response;
        });

        return $controllers;
    }
}