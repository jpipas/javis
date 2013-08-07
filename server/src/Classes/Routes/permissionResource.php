<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionResource implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* search */
        $controllers->get('/', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.permissionresource']->getAll();
            return $app->json(array('success'=> true,"children"=>$result));
            //return $app->json($result);
        });
        
        /* tree root */
        $controllers->get('/root', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.permissionresource']->getAll();
            return $app->json(array('success'=> true,"children"=>$result));
            //return $app->json($result);
        });

		/* get */
        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.permissionresource']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"children"=>$result));
        });

		/* update */
		$controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.permissionresource']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.permissionresource']->update($id, $params);
            	return $app->json(array("success"=>true,"resource"=>$result));
            }
        });
        
        /* delete */
		$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.permissionresource']->delete($id);
            return $app->json(array("success"=>true,"resource"=>$result));
        });

		/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.permissionresource']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.permissionresource']->create($params);
            	return $app->json(array("success"=>true,"resource"=>$result));
            }
        });

        return $controllers;
    }
}