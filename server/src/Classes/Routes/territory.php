<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Territory implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $territory_array = $app['business.territory']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.territory']->getTotalCount($request->get('filter'));

            array_walk($territory_array,function($territory,$key) use (&$territory_array, &$app){
                //$publication_array[$key]['publication'] = $app['business.publication']->getBypublicationId($publication['id']);
                $territory_array[$key]['state'] = $app['business.state']->getById($territory['state_id']);
                $territory_array[$key]['manager'] = $app['business.user']->getById($territory['manager_id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "territory"=>$territory_array));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $territory_array = $app['business.territory']->createUser($params);
            return $app->json(array("success"=>true,"territory"=>$territory_array));
        });



        return $controllers;
    }
}