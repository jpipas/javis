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
            /*
            $duration_array = $app['business.duration']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'),$request->get('query'));
            return $app->json(array("totalCount"=>count($duration_array), "duration"=>$duration_array));
            */
        });

        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
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
        		$params = json_decode($request->getContent(),true);
            $error = $app['business.contract']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$contract = $app['business.contract']->updateContract($id, $params);
            	return $app->json(array("success"=>true,"contract"=>$contract));
            }
        });

				/*
        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $contract_array = $app['business.contract']->createContract($params);

            array_walk($contract_array,function($contract,$key) use (&$contract_array, &$app){
                $contract_array[$key]['client'] = $app['business.client']->getById($contract['client_id']);
                $contract_array[$key]['payment_term'] = $app['business.paymentterm']->getById($contract['payment_term_id']);
                $contract_array[$key]['advertisement'] = $app['business.advertisement']->getByContractId($contract['id']);
                $contract_array[$key]['territory'] = $app['business.territory']->getById($contract['territory_id']);
            });
            return $app->json(array("success"=>true,"contract"=>$contract_array));

        });
       	*/

        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            //$params = json_decode($request->getContent(),true);
            $app['business.contract']->deleteById($id);
            $app['business.advertisement']->deleteByContractId($id);
            return $app->json(array("success"=>true));
        });

        return $controllers;
    }


}