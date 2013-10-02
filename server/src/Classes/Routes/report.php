<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Report implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];
        
        $controllers->post('/periodsalesbyterritory/new', function (Application $app, Request $request) {
        	$params = json_decode($request->getContent(),true);
        	$res = $app['business.report']->periodSalesByTerritory($app, $params['criteria']);
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
            	return $app->json(array("success"=>true,'totalCount' => 1, "report"=>$res));
            }
        });
        
		return $controllers;
    }
}