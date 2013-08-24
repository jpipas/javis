<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class AdSize extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'ad_size';
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
			$osql = 'ad_size.description';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			$where[] = "ad_size.description LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch($f['property']){
						case 'type_id':
							$where[$f['property']] = 'ad_type.id = '.$qq;
							break;
						
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
					$or[] = 'ad_size.'.$field.' LIKE '.$qq;
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "ad_size.description LIKE '".addslashes($search['query'])."%'";
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	ad_size.*
        FROM
        	(ad_size)
        	LEFT JOIN ad_type_size ON ad_type_size.size_id = ad_size.id
        	LEFT JOIN ad_type ON ad_type_size.type_id = ad_type.id AND ad_type.deleted_at IS NULL
        WHERE
        	ad_size.deleted_at IS NULL
        	$wsql
        GROUP BY
        	ad_size.id
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
        	ad_size.*
        FROM
        	(ad_size)
        	LEFT JOIN ad_type_size ON ad_type_size.size_id = ad_size.id
        	LEFT JOIN ad_type ON ad_type_size.type_id = ad_type.id AND ad_type.deleted_at IS NULL
        WHERE
        	ad_size.deleted_at IS NULL AND
        	ad_size.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

	public function getByType($type)
	{
		$sql = "SELECT
			ad_size.*
		FROM
			ad_size,
			ad_type_size
		WHERE
			ad_size.deleted_at IS NULL AND
			ad_type_size.type_id = ? AND
			ad_type_size.size_id = ad_size.id
		ORDER BY
			ad_size.description";
		return $this->db->fetchAll($sql, array($type));
	}
	
	public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
		if (empty($params['description'])){
			$error[] = 'Ad size description is required';
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
        $this->db->insert('ad_size',$params);
        $id = $this->db->lastInsertId();
        $res = $this->getById($id);
        return $res;
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('ad_size',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('ad_size',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}