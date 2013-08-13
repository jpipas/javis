<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Payment extends AbstractBusinessService {

    public function getTableName()
    {
        return 'payment';
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
    			$osql = 'payment.created_at DESC';
    		}
    		
    		// build our search criteria
    		$where = array();
    		$wsql = '';
    		// handle query filter
    		if ($query){
    			
    		
    		// handle additional filters
    		} elseif (@count($filter) > 0){
    			foreach ($filter as $f){
    				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
    					$qq = $this->db->quote($f['value']);
    					switch ($f['property']){
			                case 'client_id':
			                	$where[$f['property']] = "client.id = ".$qq;
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
    				array_walk($search['fields'], function($field,$key) use (&$or, &$qq, &$qqq){
    					switch ($field){
    						case 'client_id':
    							$or[] = 'client.id LIKE '.$qq;
    							break;
    							
    						case 'client_company_name':
    							$or[] = 'client.company_name LIKE '.$qq;
    							break;
    						
    						case 'contract_number':
    							$or[] = 'contract.contract_number LIKE '.$qq;
    							break;
    						
    						case 'durations':
    							$or[] = 'pd.durations LIKE '.$qqq;
    							break;
    						
    						case 'payment_type_description':
    							$or[] = 'payment_type.description LIKE '.$qq;
    							break;
    						
    						case 'payment_term_description':
    							$or[] = 'payment_term.description LIKE '.$qq;
    							break;
    						
    						case 'territory_name':
    							$or[] = 'territory.name LIKE '.$qq;
    							break;
    						
    						default:
    							$or[] = 'payment.'.$field.' LIKE '.$qq;
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
        	payment.*,
        	client.company_name AS client_company_name,
        	contract.contract_number,
        	CONCAT(territory.name,' (',state.abbr,')') AS territory_name,
        	pd.durations,
        	payment_type.description AS payment_type_description
        FROM
        	(payment,
        	client,
        	payment_type,
        	contract,
        	territory,
        	state,
        	(SELECT
        			payment_duration.payment_id,
        			GROUP_CONCAT(duration.description ORDER BY duration.date_string SEPARATOR ', ') AS durations
        		FROM
        			payment_duration,
        			payment,
		        	duration
		        WHERE
		        	payment_duration.duration_id = duration.id AND
		        	payment.id = payment_duration.payment_id AND
		        	payment.deleted_at IS NULL
		      	GROUP BY
		      		payment_duration.payment_id) AS pd
        	)
        WHERE
        	payment.deleted_at IS NULL AND
        	client.deleted_at IS NULL AND
        	payment.client_id = client.id AND
        	payment.contract_id = contract.id AND
        	payment.id = pd.payment_id AND
        	payment.payment_type_id = payment_type.id AND
        	contract.territory_id = territory.id AND
        	territory.state_id = state.id
        $wsql
       	GROUP BY
       		payment.id
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
        	payment.*,
        	client.company_name AS client_company_name,
        	contract.contract_number,
        	CONCAT(territory.name,' (',state.abbr,')') AS territory_name,
        	pd.durations,
        	payment_type.description AS payment_type_description
        FROM
        	(payment,
        	client,
        	payment_type,
        	contract,
        	territory,
        	state,
        	(SELECT
        			payment_duration.payment_id,
        			GROUP_CONCAT(duration.description ORDER BY duration.date_string SEPARATOR ', ') AS durations
        		FROM
        			payment_duration,
        			payment,
		        	duration
		        WHERE
		        	payment_duration.duration_id = duration.id AND
		        	payment.id = payment_duration.payment_id AND
		        	payment.deleted_at IS NULL
		      	GROUP BY
		      		payment_duration.payment_id) AS pd
        	)
        WHERE
        	payment.deleted_at IS NULL AND
        	client.deleted_at IS NULL AND
        	payment.client_id = client.id AND
        	payment.contract_id = contract.id AND
        	payment.id = pd.payment_id AND
        	payment.payment_type_id = payment_type.id AND
        	contract.territory_id = territory.id AND
        	territory.state_id = state.id AND
        	payment.id = ?
        GROUP BY
        	payment.id";
        return $this->db->fetchAssoc($sql,array((int)$id));
    }

	public function validate(&$app, &$params)
	{
		$error = array();
		unset($params['client_company_name'], $params['contract'], $params['territory_name']);
		unset($params['client'], $params['update_user_id'], $params['insert_user_id'], $params['updated_at'], $params['created_at']);
		unset($params['contract_number'], $params['payment_type_description']);
		
		// client
		if (empty($params['client_id'])){
			$error[] = "Client is a required field";
		} else {
			$client = $app['business.client']->getById($params['client_id']);
			if (empty($client['id'])){
				$error[] = "Invalid client specified";
			}
		}
		
		// contract
		if (empty($params['contract_id'])){
			$error[] = "Contract is a required field";
		} else {
			$contract = $app['business.contract']->getById($params['contract_id']);
			if (empty($contract['id'])){
				$error[] = "Invalid contract specified";
			}
		}
		
		// pay type
		if (empty($params['payment_type_id'])){
			$error[] = "Payment type is required";
		} else {
			$paytype = $app['business.paymenttype']->getById($params['payment_type_id']);
			if (empty($paytype['id'])){
				$error[] = "Invalid payment type specified";
			}
		}
		
		// amount
		if (empty($params['payment_amount'])){
			$error[] = "Payment amount is required";
		} elseif (!is_numeric($params['payment_amount']) || $params['payment_amount'] < 0){
			$error[] = "Amount is an invalid amount";
		}
		
		if (empty($params['postdate'])){
			$error[] = 'Recieved is a required field';
		} else {
			$params['postdate'] = date('Y-m-d', strtotime($params['postdate']));
		}
		
		// durations
		if (@count($params['durations']) < 1){
			$error[] = "Apply to duration(s) is requried";
		} elseif ($params['contract_id']) {
			$possdurations = $app['business.duration']->getByContractId($params['contract_id']);
			$durations = $params['durations'];
			foreach ($durations as $key => $val){
				foreach ($possdurations as $dur){
					if ($dur['id'] == $val){
						unset($durations[$key]);
						break;
					}
				}
			}
			if (@count($durations) > 1){
				$error[] = "Invalid apply to duration(s) specified";
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
	
    public function createPayment($params)
    {
    	$durations = $params['durations'];
		unset($params['id'], $params['durations'], $params['update_user_id']);
		
		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
		
        $this->db->insert('payment',$params);
        $id = $this->db->lastInsertId();
        
        // insert durations
        foreach ($durations as $duration){
        	$this->db->insert('payment_duration', array('payment_id' => $id, 'duration_id' => $duration));
        }
        
        $payment = $this->getById($id);
        return $payment;
    }

    public function updatePayment($id, $params)
    {
    	$durations = $params['durations'];
		unset($params['id'], $params['durations'], $params['insert_user_id']);
    		
        $this->db->update('payment',$params, array('id' => $id));
        $this->db->delete('payment_duration',array("payment_id" => $id));
        foreach($durations as $duration){
            $this->db->insert('payment_duration', array("payment_id" => $id,"duration_id" => $duration));
        }
        
        $payment = $this->getById($id);
        return $payment;
    }
    
    public function deletePayment($app, $id)
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
        return $this->db->update('payment',$params, array("id" => $id));
    }
}