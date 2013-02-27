<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contact implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $contact_array = $app['business.contact']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.contact']->getTotalCount($request->get('filter'));
            return $app->json(array("totalCount"=>$totalCount['totalCount'], "contact"=>$contact_array));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $contact_array = $app['business.contact']->createContact($params);

            array_walk($contact_array,function($contact,$key) use (&$contact_array, &$app){
                $contact_array[$key]['client'] = $app['business.client']->getById($contact['client_id']);

            });

            return $app->json(array("success"=>true,"contact"=>$contact_array));
        });

        $controllers->put('/update/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $contact = $app['business.contact']->updateContact($id, $params);
            return $app->json(array("success"=>true,"contact"=>$contact));
        });
        return $controllers;
    }
}