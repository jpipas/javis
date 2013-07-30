<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentCategory implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.paymentcategory']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            return $app->json(array("totalCount"=>$totalCount, "payment_category"=>$result));
        });


        return $controllers;
    }
}