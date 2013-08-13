<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Territory extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'territory';
    }

    public function getAll($page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array())
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
    			$osql = 'territory.name';
    		}
    		
    		// build our search criteria
    		$where = array();
    		$wsql = '';
    		// handle query filter
    		if ($query){
    			$where[] = "territory.name LIKE '".addslashes($query)."%'";
    		
    		// handle additional filters
    		} elseif (@count($filter) > 0){
    			foreach ($filter as $f){
    				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
    					$qq = $this->db->quote($f['value']);
    					switch ($f['property']){
    						default:
    							$where[$f['property']] = 'territory.'.$f['property']." = ".$qq;
    							break;
    					}
            }
    			}
    		
    		// search criteria was passed in
    		} elseif (isset($search['query']) && !empty($search['query'])){
    			if (@count($search['fields']) >= 1){
    				$or = array();
    				$qq = $this->db->quote($search['query'].'%');
    				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
    					switch ($field){
    						case 'state_name':
    							$or[] = 'state.name LIKE '.$qq;
    							break;
    						
    						case 'manager_name':
    							$or[] = 'CONCAT(employee.first_name, \' \', employee.last_name) LIKE '.$qq;
    							break;
    						
    						default:
    							$or[] = 'territory.'.$field.' LIKE '.$qq;
    							break;
    					}
    				});
    				if (@count($or) > 0){
    					$where[] = "(".implode(' OR ', $or).")";
    				}
    			} else {
    				$parts = explode(" ", $search['query']);
	    			$where[] = "territory.name LIKE '".addslashes($search['query'])."%'";
    			}
    		}
    		if (@count($where) > 0){
    			$wsql = " AND ".implode(" AND ", $where);
    		}
    		
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	territory.*,
        	state.name AS state_name,
        	employee.username AS manager_username,
        	employee.email AS manager_email,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS manager_name
        FROM
        	(territory,
        	state)
        	LEFT JOIN employee ON employee.id = territory.manager_id AND employee.deleted_at IS NULL
        WHERE
        	territory.state_id = state.id AND
        	territory.deleted_at IS NULL
        	$wsql
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id)
    {
        $sql = "SELECT
        	territory.*,
        	state.name AS state_name,
        	employee.username AS manager_username,
        	employee.email AS manager_email,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS manager_name
        FROM
        	(territory,
        	state)
        	LEFT JOIN employee ON employee.id = territory.manager_id AND employee.deleted_at IS NULL
        WHERE
        	territory.state_id = state.id AND
        	territory.deleted_at IS NULL AND
        	territory.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

    public function getOneById($id){
        $sql = "SELECT * FROM territory WHERE id = ?";
        return $this->db->fetchAll($sql,array((int) $id));
    }
    
    public function validate(&$app, &$params)
    {
    	$error = array();
			unset($params['id'],$params['manager'], $params['state_name'], $params['manager_username'], $params['manager_email'], $params['manager_name']);
			
			// territory name is required
			if (empty($params['name'])){
				$error[] = "Territory name is required";
			}
			
			// territory state is required
			if (empty($params['state_id'])){
				$error[] = "State is required";
			}
			
			// validate publisher
			if (empty($params['manager_id'])){
				$error[] = "Territory publisher is required";
			} else {
				$manager =  $app['business.user']->getById($params['manager_id']);
	    	if (!$manager['id']){
	    		$error[] = "Invalid publisher selected";		    		
	    	}
			}
			return $error;
    }

    public function createTerritory($params) 
    {
    		unset($params['id']);
    		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('territory',$params);
        $result = $this->getById($this->db->lastInsertId());
        return $result;
    }

		public function updateTerritory($id, $params) 
    {
        $this->db->update('territory',$params, array('id'=>$id));
        $result = $this->getById($id);
        return $result;
    }

		public function deleteTerritory($id)
		{
			$now = new \DateTime('NOW');
			$params['deleted_at'] = $now->format('Y-m-d H:i:s');
      $rows = $this->db->update($this->getTableName(),$params, array('id' => $id));
      $res = $this->getById($id);
      return $res;
		}
}