<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Region extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'region';
    }

    public function getAll(&$app, $page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array())
    {
		// limit our search results
		$lsql = '';
		if (is_numeric($start) && is_numeric($limit)){
    			$lsql = " LIMIT $start, $limit";
		}
		
		// sort our results
		if (is_array($sort)){
			$order = array();
			array_walk($sort, function($sort, $key) use (&$order){
				$order[] = $sort['property'].' '.$sort['direction'];
			});
			$osql = implode(', ', $order);
		} else {
			$osql = 'region.title';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			$where[] = "region.title LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch ($f['property']){
						default:
							$where[$f['property']] = 'region.'.$f['property']." = ".$qq;
							break;
					}
        		}
			}
		}
		
		// search criteria was passed in
		if (isset($search['query']) && !empty($search['query'])){
			if (@count($search['fields']) >= 1){
				$or = array();
				$qq = $this->db->quote($search['query'].'%');
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
					switch ($field){						
						case 'manager_name':
							$parts = explode(" ", $q);
			    			if (@count($parts) == 2){
			    				$or[] = "(employee.first_name LIKE '".addslashes($parts[0])."%' AND employee.last_name LIKE '".addslashes($parts[1])."%')";
			    			} else {
			    				$or[] = "(employee.first_name LIKE '".addslashes($q)."%' OR employee.last_name LIKE '".addslashes($q)."%')";
			    			}
							break;
						
						case 'territories':
							$or[] = "territory.name LIKE ".$qq;
						
						default:
							$or[] = 'region.'.$field.' LIKE '.$qq;
							break;
					}
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "region.title LIKE '".addslashes($search['query'])."%'";
			}
		}
		
		// see if we need to limit what they can see
		if ($app['business.user']->hasPermission($app, 'region_view_limit')){
    		$tids = $app['business.user']->getUserVisibleTerritories($app);
    		$where[] = "(territory.id IN ('".implode("', '", $tids)."'))";
    	}
		
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
    		
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	region.*,
        	GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS manager_name
        FROM
        	(region)
        	LEFT JOIN employee ON employee.id = region.manager_id AND employee.deleted_at IS NULL
        	LEFT JOIN territory ON territory.region_id = region.id AND territory.deleted_at IS NULL
        	LEFT JOIN territory AS t ON t.region_id = region.id AND t.deleted_at IS NULL
        WHERE
        	region.deleted_at IS NULL
        	$wsql
        GROUP BY
        	region.id
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id)
    {
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	region.*,
        	GROUP_CONCAT(territory.name ORDER BY territory.name SEPARATOR ', ') AS territories,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS manager_name
        FROM
        	(region)
        	LEFT JOIN employee ON employee.id = region.manager_id AND employee.deleted_at IS NULL
        	LEFT JOIN territory ON territory.region_id = region.id AND territory.deleted_at IS NULL
        WHERE
        	region.deleted_at IS NULL AND
        	region.id = ?
        GROUP BY
        	region.id";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function validate(&$app, &$params)
    {
    	$error = array();
		unset($params['id'],$params['manager'], $params['manager_name'], $params['cycle_title']);
		
		// territory name is required
		if (empty($params['title'])){
			$error[] = "Region title is required";
		}
		
		// validate publisher
		if (empty($params['manager_id'])){
			$error[] = "Regional manager is required";
		} else {
			$manager =  $app['business.user']->getById($params['manager_id']);
	    	if (!$manager['id']){
	    		$error[] = "Invalid manager selected";		    		
	    	}
		}
		
		// set the creator, updator, owner
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		$params['insert_user_id'] = $params['update_user_id'] = $ownerid;
		return $error;
    }

    public function create($params) 
    {
		$territories = $params['territories'];
		unset($params['id'], $params['update_user_id'], $params['territories']);
		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('region',$params);
        $id = $this->db->lastInsertId();
        
        // update territories
        if (is_array($territories)){
        	foreach ($territories as $tid){
        		$this->db->update('territory', array('region_id' => $id), array('id' => $tid));
        	}
        }
        
        $result = $this->getById($id);
        return $result;
    }

	public function update($id, $params) 
    {
    	$territories = $params['territories'];
		unset($params['id'], $params['update_user_id'], $params['territories']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $this->db->update('region',$params, array('id'=>$id));
        
        // update territories
        $this->db->update('territory', array('region_id' => NULL), array('region_id' => $id));
        if (is_array($territories)){
        	foreach ($territories as $tid){
        		$this->db->update('territory', array('region_id' => $id), array('id' => $tid));
        	}
        }
        
        $result = $this->getById($id);
        return $result;
    }

	public function delete(&$app, $id)
	{
		$userid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$userid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
    	$now = new \DateTime('NOW');
    	$params = array(
    		'deleted_at' 		=> $now->format('Y-m-d H:i:s'),
    		'update_user_id'	=> $userid
    	);
        return $this->db->update('region',$params, array("id" => $id));
	}
}