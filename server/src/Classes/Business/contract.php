<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Contract extends AbstractBusinessService {

    public function getTableName()
    {
        return 'contract';
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
			$osql = 'contract.sale_date DESC';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){   		
			$where['query'] = 'contract.contract_number LIKE '.$this->db->quote($query.'%');
		} 
		
		// handle additional filters
		if (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					switch ($f['property']){
              
            default:
							$qq = $this->db->quote($f['value']);
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
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
					switch ($field){
						case 'soldby_name':
							$or[] = 'CONCAT(employee.first_name, \' \',employee.last_name) LIKE '.$qq;
							break;
						
						case 'client_company_name':
							$or[] = 'client.company_name LIKE '.$qq;
							break;
						
						case 'payment_term_description':
							$or[] = 'payment_term.description LIKE '.$qq;
							break;
						
						case 'territory_name':
							$or[] = 'territory.name LIKE '.$qq;
							break;
						
						default:
							$or[] = 'contract.'.$field.' LIKE '.$qq;
							break;
					}
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	contract.*,
        	CONCAT(employee.first_name, ' ',employee.last_name) AS soldby_name,
        	territory.name AS territory_name,
        	client.company_name AS client_company_name,
        	payment_term.description AS payment_term_description,
        	payment_type.id AS payment_type_id,
        	payment_type.description AS payment_type_description
        FROM
        	(contract,
        	client,
        	territory,
        	payment_term,
        	payment_type)
        	LEFT JOIN employee ON employee.id = contract.soldby_id
        WHERE
        	 contract.deleted_at IS NULL AND
        	 client.deleted_at IS NULL AND
        	 territory.deleted_at IS NULL AND
        	 contract.client_id = client.id AND
        	 contract.territory_id = territory.id AND
        	 contract.payment_term_id = payment_term.id AND
        	 payment_term.payment_type_id = payment_type.id
       	$wsql
       	GROUP BY
       		contract.id
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        
        // get durations and ads for display
        $ids= array();
        foreach ($rows as $key => $val){
        	$ids[$key] = $val['id'];
        }
        if (@count($ids) > 0){
        	$idsr = array_flip($ids);
        	
        	// durations
	        $sth = $this->db->executeQuery("SELECT
				GROUP_CONCAT(duration.description ORDER BY duration.date_string SEPARATOR ', ') AS duration_appliesto,
				contract_duration.contract_id
			FROM
				(contract_duration,
				duration)
			WHERE
				duration.id = contract_duration.duration_id AND
				contract_id IN ('".implode("', '", $ids)."')
			GROUP BY
				contract_duration.contract_id");
			while ($r = $sth->fetch()){
				if (isset($idsr[$r['contract_id']])){
					$rows[$idsr[$r['contract_id']]]['durations'] = $r['duration_appliesto'];
				}
			}
			
			// ads
			$sth = $this->db->executeQuery("SELECT
	        	advertisement.*,
	        	contract_advertisement.contract_id,
	        	client.company_name AS client_company_name,
	        	app.publication_names,
	        	ad_type.description AS ad_type_description,
	        	ad_size.description AS ad_size_description
	        FROM
	        	advertisement,
	        	client,
	        	contract_advertisement,
	        	ad_type,
	        	ad_size,
	        	(SELECT 
		        		ap.advertisement_id, 
		        		GROUP_CONCAT(publication.description ORDER BY publication.description SEPARATOR ', ') AS publication_names 
		        	FROM 
		        		advertisement_publication AS ap,
		        		publication
		        	WHERE
		        		publication.deleted_at IS NULL AND
		        		publication.id = ap.publication_id
		        	GROUP BY
		        		ap.advertisement_id) AS app
	        WHERE
	        	advertisement.deleted_at IS NULL AND
	        	client.deleted_at IS NULL AND
	        	advertisement.client_id = client.id AND
	        	advertisement.id = app.advertisement_id AND
	        	advertisement.ad_type_id = ad_type.id AND
	        	advertisement.ad_size_id = ad_size.id AND
	        	advertisement.id = contract_advertisement.advertisement_id AND
	        	contract_advertisement.contract_id IN ('".implode("', '", $ids)."')");
        	while ($r = $sth->fetch()){
				if (isset($idsr[$r['contract_id']])){
					$rows[$idsr[$r['contract_id']]]['advertisements'][] = $r;
				}
			}
		}
        return array($totalCount, $rows);
    }
    
    public function getById($id) {
        $sql = "SELECT
        	contract.*,
        	CONCAT(employee.first_name, ' ',employee.last_name) AS soldby_name,
        	territory.name AS territory_name,
        	client.company_name AS client_company_name,
        	payment_term.description AS payment_term_description,
        	payment_type.id AS payment_type_id,
        	payment_type.description AS payment_type_description
        FROM
        	(contract,
        	client,
        	territory,
        	payment_term,
        	payment_type)
        	LEFT JOIN employee ON employee.id = contract.soldby_id
        WHERE
        	 contract.deleted_at IS NULL AND
        	 client.deleted_at IS NULL AND
        	 territory.deleted_at IS NULL AND
        	 contract.client_id = client.id AND
        	 contract.territory_id = territory.id AND
        	 contract.payment_term_id = payment_term.id AND 
        	 payment_term.payment_type_id = payment_type.id AND
        	 contract.id = ?
        GROUP BY
        	contract.id";
        return $this->db->fetchAssoc($sql,array((int)$id));
    }

	public function validate(&$app, &$params)
	{
		$error = array();
		unset($params['territory_name'], $params['client_company_name'], $params['payment_term_description'], $params['client_company_name']);
		unset($params['payment_type_id'], $params['payment_type_description'], $params['soldby_name']);
		//$app['monolog']->addInfo(print_r($params, true));
		// contract number
		if (empty($params['contract_number'])){
			$error[] = "Contract number is a required field";
		}
		
		// check valid client
		if (empty($params['client_id'])){
			$error[] = 'Client is a required field';
		} else {
			$client = $app['business.client']->getById($params['client_id']);
			if (empty($client['id'])){
				$error[] = 'Invalid client specified';
			}
		}
		
		// check valid territory
		if (empty($params['territory_id'])){
			$error[] = 'Territory is a required field';
		} else {
			$territory = $app['business.territory']->getById($params['territory_id']);
			if (empty($territory['id'])){
				$error[] = 'Invalid territory specified';
			}
		}
		
		// check valid payment term
		if (empty($params['payment_term_id'])){
			$error[] = 'Payment term is a required field';
		} else {
			$paymentterm = $app['business.paymentterm']->getById($params['payment_term_id']);
			if (empty($paymentterm['id'])){
				$error[] = 'Invalid payment term specified';
			}
		}
		
		// sales date
		if (empty($params['sale_date'])){
			$error[] = "Sales date is a required field";
		} else {
			list($yr,$mon,$day) = explode("-",$params['sale_date']);
			if (!checkdate($mon,$day,$yr)){
				$error[] = "Sales date appears to be an invalid date";
			}
		}
		
		// sold by
		if (empty($params['soldby_id'])){
			$error[] = "Sold by is required";
		} else {
			$user = $app['business.user']->getById($params['soldby_id']);
			if (!$user['id']){
				$error[] = "Invalid user specified for Sold By";
			}
		}
		
		// durations
		if (@count($params['durations']) < 1){
			$error[] = "Contract duration is requried";
		}
		
		// total sales
		if (!is_numeric($params['total_sales'])){
			$error[] = "Total sales doesn't appear to be a valid number";
		}
		
		// discount, if entered, is numeric
		if (!empty($params['discount']) && !is_numeric($params['discount'])){
			$error[] = "Discount doesn't appear to be a numeric value";
		}
		
		// total amount
		if (!is_numeric($params['total_amount'])){
			$error[] = "Total amount doesn't appear to be a valid number";
		}
		
		// first months payment
		if (!is_numeric($params['first_months_payment'])) {
			$error[] = "First month's payment doesn't appear to be a numeric value";
		}
		
		// monthly payment
		if (!is_numeric($params['monthly_payment'])){
			$error[] = "Monthly payment doesn't appear to be a numeric value";
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
				
    public function createContract($params) 
    {
		$durations = $params['durations'];
		$ads = $params['advertisements'];
		unset($params['id'], $params['durations'], $params['advertisements'], $params['update_user_id']);
		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('contract',$params);
        $id = $this->db->lastInsertId();
        
        // insert durations
        foreach ($durations as $duration){
        	$this->db->insert('contract_duration', array('contract_id' => $id, 'duration_id' => $duration));
        }
        
        // insert advertisements
        foreach ($ads as $ad){
        	$this->db->insert('contract_advertisement', array('contract_id' => $id, 'advertisement_id' => $ad));
        }
        
        $contract = $this->getById($id);
        return $contract;
    }

    public function updateContract($id, $params)
    {
        $durations = $params['durations'];
		$ads = $params['advertisements'];
		unset($params['id'], $params['durations'], $params['advertisements'], $params['insert_user_id']);
    		
        $this->db->update('contract',$params, array('id' => $id));
        $this->db->delete('contract_duration',array("contract_id" => $id));
        foreach($durations as $duration){
            $this->db->insert('contract_duration', array("contract_id" => $id,"duration_id" => $duration));
        }
        
        $this->db->delete('contract_advertisement',array("contract_id" => $id));
        foreach ($ads as $ad){
        	$this->db->insert('contract_advertisement', array('contract_id' => $id, 'advertisement_id' => $ad));
        }
        
        $contract = $this->getById($id);
        return $contract;
    }

    public function deleteContract($app, $id) 
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
        return $this->db->update('contract',$params, array("id" => $id));
    }
}