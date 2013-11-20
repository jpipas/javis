<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Region implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'region_view')){
        		return $app->json(array("totalCount"=>0, "region"=>array()));
        	}
        	
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
            list($totalCount, $result) = $app['business.region']->getAll($app, $request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
            return $app->json(array("totalCount"=>$totalCount, "region"=>$result));
        });
				
		$controllers->get('/{id}', function (Application $app, $id, Request $request) {
			// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'region_view')){
        		return $app->json(array("totalCount"=>0, "region"=>array()));
        	}
			
            $result = $app['business.region']->getById($id);
            $result['territories'] = $app['business.territory']->getTerritoriesByRegionId($id);
            return $app->json(array("success"=>true,"totalCount"=>(isset($result['id'])?1:0), "region"=>$result));
        });
		
		// create
        $controllers->post('/new', function(Application $app, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'region_create')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
    		$params = json_decode($request->getContent(),true);
    		$error = $app['business.region']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.region']->create($params);
            	return $app->json(array("success"=>true,"region"=>$result));
            }
        });

		// edit
        $controllers->put('/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'region_edit')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
            $params = json_decode($request->getContent(),true);
            $error = $app['business.region']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.region']->update($id, $params);
            	return $app->json(array("success"=>true,"region"=>$result));
            }
        });

		// delete
        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
        	// make sure we have the right permission
        	if (!$app['business.user']->hasPermission($app, 'region_delete')){
        		return $app->json(array("success"=>false,"error"=>array('Invalid permission')));
        	}
        	
            $result = $app['business.region']->delete($app, $id);
            return $app->json(array("success"=>true,"region"=>$result));
        });

        return $controllers;
    }
}