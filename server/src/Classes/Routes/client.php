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
            //print_r($request->get('limit'));
            $client_array = array();
            if($request->get('search')){
                $client_array = $app['business.client']->searchForClient($request->get('search'),$request->get('page'),$request->get('start'),$request->get('limit'),FALSE,$request->get('sort'));
                $totalCount['totalCount'] = count($app['business.client']->searchForClient($request->get('search'),$request->get('page'),$request->get('start'),$request->get('limit'),TRUE,$request->get('sort')));
            } else {
                $client_array = $app['business.client']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'),$request->get('sort'));
                $totalCount = $app['business.client']->getTotalCount($request->get('filter'));
            }


            array_walk($client_array,function($client,$key) use (&$client_array, &$app){
                $subReq = Request::create('/user/'.$client['salesrep_id'],'GET');
                $usr_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                $client_array[$key]['salesrep'] = $usr_array['user'];
                $client_array[$key]['territory'] = $app['business.territory']->getById($client['territory_id']);
                $client_array[$key]['state'] = $app['business.state']->getById($client['state_id']);
                $client_array[$key]['postal_code'] = $app['business.postalcode']->getById($client['postal_code_id']);
                $client_array[$key]['remaining_months'] = $app['business.client']->getRemainingMonths($client['id']);

            });
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "client"=>$client_array));
        });


        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $client_array = $app['business.client']->getById($id);
            $totalCount = $app['business.client']->getTotalCount($request->get('filter'));

            array_walk($client_array,function($client,$key) use (&$client_array, &$app){
                $client_array[$key]['territory'] = $app['business.territory']->getById($client['territory_id']);
                $client_array[$key]['state'] = $app['business.state']->getById($client['state_id']);
                $client_array[$key]['postal_code'] = $app['business.postalcode']->getById($client['postal_code_id']);
                $client_array[$key]['remaining_months'] = $app['business.client']->getRemainingMonths($client['id']);
                $subReq = Request::create('/user/'.$client['salesrep_id'],'GET');
                $usr_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                $client_array[$key]['salesrep'] =  $usr_array['user'];

            });

            return $app->json(array("success"=>true,"totalCount"=>$totalCount['totalCount'],"client"=>$client_array));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $user = $app['session']->get("user_token");
            $params = array("insert_user_id"=>$user['user']->getId(),"salesrep_id"=>$user['user']->getId(),"stage"=>"CUSTOMER","territory_id"=>$user['user']->getTerritoryId());
            $client_id = $app['business.client']->createClient($params);
            $subReq = Request::create('/client/'.$client_id,'GET');
            $client_return = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
            return $app->json($client_return);
        });

        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $client_id = $app['business.client']->updateClient($id, $params);
            $subReq = Request::create('/client/'.$client_id,'GET');
            $client_return = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
            return $app->json($client_return);
        });

        return $controllers;
    }
}