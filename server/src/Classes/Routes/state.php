<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class State implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $state_array = $app['business.state']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.state']->getTotalCount($request->get('filter'));
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "state"=>$state_array));
        });

        /**
        * Route for main website content submission form
        **/
        $controllers->get('/list/', function(Application $app, Request $request){
            $state_array = $app['business.state']->getAll();
            $totalCount = $app['business.state']->getTotalCount($request->get('filter'));
            $success = count($state_array)>=1?true:false;
            $data = json_encode(array("state"=>$state_array, "success"=>$success,"total"=>$totalCount['totalCount']));
            $callback = $request->get('callback');
            $response = new Response($callback."(".$data.");");
            $response->headers->set('Content-Type', 'text/javascript; charset=utf-8');
            return $response;
        });
        return $controllers;
    }
}