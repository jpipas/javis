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
            $client_array = $app['business.client']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.client']->getTotalCount($request->get('filter'));

            array_walk($client_array,function($client,$key) use (&$client_array, &$app){
                $subReq = Request::create('/user/'.$client['salesrep_id'],'GET');
                $usr_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                $client_array[$key]['salesrep'] = $usr_array['user'][0];
                $client_array[$key]['territory'] = $app['business.territory']->getById($client['territory_id']);
                $client_array[$key]['remaining_months'] = $app['business.client']->getRemainingMonths($client['id']);

            });
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "client"=>$client_array));
        });


        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $client_array = $app['business.client']->getById($id);
            $totalCount = $app['business.client']->getTotalCount($request->get('filter'));

            array_walk($client_array,function($client,$key) use (&$client_array, &$app){
                $client_array[$key]['territory'] = $app['business.territory']->getById($client['territory_id']);
                $client_array[$key]['remaining_months'] = $app['business.client']->getRemainingMonths($client['id']);
                $$subReq = Request::create('/user/'.$client['salesrep_id'],'GET');
                $usr_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                $client_array[$key]['salesrep'] = $usr_array['user'][0];
            });

            return $app->json(array("success"=>true,"totalCount"=>$totalCount['totalCount'],"client"=>$client_array));
        });

        return $controllers;
    }
}