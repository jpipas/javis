<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class CommissionEntry extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'commission_entry';
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
				switch ($sort['property']){
					case 'fullname':
						$order[] = 'e.last_name '.$sort['direction'];
						$order[] = 'e.first_name '.$sort['direction'];
						break;
									
					default:
						$order[] = $sort['property'].' '.$sort['direction'];
						break;
				}
			});
			$osql = implode(', ', $order);
		} else {
			$osql = "CAST(REPLACE(c.contract_number,'-','.') AS DECIMAL(10,2))";
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch($f['property']){
						case 'statement_id':
							$where[$f['property']] = '(ce.publisher_statement_id = '.$qq.' OR ce.salesrep_statement_id = '.$qq.')';
							break;
							
						default:
							$where[$f['property']] = $f['property']." = ".$qq;
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
				$qqq = $this->db->quote('%'.$search['query'].'%');
				$q = $search['query'];
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq, &$q, &$qqq){
					switch ($field){
						case 'statement_id':
							$or[] = 'ce.publisher_statement_id = '.addslashes($q);
							$or[] = 'ce.salesrep_statement_id = '.addslashes($q);
						
						default:
							$or[] = 'ce.'.$field.' LIKE '.$qq;
							break;
					}
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        		ce.*,
        		cl.company_name								AS client_company_name,
        		c.contract_number,
        		IF(p.id,pt.description,cpt.description)		AS paytype_description,
        		IF(p.id,pt.abbrev,cpt.abbrev)				AS paytype_abbrev,
        		t.name										AS territory_name,
        		p.postdate,
        		d.date_string,
        		ce.publisher_comm 							AS comm_percent,
        		ce.publisher_comm * ce.amount 				AS cpo_amount,
        		pc.abbrev									AS paycat_abbrev,
        		CONCAT(pub.first_name, ' ', pub.last_name)	AS publisher_fullname,
        		CONCAT(sr.first_name, ' ', sr.last_name)	AS salesrep_fullname
        	FROM
        		(commission_entry AS ce,
        		territory AS t,
        		payment_term AS pterm,
        		payment_type AS cpt,
        		duration AS d,
        		contract AS c,
        		client AS cl,
        		payment_category AS pc)
        		LEFT JOIN employee AS pub ON pub.id = ce.publisher_id
        		LEFT JOIN employee AS sr ON sr.id = ce.salesrep_id
        		LEFT JOIN payment AS p ON p.id = ce.payment_id
        		LEFT JOIN payment_type AS pt ON p.payment_type_id = pt.id
        	WHERE
        		ce.territory_id = t.id AND
        		ce.duration_id = d.id AND
        		ce.contract_id = c.id AND
        		c.payment_term_id = pterm.id AND
        		pterm.payment_type_id = cpt.id AND
        		c.client_id = cl.id AND
        		ce.paycat_id = pc.id AND
        		ce.deleted_at IS NULL
        		$wsql
        	ORDER BY
        		$osql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }
    
    public function getById($id)
    {
    	$sql = "SELECT SQL_CALC_FOUND_ROWS
        		ce.*,
        		cl.id										AS client_id,
        		cl.company_name								AS client_company_name,
        		c.contract_number,
        		IF(p.id,pt.description,cpt.description)		AS paytype_description,
        		IF(p.id,pt.abbrev,cpt.abbrev)				AS paytype_abbrev,
        		t.name										AS territory_name,
        		p.postdate,
        		d.date_string,
        		ce.publisher_comm 							AS comm_percent,
        		ce.publisher_comm * ce.amount 				AS cpo_amount,
        		pc.abbrev									AS paycat_abbrev,
        		CONCAT(pub.first_name, ' ', pub.last_name)	AS publisher_fullname,
        		CONCAT(sr.first_name, ' ', sr.last_name)	AS salesrep_fullname
        	FROM
        		(commission_entry AS ce,
        		territory AS t,
        		payment_term AS pterm,
        		payment_type AS cpt,
        		duration AS d,
        		contract AS c,
        		client AS cl,
        		payment_category AS pc)
        		LEFT JOIN employee AS pub ON pub.id = ce.publisher_id
        		LEFT JOIN employee AS sr ON sr.id = ce.salesrep_id
        		LEFT JOIN payment AS p ON p.id = ce.payment_id
        		LEFT JOIN payment_type AS pt ON p.payment_type_id = pt.id
        	WHERE
        		ce.territory_id = t.id AND
        		ce.duration_id = d.id AND
        		ce.contract_id = c.id AND
        		c.payment_term_id = pterm.id AND
        		pterm.payment_type_id = cpt.id AND
        		c.client_id = cl.id AND
        		ce.paycat_id = pc.id AND
        		ce.deleted_at IS NULL AND
        		ce.id = ?
        	ORDER BY
        		CAST(REPLACE(c.contract_number,'-','.') AS DECIMAL(10,2))";
        $ret = $this->db->fetchAssoc($sql,array((int) $id));
        return $ret;
    }
	
	public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
		unset($params['contract_number'], $params['paycat_abbrev'], $params['territory_name'], $params['publisher_fullname']);
		unset($params['client_company_name'], $params['postdate'], $params['date_string']);
		
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
		
		
		// do some checks when editing the sales rep
		$entry = $this->getById($params['id']);
		
		// update the sales rep statment_id if we are changing the sales rep.
		$app['monolog']->addInfo(print_r($params, true));
		if ($params['salesrep_fullname'] && is_numeric($params['salesrep_fullname'])){
			$params['salesrep_id'] = $params['salesrep_fullname'];
		}
		if (!empty($params['salesrep_id']) && $params['salesrep_id'] != $entry['salesrep_id']){
			$user = $app['business.user']->getById($params['salesrep_id']);
			if (isset($user['id'])){
				$cs = $app['business.commissionstatement']->getById(($entry['publisher_statement_id']?$entry['publisher_statement_id']:$entry['salesrep_statement_id']));
				if ($cs['id']){
					$exists = $this->db->fetchAssoc("SELECT
						cs.*
					FROM
						commission_statements AS cs
					WHERE
						employee_id = :salesrep_id AND
						period_id = :period_id AND
						locked_at IS NULL AND
						deleted_at IS NULL", array('salesrep_id' => $params['salesrep_id'], 'period_id' => $cs['period_id']));
					if (isset($exists['id'])){
						$params['salesrep_statement_id'] = $exists['id'];
					} else {
						$now = new \DateTime('NOW');
						$data = array(
							'employee_id'		=> $params['salesrep_id'],
							'period_id'			=> $cs['period_id'],
							'insert_user_id'	=> $params['insert_user_id'],
							'created_at'		=> $now->format('Y-m-d H:i:s')
						);
						$this->db->insert('commission_statements',$data);
	        			$params['salesrep_statement_id'] = $this->db->lastInsertId();
					}
				} else {
					$error[] = 'Unable to change the sales rep for the entry specified';
				}
			} else {
				$error[] = 'Invalid sales rep specified';
			}
		
		// removing the AE, clear the sales rep statement ID if it exists.
		} elseif (empty($params['salesrep_id']) && !empty($params['salesrep_statement_id'])){
			$params['salesrep_statement_id'] = null;
		}
		unset($params['salesrep_fullname']);
		$app['monolog']->addInfo(print_r($params, true));
		
		return $error;
    }
    
    public function create($params)
    {
    	unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        /*
        $this->db->insert('commission_cycle',$params);
        $id = $this->db->lastInsertId();
        $res = $this->getById($id);
        return $res;
        */
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $params['manually_adjusted'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_entry',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('commission_entry',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}