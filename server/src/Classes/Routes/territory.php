<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Territory implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

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
            list($totalCount, $result) = $app['business.territory']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "territory"=>$result));
        });
				
				$controllers->get('/{id}', function (Application $app, $id, Request $request) {
            $result = $app['business.territory']->getById($id);
            if ($result['id']){
	            $result['state'] = $app['business.state']->getById($result['state_id']);
	            $result['manager'] =  $app['business.user']->getById($result['manager_id']);
	          }
            return $app->json(array("success"=>true,"totalCount"=>(isset($result['id'])?1:0), "territory"=>$result));
        });
		    
        $controllers->post('/new', function(Application $app, Request $request) {
        		$params = json_decode($request->getContent(),true);
        		$error = $app['business.territory']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.territory']->createTerritory($params);
            	return $app->json(array("success"=>true,"territory"=>$result));
            }
        });

        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.territory']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.territory']->updateTerritory($id, $params);
            	return $app->json(array("success"=>true,"territory"=>$result));
            }
        });

        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.territory']->deleteTerritory($id);
            return $app->json(array("success"=>true,"territory"=>$result));
        });

        return $controllers;
    }
}