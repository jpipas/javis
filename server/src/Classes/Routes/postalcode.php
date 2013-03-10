<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Postalcode implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $postal_code_array = $app['business.postalcode']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.postalcode']->getTotalCount($request->get('filter'));
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "postal_code"=>$postal_code_array));
        });


        return $controllers;
    }
}