<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class CommissionPeriod extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'commission_period';
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
			$osql = 'commission_period.cutoff_date';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			$where[] = "commission_period.cutoff_date LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch($f['property']){
						case 'current':
							$where['locked_at'] = 'locked_at IS NULL';
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
					$or[] = 'commission_period.'.$field.' LIKE '.$qq;
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "commission_period.cutoff_date LIKE '".addslashes($search['query'])."%'";
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	commission_period.*,
        	commission_cycle.title AS cycle_title,
        	CONCAT(commission_cycle.title, ' (', DATE_FORMAT(commission_period.cutoff_date, '%m/%d/%Y'), ')') AS text,
        	duration.description AS duration_description,
        	payments_to_process.payments
        FROM
        	(commission_period,
        	commission_cycle,
        	duration)
        	
        	/* get outstanding payments for unlocked periods */
        	LEFT JOIN (SELECT
					cp.id,
					COUNT(*) AS payments
				FROM
					(payment AS p,
					payment_duration AS pd,
					payment_type AS pt,
					duration AS d,
					client AS cl,
					territory AS t,
					employee AS e,
					commission_period AS cp,
					duration AS cpd,
					(SELECT 
							MIN(duration.date_string) AS date_string, 
							contract.*
						FROM 
							contract, 
							contract_duration, 
							duration 
						WHERE
							contract.id = contract_duration.contract_id AND
							contract_duration.duration_id = duration.id
						GROUP BY
							contract.id) AS c)
					LEFT JOIN commission_entry AS ce ON ce.payment_id = p.id AND ce.duration_id = pd.duration_id AND ce.deleted_at IS NULL
				WHERE
					p.id = pd.payment_id AND
					d.id = pd.duration_id AND
					cp.duration_id = cpd.id AND
					cp.locked_at IS NULL AND
					cp.cycle_id = t.cycle_id AND /* only this cycle's territories */
					
					p.payment_type_id = pt.id AND
					p.contract_id = c.id AND
					c.territory_id = t.id AND
					cl.id = p.client_id AND
					e.id = c.soldby_id AND
					p.deleted_at IS NULL AND
					c.deleted_at IS NULL AND
					t.deleted_at IS NULL AND
					p.postdate <= cp.cutoff_date AND
					(
						d.date_string = cpd.date_string OR /* this period's payments */
						d.date_string < cpd.date_string /* past due payments */
					) AND
					ce.id IS NULL
				GROUP BY
					cp.id
				ORDER BY
					d.date_string) AS payments_to_process ON payments_to_process.id = commission_period.id
        WHERE
        	commission_period.duration_id = duration.id AND
        	commission_period.cycle_id = commission_cycle.id AND
        	commission_period.deleted_at IS NULL
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
        	commission_period.*,
        	commission_cycle.title AS cycle_title,
    		YEAR(duration.date_string) AS period_year,
    		MONTH(duration.date_string) AS period_month,
        	duration.description AS duration_description
        FROM
        	(commission_period,
        	commission_cycle,
        	duration)
        WHERE
        	commission_period.duration_id = duration.id AND
        	commission_period.cycle_id = commission_cycle.id AND
        	commission_period.deleted_at IS NULL AND
        	commission_period.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function getTree($node = '')
    {
    	$year = $month = '';
    	if ($node){
    		if (is_numeric($node)){
    			$wsql = ' AND commission_period.id = '.$this->db->quote($node);
    		} elseif (preg_match("/^datestring_/", $node)){
    			$tmp = explode("_", $node);
    			$datestring = explode('-',$tmp[1]);
    			if (@count($datestring) == 2){
    				$year = $datestring[0];
    				$month = $datestring[1];
    			} else {
    				$year = $datestring[0];
    			}
    			$wsql = ' AND duration.date_string LIKE '.$this->db->quote($tmp[1].'%');
    		}
    	}
    	$sth = $this->db->query("SELECT
    		commission_period.*,
    		duration.date_string,
    		YEAR(duration.date_string) AS period_year,
    		MONTH(duration.date_string) AS period_month,
    		commission_cycle.title,
    		payments_to_process.payments
    	FROM
    		(commission_period,
    		commission_cycle,
    		duration)
    		
    		/* get outstanding payments for unlocked periods */
        	LEFT JOIN (SELECT
					cp.id,
					COUNT(*) AS payments
				FROM
					(payment AS p,
					payment_duration AS pd,
					payment_type AS pt,
					duration AS d,
					client AS cl,
					territory AS t,
					employee AS e,
					commission_period AS cp,
					duration AS cpd,
					(SELECT 
							MIN(duration.date_string) AS date_string, 
							contract.*
						FROM 
							contract, 
							contract_duration, 
							duration 
						WHERE
							contract.id = contract_duration.contract_id AND
							contract_duration.duration_id = duration.id
						GROUP BY
							contract.id) AS c)
					LEFT JOIN commission_entry AS ce ON ce.payment_id = p.id AND ce.duration_id = pd.duration_id AND ce.deleted_at IS NULL
				WHERE
					p.id = pd.payment_id AND
					d.id = pd.duration_id AND
					cp.duration_id = cpd.id AND
					cp.locked_at IS NULL AND
					cp.cycle_id = t.cycle_id AND /* only this cycle's territories */
					
					p.payment_type_id = pt.id AND
					p.contract_id = c.id AND
					c.territory_id = t.id AND
					cl.id = p.client_id AND
					e.id = c.soldby_id AND
					p.deleted_at IS NULL AND
					c.deleted_at IS NULL AND
					t.deleted_at IS NULL AND
					p.postdate <= cp.cutoff_date AND
					(
						d.date_string = cpd.date_string OR /* this period's payments */
						d.date_string < cpd.date_string /* past due payments */
					) AND
					ce.id IS NULL
				GROUP BY
					cp.id
				ORDER BY
					d.date_string) AS payments_to_process ON payments_to_process.id = commission_period.id
    	WHERE
    		commission_period.cycle_id = commission_cycle.id AND
    		commission_period.duration_id = duration.id AND
    		commission_period.deleted_at IS NULL
    	ORDER BY
    		duration.date_string DESC");
    	$result = array();
    	while ($r = $sth->fetch()){
    		$r['period_month'] = sprintf("%02d", $r['period_month']);
    		$r['leaf'] = false;
    		if (!isset($result[$r['period_year']])){
    			$result[$r['period_year']] = $r;
    			$result[$r['period_year']]['id'] = 'datestring_'.$r['period_year'];
    			$result[$r['period_year']]['text'] = $r['period_year'];
    		}
    		if (!isset($result[$r['period_year']]['children'][$r['period_month']])){
    			$result[$r['period_year']]['children'][$r['period_month']] = $r;
    			$result[$r['period_year']]['children'][$r['period_month']]['id'] = 'datestring_'.$r['period_year'].'-'.$r['period_month'];
    			$result[$r['period_year']]['children'][$r['period_month']]['text'] = date('F', strtotime($r['date_string']));
    		}
    		$r['text'] = $r['title'].' ('.date('m/d/Y',strtotime($r['cutoff_date'])).')';
    		$r['parentId'] = 'datestring_'.$r['period_year'].'-'.$r['period_month'];
    		$r['leaf'] = true;
    		$result[$r['period_year']]['children'][$r['period_month']]['children'][$r['id']] = $r;
    	}
    	if ($year && $month){
    		$result = $result[$year]['children'][$month]['children'];
    	} elseif ($year){
    		$result = $result[$year]['children'];
    	}
    	$result = array_values($result);
        foreach ($result as $key => $val){
        	$result[$key] = $this->array_values_recursive($val);
        }
    	return $result;
    }
      
    function array_values_recursive($arr){
		if (is_array($arr)){
			foreach($arr as $key => $val){
				if($key == 'children' && is_array($val)){
					$arr[$key] = array_values($this->array_values_recursive($val));
				} elseif (is_array($val)){
					$arr[$key] = $this->array_values_recursive($val);
				}
			}
		}
		return $arr;
	}
	
	public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
		unset($params['expanded'], $params['loaded'], $params['leaf'], $params['text'], $params['parentId'], $params['locked_at']);
		unset($params['cycle_title'], $params['duration_description'], $params['payments']);
		if (empty($params['duration_id'])){
			$error[] = 'Period is required';
		} else {
			$cp = $app['business.duration']->getById($params['duration_id']);
			if (!$cp['id']){
				$error[] = 'Invalid period specified';
			}
		}
		
		// commission cycle
		if (empty($params['cycle_id'])){
			$error[] = 'Cycle is required';
		} else {
			$cc = $app['business.commissioncycle']->getById($params['cycle_id']);
			if (!$cc['id']){
				$error[] = 'Invalid cycle specified';
			}
		}
		
		// make sure we only have 1 "unlocked" per cycle
		if (@count($error) < 1){
			$exists = $this->db->fetchAssoc("SELECT
				*
			FROM
				commission_period
			WHERE
				deleted_at IS NULL AND
				locked_at IS NULL AND
				cycle_id = :cycle_id", array('cycle_id' => $params['cycle_id']));
			if ($exists['id'] && $exists['id'] != $params['id']){
				$error[] = 'There is already an unlocked commission period for that cycle';
			}
		}
		
		// payment cutoff day
		if (empty($params['cutoff_date'])){
			$error[] = 'Payment cutoff date is required';
		} else {
			$params['cutoff_date'] = date('Y-m-d', strtotime($params['cutoff_date']));
		}
		$app['monolog']->addInfo(print_r($params, true));
				
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
    
    public function create($app, $params)
    {
    	unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $app['monolog']->addInfo(print_r($params, true));
        $this->db->insert('commission_period',$params);
        $id = $this->db->lastInsertId();
        $res = $this->getById($id);
        return $res;
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_period',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_period',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}