<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;
use \DateTime;

class Publication extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'publication';
    }

    public function getAll($page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array())
    {
    		/*
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $where_clause = "WHERE deleted_at is null ";
        if($filter){
            $where_clause = "WHERE deleted_at is null ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'client_id'){
                    $where_clause = sprintf(" left join advertisement_publication as ap on p.id = ap.publication_id
                                    left join advertisement as a on ap.advertisement_id = a.id
                                    left join contract_advertisement as ca on a.id = ca.advertisement_id
                                    left join contract as c on ca.contract_id = c.id
                                    left join client as cl on c.client_id = cl.id
                                    where cl.id = %d and p.deleted_at is null
                                    group by p.id",$fltr['value']);
                } else if($fltr['property'] == 'description'){
                    if(array_key_exists('value', $fltr)){
                       $where_clase = "AND description LIKE '%".$fltr['value']."'";
                    }
                } else {
                    $where_clause .= " AND ".$fltr['property']." = ".$fltr['value'];
                }
            }
        } else if($query){
            $where_clause .= "AND description LIKE '%".$query."%'";
        }
        */
        
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
    			$osql = 'p.description';
    		}
    		
    		// build our search criteria
    		$where = array();
    		$wsql = '';
    		// handle query filter
    		if ($query){
    			$where[] = "p.description LIKE '".addslashes($query)."%'";
    		
    		// handle additional filters
    		} elseif (@count($filter) > 0){
    			foreach ($filter as $f){
    				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
    					$qq = $this->db->quote($f['value']);
    					if ($f['property'] == 'client_id'){
    						$where[$f['property']] = 'cl.id = '.$qq;
    					} else {
    						$where[$f['property']] = 'p.'.$f['property']." = ".$qq;
    					}
            }
    			}
    		
    		// search criteria was passed in
    		} elseif (isset($search['query']) && !empty($search['query'])){
    			if (@count($search['fields']) >= 1){
    				$or = array();
    				$qq = $this->db->quote($search['query'].'%');
    				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
    					$or[] = 'p.'.$field.' LIKE '.$qq;
    				});
    				if (@count($or) > 0){
    					$where[] = "(".implode(' OR ', $or).")";
    				}
    			} else {
    				$parts = explode(" ", $search['query']);
	    			$where[] = "p.description LIKE '".addslashes($search['query'])."%'";
    			}
    		}
    		if (@count($where) > 0){
    			$wsql = " AND ".implode(" AND ", $where);
    		}
        
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	p.*,
        	territory.name AS territory_name,
        	state.name AS state_name,
        	state.id AS state_id,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS publisher_name,
        	territory.manager_id AS publisher_id,
        	employee.email AS publisher_email,
        	CONCAT(cc.first_name, ' ', cc.last_name) AS contentcoord_name,
        	cc.email AS contentcoord_email
        FROM
        	(publication AS p,
        	territory,
        	state)
          LEFT JOIN employee ON employee.id = territory.manager_id AND employee.deleted_at IS NULL
          LEFT JOIN employee AS cc ON cc.id = p.contentcoord_id AND cc.deleted_at IS NULL
        	LEFT JOIN advertisement_publication AS ap ON p.id = ap.publication_id
          LEFT JOIN advertisement AS a ON ap.advertisement_id = a.id
          LEFT JOIN contract_advertisement AS ca ON a.id = ca.advertisement_id
          LEFT JOIN contract AS c ON ca.contract_id = c.id
          LEFT JOIN client AS cl ON c.client_id = cl.id          
        WHERE
        	p.deleted_at IS NULL AND
        	territory.id = p.territory_id AND 
        	territory.deleted_at IS NULL AND
        	state.id = territory.state_id AND
        	state.deleted_at IS NULL
       		$wsql
       	GROUP BY
       		p.id
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }
    
    public function getById($id) {
        $sql = "SELECT 
        	p.*,
        	territory.name AS territory_name,
        	state.name AS state_name,
        	state.id AS state_id,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS publisher_name,
        	territory.manager_id AS publisher_id,
        	employee.email AS publisher_email,
        	CONCAT(cc.first_name, ' ', cc.last_name) AS contentcoord_name,
        	cc.email AS contentcoord_email
        FROM
        	(publication AS p,
        	territory,
        	state)
          LEFT JOIN employee ON employee.id = territory.manager_id AND employee.deleted_at IS NULL
          LEFT JOIN employee AS cc ON cc.id = p.contentcoord_id AND cc.deleted_at IS NULL
        	LEFT JOIN advertisement_publication AS ap ON p.id = ap.publication_id
          LEFT JOIN advertisement AS a ON ap.advertisement_id = a.id
          LEFT JOIN contract_advertisement AS ca ON a.id = ca.advertisement_id
          LEFT JOIN contract AS c ON ca.contract_id = c.id
          LEFT JOIN client AS cl ON c.client_id = cl.id          
        WHERE
        	p.deleted_at IS NULL AND
        	territory.id = p.territory_id AND 
        	territory.deleted_at IS NULL AND
        	state.id = territory.state_id AND
        	state.deleted_at IS NULL AND
       		p.id = ?
       	GROUP BY
       		p.id";
        return $this->db->fetchAssoc($sql,array((int)$id));
    }

    public function getByAdvertisementId($id) {
    		$sql = "SELECT 
        	p.*,
        	territory.name AS territory_name,
        	state.name AS state_name,
        	state.id AS state_id,
        	CONCAT(employee.first_name, ' ', employee.last_name) AS publisher_name,
        	territory.manager_id AS publisher_id,
        	employee.email AS publisher_email,
        	CONCAT(cc.first_name, ' ', cc.last_name) AS contentcoord_name,
        	cc.email AS contentcoord_email
        FROM
        	(publication AS p,
        	territory,
        	state)
          LEFT JOIN employee ON employee.id = territory.manager_id AND employee.deleted_at IS NULL
          LEFT JOIN employee AS cc ON cc.id = p.contentcoord_id AND cc.deleted_at IS NULL
        	LEFT JOIN advertisement_publication AS ap ON p.id = ap.publication_id
          LEFT JOIN advertisement AS a ON ap.advertisement_id = a.id
          LEFT JOIN contract_advertisement AS ca ON a.id = ca.advertisement_id
          LEFT JOIN contract AS c ON ca.contract_id = c.id
          LEFT JOIN client AS cl ON c.client_id = cl.id          
        WHERE
        	p.deleted_at IS NULL AND
        	territory.id = p.territory_id AND 
        	territory.deleted_at IS NULL AND
        	state.id = territory.state_id AND
        	state.deleted_at IS NULL AND
        	ap.advertisement_id = ? 
       	GROUP BY
       		p.id";
        return $this->db->fetchAll($sql,array((int)$id));
    }
    
    public function validate(&$app, &$params)
    {
    	$error = array();
    	$app['monolog']->addInfo(print_r($params, true));
			unset($params['id'],$params['contact_email'], $params['content_email'], $params['territory_name'], $params['publisher_id']);
			unset($params['publisher_name'], $params['publisher_email'],$params['contentcoord_name'], $params['contentcoord_email'], $params['created_at']);
			unset($params['deleted_at'],$params['territory'], $params['contentcoord'], $params['publisher'], $params['postal_code']);
			
			// require description
			if (empty($params['description'])){
				$error[] = "Publication name/description is required";
			}
			
			// validate territory
			if (empty($params['territory_id'])){
				$error[] = "Publication territory is required";
			} else {
				$territory = $app['business.territory']->getById($params['territory_id']);
				if (empty($territory['id'])){
					$error[] = "Invalid territory specified";
				}
			}
			
			// validate content coord
			if (!empty($params['contentcoord_id'])){
				$user =  $app['business.user']->getById($params['contentcoord_id']);
	    	if (!$user['id']){
	    		$error[] = "Invalid content coordinator selected";
	    	}
			}
			
			// get postal code
	    if (@count($error) < 1){
	    	$codes = $params['postal_codes'];
        $params['postal_codes'] = array();
        foreach ($codes as $iso_code){
        	$iso_code = trim($iso_code);
        	if (!empty($iso_code)){
            $sql = "SELECT * FROM postal_code WHERE iso_code = ".$this->db->quote($iso_code);
            $rs = $this->db->fetchAll($sql);

            if(count($rs) == 0){
                // add the new postal code
                $array = array();
                $array['iso_code'] = $iso_code;
                $this->db->insert('postal_code',$array);
                $postal_code_id = $this->db->lastInsertId();
            } else {
                $postal_code_id = $rs[0]['id'];
            }
            $params['postal_codes'][$postal_code_id] = $postal_code_id;
          }
        }
	    }
			
			return $error;
    }

		
		public function create($params) 
    {
    		$postal_code_array = $params['postal_codes'];
    		unset($params['postal_codes']);
    		unset($params['id']);
    		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('publication',$params);
        $id = $this->db->lastInsertId();
        foreach($postal_code_array as $postal_code){
            $this->db->insert('publication_zip', array('publication_id' => $id, 'postal_code_id' => $postal_code));
        }
        $result = $this->getById($id);
        return $result;
    }

		public function update($id, $params, $app) 
    {
    		$app['monolog']->addInfo(print_r($params, true));
    		$postal_code_array = $params['postal_codes'];
    		unset($params['postal_codes']);
    		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $this->db->update('publication',$params, array('id'=>$id));
        $this->db->delete('publication_zip',array("publication_id"=>$id));
        foreach($postal_code_array as $postal_code){
            $this->db->insert('publication_zip', array('publication_id' => $id, 'postal_code_id' => $postal_code));
        }
        $result = $this->getById($id);
        return $result;
    }

		public function delete($id)
		{
			$now = new \DateTime('NOW');
			$params['deleted_at'] = $now->format('Y-m-d H:i:s');
      $rows = $this->db->update($this->getTableName(),$params, array('id' => $id));
      $res = $this->getById($id);
      return $res;
		}
}