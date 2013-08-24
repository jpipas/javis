<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class AdType extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'ad_type';
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
			$osql = 'ad_type.description';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			$where[] = "ad_type.description LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					$where[$f['property']] = $f['property']." = ".$qq;
        		}
			}
		
		// search criteria was passed in
		} elseif (isset($search['query']) && !empty($search['query'])){
			if (@count($search['fields']) >= 1){
				$or = array();
				$qq = $this->db->quote($search['query'].'%');
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
					$or[] = 'ad_type.'.$field.' LIKE '.$qq;
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "ad_type.description LIKE '".addslashes($search['query'])."%'";
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	ad_type.*,
        	GROUP_CONCAT(ad_size.description SEPARATOR ', ') AS ad_sizes
        FROM
        	(ad_type)
        	LEFT JOIN ad_type_size ON ad_type_size.type_id = ad_type.id
        	LEFT JOIN ad_size ON ad_size.id = ad_type_size.size_id AND ad_size.deleted_at IS NULL
        WHERE
        	ad_type.deleted_at IS NULL
        	$wsql
        GROUP BY
        	ad_type.id
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
        	ad_type.*,
        	GROUP_CONCAT(ad_size.description SEPARATOR ', ') AS ad_sizes
        FROM
        	(ad_type)
        	LEFT JOIN ad_type_size ON ad_type_size.type_id = ad_type.id
        	LEFT JOIN ad_size ON ad_size.id = ad_type_size.size_id AND ad_size.deleted_at IS NULL
        WHERE
        	ad_type.id = ? AND
        	ad_type.deleted_at IS NULL
        GROUP BY
        	ad_type.id
        ORDER BY
        	ad_type.description";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
		unset($params['ad_sizes']);
		
		if (empty($params['description'])){
			$error[] = 'Ad type description is required';
		}
		
		if (@count($params['ad_size']) < 1){
			$error[] = 'At least 1 ad size is required';
		} else {
			foreach ($params['ad_size'] as $size){
				$as = $app['business.adsize']->getById($size);
				if (!$as['id']){
					$error[] = 'Invalid ad size selected';
				}
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
    	unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $ad_sizes = $params['ad_size'];
        unset($params['ad_size']);
        $this->db->insert('ad_type',$params);
        $id = $this->db->lastInsertId();
        foreach ($ad_sizes as $size){
        	$this->db->insert('ad_type_size', array('type_id' => $id, 'size_id' => $size));
        }
        $res = $this->getById($id);
        return $res;
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
        $ad_sizes = $params['ad_size'];
        unset($params['ad_size']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('ad_type',$params, array('id' => $id));
        $this->db->delete('ad_type_size', array('type_id' => $id));
        foreach ($ad_sizes as $size){
        	$this->db->insert('ad_type_size', array('type_id' => $id, 'size_id' => $size));
        }
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('ad_type',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }

}