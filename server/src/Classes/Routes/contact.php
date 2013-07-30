<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contact implements ControllerProviderInterface
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
            list($totalCount, $result) = $app['business.contact']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "contact"=>$result));
        });

        $controllers->get('/{id}', function (Application $app, $id, Request $request) {
            $contact_array = $app['business.contact']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>(isset($contact_array['id'])?1:0), "contact"=>$contact_array));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
        		$params = json_decode($request->getContent(),true);
        		$error = $app['business.contact']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.contact']->createContact($params);
            	return $app->json(array("success"=>true,"contact"=>$result));
            }
        });

        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.contact']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.contact']->updateContact($id, $params);
            	return $app->json(array("success"=>true,"contact"=>$result));
            }
        });

        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.contact']->deleteContact($id);
            return $app->json(array("success"=>true,"contact"=>$result));
        });

        return $controllers;
    }
}