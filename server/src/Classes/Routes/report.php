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
        
        /*
        	PERIOD SALES BY TERRITORY
        */
        $controllers->post('/periodsalesbyterritory/new', function (Application $app, Request $request) {
        	$params = json_decode($request->getContent(),true);
        	$res = $app['business.reportperiodsalesterritory']->periodSalesByTerritory($app, $params['criteria'], '', 'xlsx');
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
            	return $app->json(array("success"=>true,'totalCount' => 1, "report"=>$res));
            }
        });
        
        $controllers->get('/periodsalesbyterritory/{node}', function (Application $app, $node, Request $request) {
    		$criteria = array();
    		if ($request->get('duration_id')){
    			$criteria['duration_id'] = $request->get('duration_id');
    		}
    		if ($request->get('territory_id')){
    			$criteria['territory_id'] = $request->get('territory_id');
    		}
        	$res = $app['business.reportperiodsalesterritory']->periodSalesByTerritory($app, $criteria, $node);
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,'totalCount' => 0));
            } else {
        		return $app->json(array("success"=>true,'totalCount' => @count($res), "children"=>$res));
        	}
        });
        
        /*
        	PERIOD SALES BY SALES REP
        */
        $controllers->post('/periodsalesbysalesrep/new', function (Application $app, Request $request) {
        	$params = json_decode($request->getContent(),true);
        	$res = $app['business.reportperiodsalesrep']->periodSalesBySalesRep($app, $params['criteria'], '', 'xlsx');
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
            	return $app->json(array("success"=>true,'totalCount' => 1, "report"=>$res));
            }
        });
        
        $controllers->get('/periodsalesbysalesrep/{node}', function (Application $app, $node, Request $request) {
    		$criteria = array();
    		if ($request->get('duration_id')){
    			$criteria['duration_id'] = $request->get('duration_id');
    		}
    		if ($request->get('soldby_id')){
    			$criteria['soldby_id'] = $request->get('soldby_id');
    		}
        	$res = $app['business.reportperiodsalesrep']->periodSalesBySalesRep($app, $criteria, $node);
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,'totalCount' => 0));
            } else {
        		return $app->json(array("success"=>true,'totalCount' => @count($res), "children"=>$res));
        	}
        });
        
        /*
        	CONTRACT METRIC REPORTS
        */
        $controllers->post('/contractmetrics/new', function (Application $app, Request $request) {
        	$params = json_decode($request->getContent(),true);
        	$res = $app['business.reportcontractmetrics']->getReport($app, $params['criteria'], '', 'xlsx');
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,"error"=>$res['error']));
            } else {
            	return $app->json(array("success"=>true,'totalCount' => 1, "report"=>$res));
            }
        });
        
        $controllers->get('/contractmetrics/{node}', function (Application $app, $node, Request $request) {
    		$criteria = array();
    		if ($request->get('duration_id')){
    			$criteria['duration_id'] = $request->get('duration_id');
    		}
    		if ($request->get('soldby_id')){
    			$criteria['soldby_id'] = $request->get('soldby_id');
    		}
    		if ($request->get('territory_id')){
    			$criteria['territory_id'] = $request->get('territory_id');
    		}
    		if ($request->get('region_id')){
    			$criteria['region_id'] = $request->get('region_id');
    		}
        	$res = $app['business.reportcontractmetrics']->getReport($app, $criteria, $node);
        	if (isset($res['error']) && @count($res['error']) > 0){
            	return $app->json(array("success"=>false,'totalCount' => 0));
            } else {
        		return $app->json(array("success"=>true,'totalCount' => @count($res), "children"=>$res));
        	}
        });
        
		return $controllers;
    }
}