<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Duration implements ControllerProviderInterface
{


    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* search */
        $controllers->get('/', function(Application $app, Request $request) {
        		$sort = '';
		    		if ($request->get('sort')){
		    			$sort = json_decode($request->get('sort'), true);
		    		}
		    		$filter = array();
		    		if ($request->get('filter')){
		    			$filter = json_decode($request->get('filter'), true);
		    		}
		    		$search = array();
		    		if ($request->get('search')){
		    			$search = json_decode($request->get('search'), true);
		    		}
            list($totalCount, $result) = $app['business.duration']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "duration"=>$result));
            /*
            $duration_array = $app['business.duration']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$request->get('filter'),$request->get('query'));
            return $app->json(array("totalCount"=>count($duration_array), "duration"=>$duration_array));
            */
        });
        return $controllers;
    }


}