<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentType implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $payment_array = $app['business.paymenttype']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.paymenttype']->getTotalCount($request->get('filter'));
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "payment_type"=>$payment_array));
        });


        return $controllers;
    }
}