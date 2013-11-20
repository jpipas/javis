<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Production implements ControllerProviderInterface
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
            list($totalCount, $result) = $app['business.production']->getAll($app, $request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "production"=>$result));
        });

		/* download */
        $controllers->get('/download/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.production']->downloadById($app, $id);
        });

		/* get */
        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.production']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"production"=>$result));
        });

		/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
            $params = array();
            $params['type_id'] = $request->get('type_id');
            $error = $app['business.production']->validate($app, $params, $request);
            //$app['monolog']->addInfo(print_r($params, true));
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error,'production'=>$params));
            } else {
            	$result = $app['business.production']->create($app, $params);
            	return $app->json(array("success"=>true,"production"=>$result));
            }
        });

		/* update */
		$controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $app['monolog']->addInfo(print_r($params, true));
            $error = $app['business.production']->validate($app, $params, $request);
            $app['monolog']->addInfo(print_r($error, true));
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.production']->update($id, $params);
            	return $app->json(array("success"=>true,"production"=>$result));
            }
        });
        
        /* delete */
		$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.production']->delete($id);
            return $app->json(array("success"=>true,"production"=>$result));
        });

        return $controllers;
    }
}