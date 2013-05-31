<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\User as sfUser;

class User implements ControllerProviderInterface
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
            list($totalCount, $user_array) = $app['business.user']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
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
            $user_array = $app['business.user']->getById($id);
            $totalCount = $app['business.user']->getTotalCount($request->get('filter'));
            $user_array['territory'] = $app['business.territory']->getById($user_array['territory_id']);
            $user_array['manager'] = $app['business.user']->getById($user_array['manager_user_id']);
            $user_array['fullname'] = $user_array['first_name']." ".$user_array['last_name'];
            return $app->json(array("success"=>true,"totalCount"=>$totalCount['totalCount'],"user"=>$user_array));
        });

				/* update */
				$controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.user']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$user_array = $app['business.user']->updateUser($id, $params);
            	return $app->json(array("success"=>true,"user"=>$user_array));
            }
        });
        
        /* delete */
				$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $user_array = $app['business.user']->deleteUser($id);
            return $app->json(array("success"=>true,"user"=>$user_array));
        });

				/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
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

    public function encodePassword($username, $nonEncodedPassword, $app) {
        $user = new sfUser($username, $nonEncodedPassword);

        return $encodePassword;
    }
}