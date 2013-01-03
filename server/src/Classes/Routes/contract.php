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
                $contract_array[$key]['duration'] = $app['business.duration']->getByContractId($contract['id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "contract"=>$contract_array));
        });


        $controllers->get('/duration/', function(Application $app, Request $request) {
            $duration_array = $app['business.duration']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            return $app->json(array("totalCount"=>count($duration_array), "duration"=>$duration_array));
        });

        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $contract_array = $app['business.contract']->getById($id);
            $totalCount = $app['business.contract']->getTotalCount($request->get('filter'));

            array_walk($contract_array,function($contract,$key) use (&$contract_array, &$app){
                $contract_array[$key]['client'] = $app['business.client']->getById($contract['client_id']);
                $contract_array[$key]['payment_type'] = $app['business.paymenttype']->getById($contract['payment_type_id']);
                $contract_array[$key]['advertisement'] = $app['business.advertisement']->getByContractId($contract['id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "contract"=>$contract_array));
        });

        $controllers->put('/update/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $contract = $app['business.contract']->updateContract($id, $params);
            //$contract['contract_id'] = $contract['id'];

            return $app->json(array("success"=>true,"contract"=>$contract));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $contract_array = $app['business.contract']->createContract($params);

            array_walk($contract_array,function($contract,$key) use (&$contract_array, &$app){
                $contract_array[$key]['client'] = $app['business.client']->getById($contract['client_id']);
                $contract_array[$key]['payment_type'] = $app['business.paymenttype']->getById($contract['payment_type_id']);
                $contract_array[$key]['advertisement'] = $app['business.advertisement']->getByContractId($contract['id']);
            });
            return $app->json(array("success"=>true,"contract"=>$contract_array));

        });
        return $controllers;
    }


}