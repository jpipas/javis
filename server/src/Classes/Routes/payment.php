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
            $payment_array = $app['business.payment']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.payment']->getTotalCount($request->get('filter'));

            array_walk($payment_array,function($payment,$key) use (&$payment_array, &$app){
                $subReq = Request::create('/client/'.$payment['client_id'],'GET');
                $cl_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(), true);
                $payment_array[$key]['client'] = $cl_array['client'][0];
                $payment_array[$key]['payment_type'] = $app['business.paymenttype']->getById($payment['payment_type_id']);
                $payment_array[$key]['contract'] = $app['business.contract']->getById($payment['contract_id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "payment"=>$payment_array));
        });


        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $payment_array = $app['business.payment']->getById($id);
            $totalCount = $app['business.payment']->getTotalCount($request->get('filter'));

            array_walk($payment_array,function($payment,$key) use (&$payment_array, &$app){
                $subReq = Request::create('/client/'.$payment['client_id'],'GET');
                $cl_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                $payment_array[$key]['client'] = $cl_array['client'][0];
                $payment_array[$key]['payment_type'] = $app['business.paymenttype']->getById($payment['payment_type_id']);
                $payment_array[$key]['contract'] = $app['business.contract']->getById($payment['contract_id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "payment"=>$payment_array));
        });

        $controllers->put('/update/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $payment = $app['business.payment']->updatepayment($id, $params);
            return $app->json(array("success"=>true,"payment"=>$payment));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $payment_array = $app['business.payment']->createPayment($params);

            array_walk($payment_array,function($payment,$key) use (&$payment_array, &$app){
                $subReq = Request::create('/client/'.$payment['client_id'],'GET');
                $cl_array = json_decode($app->handle($subReq,HttpKernelInterface::SUB_REQUEST, false)->getContent(),true);
                $payment_array[$key]['client'] = $cl_array['client'][0];
                $payment_array[$key]['payment_type'] = $app['business.paymenttype']->getById($payment['payment_type_id']);
                $payment_array[$key]['contract'] = $app['business.contract']->getById($payment['contract_id']);
            });
            return $app->json(array("success"=>true,"payment"=>$payment_array));

        });
        return $controllers;
    }


}