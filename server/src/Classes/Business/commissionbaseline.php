<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class CommissionBaseline extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'commission_baselines';
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
			$osql = 'territory.name, publication.description';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		
		// handle additional filters
		if (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch($f['property']){
						case 'period_id':
							$where[$f['property']] = 'commission_period.id = '.$qq;
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
					$or[] = 'commission_baselines.'.$field.' LIKE '.$qq;
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
		if (isset($where['period_id'])){
	        $sql = "SELECT SQL_CALC_FOUND_ROWS
	        	commission_baselines.*,
	        	duration.description	AS duration_description,
	        	commission_period.id	AS period_id,
	        	territory.id			AS territory_id,
	        	territory.name			AS territory_name,
	        	publication.id			AS publication_id,
	        	publication.description	AS publication_description,
	        	publication.baselines	AS baselines
	        FROM
	        	(commission_period,
	        	territory,
	        	duration,
	        	(SELECT
	        		publication.*,
	        		GROUP_CONCAT(CONCAT(publication_baseline.pages,'_',publication_baseline.baseline) ORDER BY publication_baseline.pages SEPARATOR '||') AS baselines
	        	FROM
	        		(publication)
	        		LEFT JOIN publication_baseline ON publication.id = publication_baseline.publication_id
	        	WHERE
	        		publication.deleted_at IS NULL
	        	GROUP BY
	        		publication.id) AS publication)
	        	LEFT JOIN commission_baselines ON commission_baselines.period_id = commission_period.id AND commission_baselines.publication_id = publication.id AND commission_baselines.deleted_at IS NULL
	        WHERE
	        	commission_period.deleted_at IS NULL AND
	        	commission_period.cycle_id = territory.cycle_id AND
	        	commission_period.duration_id = duration.id AND
	        	territory.id = publication.territory_id AND
	        	territory.deleted_at IS NULL
	        	$wsql
	        ORDER BY
	        	$osql
	        $lsql";
	        $rows = $this->db->fetchAll($sql);
	        array_walk($rows, function($row,$key) use (&$rows){
	        	if (!empty($row['baselines'])){
	                $baselines = explode('||', $row['baselines']);
	                $newb = array();
	                foreach ($baselines as $val){
	                	list($pages, $base) = explode('_', $val);
	                	$newb[$pages] = $base;
	                }
	                $rows[$key]['baselines'] = $newb;
	            }
            });
	        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        	return array($totalCount, $rows);
        
        // if a period wasn't specified, then don't search
		} else {
			return array(0, array());
		}
    }
    
    public function getById($id)
    {
    	$sql = "SELECT SQL_CALC_FOUND_ROWS
        	commission_baselines.*,
        	duration.description	AS duration_description,
        	commission_period.id	AS period_id,
        	territory.id			AS territory_id,
        	territory.name			AS territory_name,
        	publication.id			AS publication_id,
        	publication.description	AS publication_description,
        	publication.baselines	AS baselines
        FROM
        	(commission_period,
        	territory,
        	duration,
        	(SELECT
        		publication.*,
        		GROUP_CONCAT(CONCAT(publication_baseline.pages,'_',publication_baseline.baseline) ORDER BY publication_baseline.pages SEPARATOR '||') AS baselines
        	FROM
        		(publication)
        		LEFT JOIN publication_baseline ON publication.id = publication_baseline.publication_id
        	WHERE
        		publication.deleted_at IS NULL
        	GROUP BY
        		publication.id) AS publication)
        	LEFT JOIN commission_baselines ON commission_baselines.period_id = commission_period.id AND commission_baselines.publication_id = publication.id AND commission_baselines.deleted_at IS NULL
        WHERE
        	commission_period.deleted_at IS NULL AND
        	commission_period.cycle_id = territory.cycle_id AND
        	commission_period.duration_id = duration.id AND
        	territory.id = publication.territory_id AND
        	territory.deleted_at IS NULL AND
        	commission_baselines.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
	
	public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
		unset($params['baselines'], $params['publication_description'], $params['territory_name'], $params['duration_description']);
		if (empty($params['territory_id'])){
			$error[] = 'Territory is required';
		} else {
			$exists = $app['business.territory']->getById($params['territory_id']);
			if (!isset($exists['id'])){
				$error[] = 'Invalid territory specified';
			}
		}
		
		if (empty($params['publication_id'])){
			$error[] = 'Publiation is required';
		} else {
			$exists = $app['business.publication']->getById($params['publication_id']);
			if (!isset($exists['id'])){
				$error[] = 'Invalid publication specified';
			}
		}
		
		if (empty($params['period_id'])){
			$error[] = 'Commission edition/period is required';
		} else {
			$exists = $app['business.commissionperiod']->getById($params['period_id']);
			if (!isset($exists['id'])){
				$error[] = 'Invalid commission period specified';
			} elseif (!empty($exists['locked_at'])){
				$error[] = 'Specified commission period is already locked';
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
        $this->db->insert('commission_baselines',$params);
        $id = $this->db->lastInsertId();
        $res = $this->getById($id);
        return $res;
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_baselines',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_baselines',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}