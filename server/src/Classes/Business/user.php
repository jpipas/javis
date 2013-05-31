<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class User extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'employee';
    }

    public function getAll($page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array()) {
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
    			$osql = 'last_name ASC';
    		}
    		
    		// build our search criteria
    		$where = array();
    		$wsql = '';
    		// handle query filter
    		if ($query){
    			$parts = explode(" ", $query);
    			if (@count($parts) == 2){
    				$where[] = "employee.first_name LIKE '".addslashes($parts[0])."%' AND employee.last_name LIKE '".addslashes($parts[1])."%'";
    			} else {
    				$where[] = "(employee.first_name LIKE '".addslashes($query)."%' OR employee.last_name LIKE '".addslashes($query)."%')";
    			}
    		
    		// handle additional filters
    		} elseif (@count($filter) > 0){
    			foreach ($filter as $f){
    				if(array_key_exists('value',$f) && !$where[$f['property']] && !empty($f['value'])){
    					switch ($f['property']){
    						case 'fullname':
                	$parts = explode(" ", $f['value']);
				    			if (@count($parts) == 2){
				    				$where[$f['property']] = "employee.first_name LIKE '".addslashes($parts[0])."%' AND employee.last_name LIKE '".addslashes($parts[1])."%'";
				    			} else {
				    				$where[$f['property']] = "(employee.first_name LIKE '".addslashes($f['value'])."%' OR employee.last_name LIKE '".addslashes($f['value'])."%')";
				    			}
				    			break;
                  
                default:
                	$where[$f['property']] = $f['property']." = ".$f['value'];
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
    					switch ($field){
    						case 'manager_name':
    							$or[] = 'm.first_name LIKE '.$qq. ' OR m.last_name LIKE '.$qq;
    							break;
    						
    						case 'territory_name':
    							$or[] = 'territory.name LIKE '.$qq;
    							break;
    						
    						default:
    							$or[] = 'employee.'.$field.' LIKE '.$qq;
    							break;
    					}
    				});
    				if (@count($or) > 0){
    					$where[] = "(".implode(' OR ', $or).")";
    				}
    			} else {
    				$parts = explode(" ", $search['query']);
	    			if (@count($parts) == 2){
	    				$where[] = "employee.first_name LIKE '".addslashes($parts[0])."%' AND employee.last_name LIKE '".addslashes($parts[1])."%'";
	    			} else {
	    				$where[] = "(employee.first_name LIKE '".addslashes($search['query'])."%' OR employee.last_name LIKE '".addslashes($search['query'])."%')";
	    			}
    			}
    		}
    		if (@count($where) > 0){
    			$wsql = " AND ".implode(" AND ", $where);
    		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	employee.*,
        	CONCAT(m.first_name, ' ',m.last_name) AS manager_name,
        	territory.name AS territory_name
        FROM
        	(employee)
        	LEFT JOIN employee AS m ON m.id = employee.manager_user_id
        	LEFT JOIN territory ON territory.id = employee.territory_id
        WHERE
        	employee.deleted_at IS NULL
        	$wsql
        ORDER BY
        	$osql
        $lsql ";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id) {
        $sql = "SELECT * FROM employee WHERE id = ? AND deleted_at IS NULL";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function validate(&$app, &$params){
    		$error = array();
    		// clear params we don't need
    		unset($params['territory_name'], $params['territory'], $params['fullname'], $params['manager'], $params['manager_name'], $params['created_at'], $params['last_login'], $params['deleted_at']);
    		
    		// verify password, clear if not entered to keep existing
    		if ($params['password']){
    			if ($params['password'] != $params['retype-password']){
    				$error[] = "Password and retyped password don't match";
    			} else {
		    		$nonEncodedPassword = $params['password'];
		        $user = new sfUser($params['username'],$params['password']);
		        $encoder = $app['security.encoder_factory']->getEncoder($user);
		        $encodedPassword = $encoder->encodePassword($nonEncodedPassword,$user->getSalt());
		        $params['password'] = $encodedPassword;
		        unset($params['retype-password']);
		      }
		    } else {
		    	unset($params['password'], $params['retype-password']);
		    }
		    
		    // check username
		    if (empty($params['username'])){
		    	$error[] = "Username is a required field";
		    } else {
		    	$match = array('username' => $params['username']);
		    	$sql = "SELECT id FROM employee WHERE deleted_at IS NULL AND username = :username";
		    	if ($params['id']){ 
		    		$sql .= " AND id != :id"; 
		    		$match['id'] = $params['id'];
		    	}
		    	if ($this->db->fetchColumn($sql, $match)){
		    		$error[] = "That username is already in use";
		    	}
		    }
		    
		    // check names fields
		    if (empty($params['first_name'])){ $error[] = "First name is a required field"; }
		    if (empty($params['last_name'])){ $error[] = "Last name is a required field"; }
		    
		    // check valid e-mail address
		    if (empty($params['email'])){
		    	$error[] = "E-mail address is a required field";
		    } elseif (!filter_var($params['email'], FILTER_VALIDATE_EMAIL)){
		    	$error[] = "E-mail address appears to be incorrectly formatted";
		    }
		    
		    // make sure we have a valid territory
		    if (empty($params['territory_id'])){
		    	$error[] = "Territory is a required field";
		    } else {
		    	$territory = $app['business.territory']->getById($params['territory_id']);
		    	if (empty($territory['id'])){ $error[] = "Unable to locate specified territory"; }
		    }
		    
		    // check that we have a valid manager
		    if (!empty($params['manager_user_id'])){
		    	$manager = $this->getById($params['manager_user_id']);
		    	if (!$manager['id']){
		    		$error[] = "Invalid manager selected";		    		
		    	}
		    }
		    return $error;
    }

    public function createUser($params) {
        unset($params['id']);
        $params['roles'] = "ROLE_USER";
        $this->db->insert('employee',$params);
        $user = $this->getById($this->db->lastInsertId());
        return $user;
    }

		public function updateUser($id, $params) {
        $params['roles'] = "ROLE_USER";
        $rows = $this->db->update('employee',$params, array('id' => $id));
        $user = $this->getById($id);
        return $user;
    }
    
    public function deleteUser($id) {
    		$now = new \DateTime('NOW');
				$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('employee',$params, array('id' => $id));
        $user = $this->getById($id);
        return $user;
    }
}