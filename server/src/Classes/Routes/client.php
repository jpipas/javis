<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Client implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            //print_r($request->get('limit'));
            $client_array = $app['business.client']->getAll($request->get('page'),$request->get('start'),$request->get('limit'));
            $totalCount = $app['business.client']->getTotalCount($request->get('filter'));

            array_walk($client_array,function($client,$key) use (&$client_array, &$app){
                $client_array[$key]['territory'] = $app['business.territory']->getById($client['territory_id']);
            });
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "client"=>$client_array));
        });


        return $controllers;
    }
}