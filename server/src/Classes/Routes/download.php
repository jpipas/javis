<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Download implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

		/* download a file */
        $controllers->get('/{file}', function (Application $app, $file, Request $request) {
    		$ret = $app['business.download']->downloadFile($file);
            return $app->json($ret);
        });
        
        return $controllers;
    }
}