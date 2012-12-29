<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Advertisement implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
            $advertisement_array = $app['business.advertisement']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'));
            $totalCount = $app['business.advertisement']->getTotalCount($request->get('filter'));

            array_walk($advertisement_array,function($advertisement,$key) use (&$advertisement_array, &$app){
                //$advertisement_array[$key]['publication'] = $app['business.publication']->getByAdvertisementId($advertisement['id']);
                $advertisement_array[$key]['ad_size'] = $app['business.adsize']->getById($advertisement['ad_size_id']);
                $advertisement_array[$key]['ad_type'] = $app['business.adtype']->getById($advertisement['ad_type_id']);
            });

            return $app->json(array("totalCount"=>$totalCount['totalCount'], "advertisement"=>$advertisement_array));
        });


        return $controllers;
    }
}