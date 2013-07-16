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
            //$totalCount = $app['business.advertisement']->getTotalCount($request->get('filter'));
            $user = $app['session']->get("user_token");
            array_walk($advertisement_array,function($advertisement,$key) use (&$advertisement_array, &$app, &$user){
                $advertisement_array[$key]['publication'] = $app['business.publication']->getByAdvertisementId($advertisement['id']);
                $advertisement_array[$key]['ad_size'] = $app['business.adsize']->getById($advertisement['ad_size_id']);
                $advertisement_array[$key]['ad_type'] = $app['business.adtype']->getById($advertisement['ad_type_id']);
                $roles = $user['user']->getRoles();
                //$app['monolog']->info($roles[0]);
                switch($roles[0]){
                  case 'ROLE_ADMIN':
                    $advertisement_array[$key]['view_action'] = false;
                    $advertisement_array[$key]['edit_action'] = false;
                    $advertisement_array[$key]['delete_action'] = false;
                }
            });

            return $app->json(array("totalCount"=>count($advertisement_array), "advertisement"=>$advertisement_array));
        });

        $controllers->get('/{id}', function(Application $app, $id, Request $request) {
            $advertisement_array = $app['business.advertisement']->getById($id);
            //$totalCount = $app['business.advertisement']->getTotalCount($request->get('filter'));

            array_walk($advertisement_array,function($advertisement,$key) use (&$advertisement_array, &$app){
                //$advertisement_array[$key]['publication'] = $app['business.publication']->getByAdvertisementId($advertisement['id']);
                $advertisement_array[$key]['ad_size'] = $app['business.adsize']->getById($advertisement['ad_size_id']);
                $advertisement_array[$key]['ad_type'] = $app['business.adtype']->getById($advertisement['ad_type_id']);
                $pubArray = array();
                foreach($app['business.publication']->getByAdvertisementId($advertisement['id']) as $publication){
                    settype($publication['id'], "integer");
                    array_push($pubArray,$publication['id']);
                }
                $advertisement_array[$key]['publications'] = $pubArray;
            });

            return $app->json(array("success"=>true,"advertisement"=>$advertisement_array));
        });

        $controllers->get('/type/', function (Application $app, Request $request) {
            $ad_type = $app['business.adtype']->getAll();
            return $app->json(array("totalCount"=>count($ad_type), "adType"=>$ad_type));
        });

        $controllers->get('/size/', function (Application $app, Request $request) {
            $ad_size = $app['business.adsize']->getAll();
            return $app->json(array("totalCount"=>count($ad_size), "adSize"=>$ad_size));
        });

        $controllers->post('/new', function(Application $app, Request $request) {
            $params = json_decode($request->getContent(),true);
            $user = $app['session']->get("user_token");
            $params['insert_user_id'] = $user['user']->getId();
            $advertisement = $app['business.advertisement']->createAdvertisement($params);
            return $app->json(array("success"=>true,"advertisement"=>$advertisement));

        });

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

        $controllers->delete('/delete/{id}', function(Application $app, $id, Request $request) {
            //$params = json_decode($request->getContent(),true);
            $app['business.advertisement']->deleteById($id);
            //$app['business.advertisement']->deleteByContractId($id);
            return $app->json(array("success"=>true));
        });

        return $controllers;
    }
}