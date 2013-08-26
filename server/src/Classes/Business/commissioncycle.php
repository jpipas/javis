<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class CommissionCycle extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'commission_cycle';
    }

    public function getAll($page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array()) 
    {
    	// limit our search results
		$lsql = '';
		// don't limit our return for this data set
		/*
		if (is_numeric($start) && is_numeric($limit)){
    			$lsql = " LIMIT $start, $limit";
		}
		*/
		
		// sort our results
		if (is_array($sort)){
			$order = array();
			array_walk($sort, function($sort, $key) use (&$order){
				$order[] = $sort['property'].' '.$sort['direction'];
			});
			$osql = implode(', ', $order);
		} else {
			$osql = 'commission_cycle.title';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			$where[] = "commission_cycle.title LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch($f['property']){
						default:
							$where[$f['property']] = $f['property']." = ".$qq;
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
					$or[] = 'commission_cycle.'.$field.' LIKE '.$qq;
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "commission_cycle.title LIKE '".addslashes($search['query'])."%'";
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	commission_cycle.*
        FROM
        	(commission_cycle)
        WHERE
        	commission_cycle.deleted_at IS NULL
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
    	$sql = "SELECT SQL_CALC_FOUND_ROWS
        	commission_cycle.*
        FROM
        	(commission_cycle)
        WHERE
        	commission_cycle.deleted_at IS NULL AND
        	commission_cycle.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
	
	public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
		if (empty($params['title'])){
			$error[] = 'Cycle title is required';
		}
		
		// payment cutoff day
		if (empty($params['paymentcutoffday'])){
			$error[] = 'Payment due date is a required field';
		} elseif (!is_numeric($params['paymentcutoffday']) || $params['paymentcutoffday'] < 1 || $params['paymentcutoffday'] > 31) {
			$error[] = 'Invalid day of the month for payment cutoff day (must be between 1 and 31)';
		}
		
		// apply to period
		if (empty($params['applyperiodmonths'])){
			$error[] = 'Apply to months is a required field';
		} elseif (!is_numeric($params['applyperiodmonths'])){
			$error[] = 'Invalid number for apply to months';
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
    	unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('commission_cycle',$params);
        $id = $this->db->lastInsertId();
        $res = $this->getById($id);
        return $res;
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_cycle',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_cycle',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}