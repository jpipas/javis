<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Publication implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $publication_array = $app['business.publication']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.publication']->getTotalCount($request->get('filter'));

            array_walk($publication_array,function($publication,$key) use (&$publication_array, &$app){
                //$publication_array[$key]['publication'] = $app['business.publication']->getBypublicationId($publication['id']);
                $publication_array[$key]['territory'] = $app['business.territory']->getById($publication['territory_id']);
                $publication_array[$key]['postal_code'] = $app['business.postalcode']->getByPublicationId($publication['id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "publication"=>$publication_array));
        });


        return $controllers;
    }
}