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
            list($totalCount, $result) = $app['business.advertisement']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        		return $app->json(array("totalCount"=>$totalCount, "advertisement"=>$result));
        });

        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.advertisement']->getById($id);

						$result['client'] = $app['business.client']->getById($result['client_id']);
            $result['publications'] = $app['business.publication']->getByAdvertisementId($result['id']);
	          $result['ad_size'] = $app['business.adsize']->getById($result['ad_size_id']);
	          $result['ad_type'] = $app['business.adtype']->getById($result['ad_type_id']);
	          if ($result['designer_id']){
	          	$result['designer'] = $app['business.user']->getById($result['designer_id']);
	          }
	          if ($result['salesrep_id']){
	          	$result['salesrep'] = $app['business.user']->getById($result['salesrep_id']);
	          }
            return $app->json(array("success"=>true,"totalCount"=>($result['id']?1:0),"advertisement"=>$result));
        });

				/* get ad types */
        $controllers->get('/type/', function (Application $app, Request $request) {
            $ad_type = $app['business.adtype']->getAll();
            return $app->json(array("totalCount"=>count($ad_type), "adType"=>$ad_type));
        });

				/* get ad sizes */
        $controllers->get('/size/', function (Application $app, Request $request) {
            $ad_size = $app['business.adsize']->getAll();
            return $app->json(array("totalCount"=>count($ad_size), "adSize"=>$ad_size));
        });
        

				/* ad list report */
        $controllers->get('/list/', function(Application $app, Request $request) {
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
        		
        		list($totalCount, $result) = $app['business.adlist']->getList($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        		return $app->json(array("totalCount"=>$totalCount,"ad_list"=>$result));
            
            //$adlist = $app['business.adlist']->getList($request->get('filter'));
            
        });

				/* update */
				$controllers->put('/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.advertisement']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.advertisement']->update($id, $params);
            	return $app->json(array("success"=>true,"advertisement"=>$result));
            }
        });
        
        /* delete */
				$controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.advertisement']->delete($id);
            return $app->json(array("success"=>true,"advertisement"=>$result));
        });

				/* create */
        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.advertisement']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.advertisement']->create($params);
            	return $app->json(array("success"=>true,"advertisement"=>$result));
            }
        });

        return $controllers;
    }
}