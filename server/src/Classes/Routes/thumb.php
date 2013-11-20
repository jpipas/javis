<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Thumb implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* download a file */
        $controllers->get('/{id}', function (Application $app, $id, Request $request) {
        	$w = $request->get('w');
        	$h = $request->get('h');
    		$ret = $app['business.production']->generateThumbnail($id, $w, $h);
            return $app->json($ret);
        });
        
        return $controllers;
    }
}