<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class Payment implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'payment_view')){
        		return $app->json(array("totalCount"=>0, "payment"=>array()));
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
            list($totalCount, $result) = $app['business.payment']->getAll($app, $request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "payment"=>$result));
        });


        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'payment_view')){
        		return $app->json(array("totalCount"=>0, "payment"=>array()));
        	}
        	
            $result = $app['business.payment']->getById($id);
            $result['client'] = $app['business.client']->getById($result['client_id']);
            $result['contract'] = $app['business.contract']->getById($result['contract_id']);
            $result['durations'] = $app['business.duration']->getByPaymentId($result['id']);
            return $app->json(array("success"=>true,"totalCount"=>($result['id']?1:0),"payment"=>$result));
        });

		// create
		$controllers->post('/new', function(Application $app, Request $request) {
			// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'payment_create')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
			
            $params = json_decode($request->getContent(),true);
            $error = $app['business.payment']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$res = $app['business.payment']->createPayment($params);
            	return $app->json(array("success"=>true,"payment"=>$res));
            }
        });

		// update
        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'payment_edit')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
        	$params = json_decode($request->getContent(),true);
            $error = $app['business.payment']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$res = $app['business.payment']->updatePayment($id, $params);
            	return $app->json(array("success"=>true,"payment"=>$res));
            }
        });
        
        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'payment_delete')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
            //$params = json_decode($request->getContent(),true);
            $app['business.payment']->deletePayment($app, $id);
            return $app->json(array("success"=>true));
        });
        return $controllers;
    }


}