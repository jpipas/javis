<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ActivityType implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

				/* search */
        $controllers->get('/', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.activity']->getAllTypes();
            return $app->json(array("totalCount"=>$totalCount, "activitytype"=>array_values($result)));
        });

				/* get */
        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.activity']->getByIdType($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"activitytype"=>$result));
        });

        return $controllers;
    }
}