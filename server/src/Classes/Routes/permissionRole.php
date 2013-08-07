<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionRole implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* search */
        $controllers->get('/', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.permissionrole']->getAll();
            return $app->json(array('success'=> true,"totalCount"=>$totalCount,"role"=>$result));
            //return $app->json($result);
        });
        
		/* get */
        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.permissionrole']->getById($id);
            $result['resources'] = $app['business.permissionresource']->getByRole($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"role"=>$result));
        });

		/* update */
		$controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.permissionrole']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.permissionrole']->update($id, $params);
            	return $app->json(array("success"=>true,"role"=>$result));
            }
        });
        
        /* delete */
		$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.permissionrole']->delete($id);
            return $app->json(array("success"=>true,"role"=>$result));
        });

		/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.permissionrole']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.permissionrole']->create($params);
            	return $app->json(array("success"=>true,"role"=>$result));
            }
        });

        return $controllers;
    }
}