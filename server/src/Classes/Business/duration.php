<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Duration extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'duration';
    }

    public function getAll($page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array())
    {
        // limit our search results
        $lsql = '';
        /*
        7/25/2013 - DHS - don't limit these right now
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
    			$osql = 'duration.date_string ASC';
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
    						case '':
    							break;
    							
                case 'payment_window':
                	$where[$f['property']] = "duration.id NOT IN (SELECT
                		contract_duration.duration_id 
                	FROM
                		(payment,
                		payment_duration, 
                		contract_duration)
                	WHERE 
                		payment.id = payment_duration.payment_id AND
                		payment.contract_id = contract_duration.contract_id AND
                		payment_duration.duration_id = contract_duration.duration_id AND
                		payment.deleted_at IS NULL AND
                		payment.contract_id = ".$qq.")";
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
    				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
    					switch ($field){
    						
    						default:
    							$or[] = 'duration.'.$field.' LIKE '.$qq;
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
        	duration.*
        FROM
        	(duration)
        	LEFT JOIN contract_duration ON contract_duration.duration_id = duration.id
        WHERE
        	duration.deleted_at IS NULL
        $wsql
       	GROUP BY
       		duration.id
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
        
        /*
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $where_clause = "";
        if($filter){
            $where_clause .= "WHERE 0 = 0 ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'contract_id'){
                    $where_clause = sprintf(" left join contract_duration as cd on d.id = cd.duration_id
                                    where cd.contract_id = %d",$fltr['value']);
                } else if($fltr['property'] == 'description'){
                    if(array_key_exists('value', $fltr)){
                        $where_clause .= " AND description LIKE '%".$fltr['value']."%'";
                    }
                } else if($fltr['property'] == 'payment_window') {
                    $where_clause .= " AND d.id NOT IN (SELECT p.duration_id FROM payment p WHERE p.contract_id =".$fltr['value'].")";
                } else {
                    $where_clause .= " AND ".$fltr['property']." = ".$fltr['value'];
                }
            }
        }
        if($query){
            $where_clause .= "WHERE description LIKE '%$query%'";
        }
        $sql = "SELECT d.* FROM duration as d $where_clause ORDER BY d.date_string";
        return $this->db->fetchAll($sql);
        */
    }

    public function getByContractId($id){
        $sql = "SELECT 
        	d.*
        FROM
        	(duration AS d)
        	LEFT JOIN contract_duration AS cd ON d.id = cd.duration_id
        WHERE
        	cd.contract_id = :id
        ORDER BY
        	d.date_string";
        return $this->db->fetchAll($sql, array('id' => $id));
    }
    
    public function getByPaymentId($id)
    {
        $sql = "SELECT
        	d.*
        FROM
        	(duration AS d,
        	payment_duration AS pd,
        	payment AS p)
        WHERE
        	pd.duration_id = d.id AND
        	p.id = pd.payment_id AND
        	p.deleted_AT IS NULL AND
        	pd.payment_id = :id
        GROUP BY
        	d.id
        ORDER BY 
        	d.date_string";
        return $this->db->fetchAll($sql, array('id' => $id));
    }

}