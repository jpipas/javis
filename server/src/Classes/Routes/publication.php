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

        $controllers->get('/{id}', function (Application $app, $id, Request $request) {
            $publication_array = $app['business.publication']->getById($id);
            //$totalCount = $app['business.publication']->getTotalCount();

            array_walk($publication_array,function($publication,$key) use (&$publication_array, &$app){
                //$publication_array[$key]['publication'] = $app['business.publication']->getBypublicationId($publication['id']);
                $publication_array[$key]['territory'] = $app['business.territory']->getById($publication['territory_id']);
                $publication_array[$key]['postal_code'] = $app['business.postalcode']->getByPublicationId($publication['id']);
            });

            return $app->json(array("publication"=>$publication_array));
        });

        $controllers->put('/update/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $publication = $app['business.publication']->updatePublication($id, $params);
            return $app->json(array("success"=>true,"publication"=>$publication));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $publication_array = $app['business.publication']->createPublication($params);

            array_walk($publication_array,function($publication,$key) use (&$publication_array, &$app){
                $publication_array[$key]['territory'] = $app['business.territory']->getById($publication['territory_id']);
                $publication_array[$key]['postal_code'] = $app['business.postalcode']->getByPublicationId($publication['id']);
            });
            return $app->json(array("success"=>true,"publication"=>$publication_array));
        });

        $controllers->delete('/destroy/{id}', function(Application $app, $id, Request $request) {
            $app['business.publication']->deleteById($id);
            //$app['business.advertisement']->deleteByContractId($id);
            return $app->json(array("success"=>true));
        });
        return $controllers;
    }
}