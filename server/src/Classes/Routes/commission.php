<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Commission implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/******
		COMMISSION CYCLES
		******/
        $controllers->get('/cycle/', function (Application $app, Request $request) {
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
            list($totalCount, $result) = $app['business.commissioncycle']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        	return $app->json(array("totalCount"=>$totalCount, "cycle"=>$result));
        });
        
        /* cycle get */
        $controllers->get('/cycle/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissioncycle']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"cycle"=>$result));
        });

		/* cycle update */
		$controllers->put('/cycle/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissioncycle']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissioncycle']->update($id, $params);
            	return $app->json(array("success"=>true,"cycle"=>$result));
            }
        });
        
        /* cycle delete */
		$controllers->delete('/cycle/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissioncycle']->delete($id);
            return $app->json(array("success"=>true,"cycle"=>$result));
        });

		/* cycle create */
        $controllers->post('/cycle/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissioncycle']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissioncycle']->create($params);
            	return $app->json(array("success"=>true,"cycle"=>$result));
            }
        });
        
        
        
		return $controllers;
    }
}