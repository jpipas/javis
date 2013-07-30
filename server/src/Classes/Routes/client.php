<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class Client implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $client_array = array();
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
            list($totalCount, $client_array) = $app['business.client']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search, $app);


            array_walk($client_array,function($client,$key) use (&$client_array, &$app){
            		/*
            			2013-06-22 DHS
            			We don't want to do 6 additional queries for each client that is returned (ie: 50 * 6 = 301 queries instead of 1). 
            			Just pull the basics for the search grid and do these for getById()
            		*/
                //$subReq = Request::create('/user/'.$client['salesrep_id'],'GET');
                //$usr_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                //$client_array[$key]['salesrep'] = $usr_array['user'];
                //$client_array[$key]['territory'] = $app['business.territory']->getById($client['territory_id']);
                //$client_array[$key]['state'] = $app['business.state']->getById($client['state_id']);
                //$client_array[$key]['postal_code'] = $app['business.postalcode']->getById($client['postal_code_id']);
                //$client_array[$key]['remaining_months'] = $app['business.client']->getRemainingMonths($client['id']);
                // actions
                $client_array[$key]['view_action'] = false;
                $client_array[$key]['edit_action'] = false;
                $client_array[$key]['delete_action'] = false;
            });
            return $app->json(array("totalCount"=>$totalCount, "client"=>$client_array));
        });


        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $client = $app['business.client']->getById($id);
            if ($client['id']){
	            $client['territory'] = $app['business.territory']->getById($client['territory_id']);
	            $client['state'] = $app['business.state']->getById($client['state_id']);
	            $client['postal_code'] = $app['business.postalcode']->getById($client['postal_code_id']);
	            $client['salesrep'] =  $app['business.user']->getById($client['salesrep_id']);
			}
            return $app->json(array("success"=>true,"totalCount"=>($client['id']?1:1),"client"=>$client));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
        	$params = json_decode($request->getContent(),true);
            $error = $app['business.client']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$client_return = $app['business.client']->createClient($params);
            	return $app->json(array("success"=>true,"client"=>$client_return));
            }
            /*
            $user = $app['session']->get("user_token");
            $params = array("insert_user_id"=>$user['user']->getId(),"salesrep_id"=>$user['user']->getId(),"stage"=>"CUSTOMER","territory_id"=>$user['user']->getTerritoryId());
            $client_id = $app['business.client']->createClient($params);
            $subReq = Request::create('/client/'.$client_id,'GET');
            $client_return = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
            return $app->json($client_return);
            */
        });

        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.client']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$client_return = $app['business.client']->updateClient($id, $params);
            	return $app->json(array("success"=>true,"client"=>$client_return));
            }
        });

        /* delete */
        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $client_array = $app['business.client']->deleteClient($app, $id);
            return $app->json(array("success"=>true));
        });

        return $controllers;
    }
}