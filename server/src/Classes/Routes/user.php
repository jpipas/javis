<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class User implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* search */
        $controllers->get('/', function (Application $app, Request $request) {
        	
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'user_view')){
        		return $app->json(array("totalCount"=>0, "user"=>array()));
        	}
        	
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
            list($totalCount, $user_array) = $app['business.user']->getAll($app, $request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            //$totalCount = $app['business.user']->getTotalCount($request->get('filter'));

            array_walk($user_array,function($user,$key) use (&$user_array, &$app){
                //$user_array[$key]['territory'] = $app['business.territory']->getById($user['territory_id']);
                $user_array[$key]['fullname'] = $user['first_name']." ".$user['last_name'];
                //$user_array[$key]['manager'] = $app['business.user']->getById($user['manager_user_id']);
            });
            return $app->json(array("totalCount"=>$totalCount, "user"=>$user_array));
        });

		/* get */
	    $controllers->get('/{id}', function(Application $app, $id, Request $request) {
	    	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'user_view')){
        		return $app->json(array("success" => false, "totalCount"=>0, "user"=>array()));
        	}
        	
	        $user_array = $app['business.user']->getById($id);
	        $user_array['roles'] = $app['business.permissionrole']->getByUser($user_array['id']);
	        $user_array['manager'] = $app['business.user']->getById($user_array['manager_user_id']);
	        $user_array['regional'] = $app['business.user']->getById($user_array['regional_user_id']);
	        return $app->json(array("success"=>true,"totalCount"=>($user_array['id']?1:0),"user"=>$user_array));
	    });

		/* update */
		$controllers->put('/{id}', function(Application $app, $id, Request $request) {
			// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'user_edit')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
			
            $params = json_decode($request->getContent(),true);
            $error = $app['business.user']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$user_array = $app['business.user']->updateUser($id, $params);
            	return $app->json(array("success"=>true,"user"=>$user_array));
            }
        });
        
        /* update */
		$controllers->post('/password/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.user']->validatePassword($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$user_array = $app['business.user']->updatePassword($params);
            	return $app->json(array("success"=>true,"user"=>$user_array));
            }
        });

        /* delete */
		$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
			// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'user_delete')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
			
            $user_array = $app['business.user']->deleteUser($id);
            return $app->json(array("success"=>true,"user"=>$user_array));
        });

		/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'user_create')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
            $params = json_decode($request->getContent(),true);
            $error = $app['business.user']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$user_array = $app['business.user']->createUser($params);
            	return $app->json(array("success"=>true,"user"=>$user_array));
            }
        });

        return $controllers;
    }
}