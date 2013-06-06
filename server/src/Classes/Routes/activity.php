<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Activity implements ControllerProviderInterface
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
            list($totalCount, $result) = $app['business.activity']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);

            return $app->json(array("totalCount"=>$totalCount, "activity"=>$result));
        });

				/* get */
        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.activity']->getById($id);
            $result['client'] = $app['business.client']->getById($result['client_id']);
            $result['owner'] = $app['business.user']->getById($result['owner_id']);
            $result['assigned_to'] = $app['business.user']->getById($result['assigned_to_id']);
            return $app->json(array("success"=>true,"totalCount"=>1,"activity"=>$result));
        });

				/* update */
				$controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.activity']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.activity']->updateActivity($id, $params);
            	return $app->json(array("success"=>true,"activity"=>$result));
            }
        });
        
        /* delete */
				$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.activity']->deleteActivity($id);
            return $app->json(array("success"=>true,"activity"=>$result));
        });

				/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.activity']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.activity']->createActivity($params);
            	return $app->json(array("success"=>true,"activity"=>$result));
            }
        });

        return $controllers;
    }
}