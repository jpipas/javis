<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ActivityStatus implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

				/* search */
        $controllers->get('/', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.activity']->getAllStatuses();
            return $app->json(array("totalCount"=>$totalCount, "activitystatus"=>array_values($result)));
        });

				/* get */
        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.activity']->getByIdStatus($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"activitystatus"=>$result));
        });

        return $controllers;
    }
}