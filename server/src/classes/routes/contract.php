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

        $controllers->get('/', function (Application $app, Request $request) {
            $contract_array = $app['business.contract']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.contract']->getTotalCount($request->get('filter'));

            array_walk($contract_array,function($contract,$key) use (&$contract_array, &$app){
                $contract_array[$key]['client'] = $app['business.client']->getById($contract['client_id']);
                $contract_array[$key]['payment_type'] = $app['business.paymenttype']->getById($contract['payment_type_id']);
                $contract_array[$key]['advertisement'] = $app['business.advertisement']->getByContractId($contract['id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "contract"=>$contract_array));
        });


        return $controllers;
    }
}