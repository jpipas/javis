<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Resources implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];
        
        $controllers->get('/photos/upload/', function (Application $app, Request $request) {
        	return $app['twig']->render('upload_photos.html', array( ) );
        });        
        
		return $controllers;
    }
}