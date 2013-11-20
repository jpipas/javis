<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contract implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* search */
        $controllers->get('/', function (Application $app, Request $request) {
        	
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'contract_view')){
        		return $app->json(array("totalCount"=>0, "contract"=>array()));
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
            list($totalCount, $result) = $app['business.contract']->getAll($app, $request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);

            return $app->json(array("totalCount"=>$totalCount, "contract"=>$result));
        });


        $controllers->get('/duration/', function(Application $app, Request $request) {
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
            list($totalCount, $result) = $app['business.duration']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "duration"=>$result));
        });

        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'contract_view')){
        		return $app->json(array("success"=>false, "totalCount"=>0, "contract"=>array()));
        	}
        	
            $contract = $app['business.contract']->getById($id);

			$contract['client'] = $app['business.client']->getById($contract['client_id']);
			$contract['payment_term'] = $app['business.paymentterm']->getById($contract['payment_term_id']);
			$contract['advertisements'] = $app['business.advertisement']->getByContractId($contract['id']);
			$contract['territory'] = $app['business.territory']->getById($contract['territory_id']);
			$contract['durations'] = $app['business.duration']->getByContractId($contract['id']);

            return $app->json(array("success"=>true,"totalCount"=>($contract['id']?1:0), "contract"=>$contract));
        });

		// create
		$controllers->post('/new', function(Application $app, Request $request) {
			// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'contract_create')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
            $params = json_decode($request->getContent(),true);
            $error = $app['business.contract']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$contract = $app['business.contract']->createContract($params);
            	return $app->json(array("success"=>true,"contract"=>$contract));
            }
        });

		// update
        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'contract_edit')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
        	$params = json_decode($request->getContent(),true);
            $error = $app['business.contract']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$contract = $app['business.contract']->updateContract($id, $params);
            	return $app->json(array("success"=>true,"contract"=>$contract));
            }
        });

        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'contract_delete')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
            //$params = json_decode($request->getContent(),true);
            $app['business.contract']->deleteContract($app, $id);
            $app['business.advertisement']->deleteByContractId($id);
            return $app->json(array("success"=>true));
        });

        return $controllers;
    }


}