<?php

namespace Classes\Routes;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Commission implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];
        
        /******
		COMMISSION STATEMENTS
		******/        
        $controllers->get('/statement/', function (Application $app, Request $request) {
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
            list($totalCount, $result) = $app['business.commissionstatement']->getAll($app, $request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        	return $app->json(array("totalCount"=>$totalCount, "statement"=>$result));
        });
        
        /* cycle get */
        $controllers->get('/statement/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissionstatement']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"statement"=>$result));
        });
        
        $controllers->get('/statement/pdf/{id}', function (Application $app, $id, Request $request) {
        	if (preg_match("/,/", $id)){
        		$id = explode(",", $id);
        	}
            $res = $app['business.commissionstatement']->pdf($app, $id);
            if (isset($res['error'])){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
        		return $app->json(array("success"=>true,"totalCount"=>1, "statement"=>$res));
        	}
        });

		$controllers->put('/statement/run/{id}', function (Application $app, $id, Request $request) {
            $res = $app['business.commissionstatement']->run($app, $id);
            if (isset($res['error'])){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
        		return $app->json(array("success"=>true,"totalCount"=>$res['statements'], "statement"=>$res));
        	}
        });
        
        $controllers->put('/statement/reset/{id}', function (Application $app, $id, Request $request) {
            $res = $app['business.commissionstatement']->reset($app, $id);
            if (isset($res['error'])){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
        		return $app->json(array("success"=>true,"totalCount"=>$res['statements'], "statement"=>$res));
        	}
        });
        
        $controllers->put('/statement/lock/{id}', function (Application $app, $id, Request $request) {
            $res = $app['business.commissionstatement']->lock($app, $id);
            if (isset($res['error'])){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
        		return $app->json(array("success"=>true,"totalCount"=>$res['statements'], "statement"=>$res));
        	}
        });

		/******
		COMMISSION CYCLES
		******/
        $controllers->get('/cycle/', function (Application $app, Request $request) {
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
            list($totalCount, $result) = $app['business.commissioncycle']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        	return $app->json(array("totalCount"=>$totalCount, "cycle"=>$result));
        });
        
        /* cycle get */
        $controllers->get('/cycle/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissioncycle']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"cycle"=>$result));
        });

		/* cycle update */
		$controllers->put('/cycle/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissioncycle']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissioncycle']->update($id, $params);
            	return $app->json(array("success"=>true,"cycle"=>$result));
            }
        });
        
        /* cycle delete */
		$controllers->delete('/cycle/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissioncycle']->delete($id);
            return $app->json(array("success"=>true,"cycle"=>$result));
        });

		/* cycle create */
        $controllers->post('/cycle/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissioncycle']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissioncycle']->create($params);
            	return $app->json(array("success"=>true,"cycle"=>$result));
            }
        });
        
        /******
		COMMISSION BASELINES
		******/
        $controllers->get('/baseline/', function (Application $app, Request $request) {
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
            list($totalCount, $result) = $app['business.commissionbaseline']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        	return $app->json(array("success" =>true,"totalCount"=>$totalCount, "baseline"=>$result));
        });
        
        /* baseline get */
        $controllers->get('/baseline/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissionbaseline']->getById($id);
            return $app->json(array("success"=>true,"totalCount"=>1,"baseline"=>$result));
        });

		/* baseline update */
		$controllers->put('/baseline/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissionbaseline']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissionbaseline']->update($id, $params);
            	return $app->json(array("success"=>true,"baseline"=>$result));
            }
        });
        
        /* baseline delete */
		$controllers->delete('/baseline/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissionbaseline']->delete($id);
            return $app->json(array("success"=>true,"baseline"=>$result));
        });

		/* baseline create */
        $controllers->post('/baseline/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissionbaseline']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissionbaseline']->create($params);
            	return $app->json(array("success"=>true,"baseline"=>$result));
            }
        });
        
        /******
		COMMISSION PERIODS
		******/
        $controllers->get('/period/', function (Application $app, Request $request) {
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
            list($totalCount, $result) = $app['business.commissionperiod']->getAll($request->get('page'),$request->get('start'),$request->get('limit'),$sort,$filter,$request->get('query'),$search);
        	return $app->json(array("totalCount"=>$totalCount, "period"=>$result));
        });
        
        /* current, unlocked periods */
        $controllers->get('/period/current', function (Application $app, Request $request) {
            list($totalCount, $result) = $app['business.commissionperiod']->getAll('', '', '', '', array(array('property' => 'current', 'value' => true)));
            return $app->json(array('success'=> true,'totalCount' => $totalCount,"children"=>$result));
            //return $app->json($result);
        });
        
        /* period tree root */
        $controllers->get('/period/root', function (Application $app, Request $request) {
            $result = $app['business.commissionperiod']->getTree();
            return $app->json(array('success'=> true,"children"=>$result));
            //return $app->json($result);
        });
        
        /* period get */
        $controllers->get('/period/{id}', function(Application $app, $id, Request $request) {
        	if (is_numeric($id)){
            	$result = $app['business.commissionperiod']->getById($id);
            	$result['leaf'] = true;
            	$result['parentId'] = 'datestring_'.$result['period_year'].'-'.sprintf("%02d",$result['period_month']);
            } else {
            	$result = $app['business.commissionperiod']->getTree($id);
            }
            return $app->json(array("success"=>true,"totalCount"=>1,"children"=>$result));
        });

		/* period update */
		$controllers->put('/period/{id}', function(Application $app, $id, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissionperiod']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissionperiod']->update($id, $params);
            	return $app->json(array("success"=>true,"period"=>$result));
            }
        });
        
        /* period delete */
		$controllers->delete('/period/delete/{id}', function(Application $app, $id, Request $request) {
            $result = $app['business.commissionperiod']->delete($id);
            return $app->json(array("success"=>true,"period"=>$result));
        });

		/* period create */
        $controllers->post('/period/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $error = $app['business.commissionperiod']->validate($app, $params);
            if (@count($error) > 0){
            	return $app->json(array("success"=>false,"error"=>$error));
            } else {
            	$result = $app['business.commissionperiod']->create($app, $params);
            	return $app->json(array("success"=>true,"period"=>$result));
            }
        });
        
        
		return $controllers;
    }
}