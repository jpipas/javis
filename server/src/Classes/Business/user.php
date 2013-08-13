<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;
use Symfony\Component\Security\Core\User\User as sfUser;

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
    				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
    					switch ($f['property']){
    						case 'fullname':
                	$parts = explode(" ", $f['value']);
				    			if (@count($parts) == 2){
				    				$where[$f['property']] = "employee.first_name LIKE ".$this->db->quote($parts[0].'%')." AND employee.last_name LIKE ".$this->db->quote($parts[1].'%');
				    			} else {
				    				$where[$f['property']] = "(employee.first_name LIKE ".$this->db->quote($f['value'].'%')." OR employee.last_name LIKE ".$this->db->quote($f['value'].'%').")";
				    			}
				    			break;
                  
                default:
    							$qq = $this->db->quote($f['value']);
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
    				$qqq = $this->db->quote('%'.$search['query'].'%');
    				array_walk($search['fields'], function($field,$key) use (&$or, &$qq, &$qqq){
    					switch ($field){
    						case 'roles':
    							$or[] = 'pr.roles LIKE '.$qqq;
    							break;
    							
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
        	CONCAT(employee.first_name, ' ',employee.last_name) AS fullname,
        	CONCAT(m.first_name, ' ',m.last_name) AS manager_name,
        	territory.name AS territory_name,
        	pr.roles
        FROM
        	(employee)
        	LEFT JOIN employee AS m ON m.id = employee.manager_user_id
        	LEFT JOIN territory ON territory.id = employee.territory_id
        	LEFT JOIN (SELECT 
        			employee_id,
        			GROUP_CONCAT(permission_role.title) AS roles
        		FROM
        			(employee_role,
        			permission_role)
        		WHERE
        			permission_role.id = employee_role.role_id AND 
        			permission_role.deleted_at IS NULL
        		GROUP BY
        			employee_role.employee_id
        		ORDER BY
        			permission_role.title) AS pr ON pr.employee_id = employee.id
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
        $sql = "SELECT 
        	employee.*,
        	CONCAT(employee.first_name, ' ',employee.last_name) AS fullname
        FROM
        	employee
        WHERE
        	id = ? AND
        	deleted_at IS NULL";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function validate(&$app, &$params){
		$error = array();
		// clear params we don't need
		unset($params['territory_name'], $params['territory'], $params['fullname'], $params['manager'], $params['manager_name'], $params['created_at'], $params['last_login'], $params['deleted_at']);
		
		// verify password, clear if not entered to keep existing
		if ($params['password'] || !$params['id']){
			if (!$params['id'] && empty($params['password'])){
				$error[] = "Password is a required field for new users";
			} elseif ($params['password'] != $params['retype-password']){
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
	    /*
	    2013-08-05 DHS User's are assigned to territories under territory.
	    if (empty($params['territory_id'])){
	    	$error[] = "Territory is a required field";
	    } else {
	    	$territory = $app['business.territory']->getById($params['territory_id']);
	    	if (empty($territory['id'])){ $error[] = "Unable to locate specified territory"; }
	    }
	    */
	    
	    // check that we have a valid manager
	    if (!empty($params['manager_user_id'])){
	    	$manager = $this->getById($params['manager_user_id']);
	    	if (!$manager['id']){
	    		$error[] = "Invalid manager selected";		    		
	    	}
	    }
	    
	    if (@count($params['roles']) > 0){
	    	foreach ($params['roles'] as $rid){
	    		$role = $app['business.permissionrole']->getById($rid);
	    		if (!isset($role['id'])){
	    			$error[] = 'Invalid role specified';
	    			break;
	    		}
	    	}
	    }
	    
	    // set disabled and new password to 1 or 0
	    if ($params['disabled'] != 1){ $params['disabled'] = 0; }
	    if ($params['newpassword'] != 1){ $params['newpassword'] = 0; }
	    return $error;
    }
    
    public function validatePassword(&$app, &$params){
		$error = array();
		
		// verify currently logged in user
		$userid = null;
		$user = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$userid = $user->getId();
			if (empty($userid)){
				$error[] = "Invalid user. Please try again.";
			}
		} else {
			$error[] = "Invalid user. Please try again.";
		}
		$params['id'] = $userid;
		
		// verify password
		if ($userid){
			if (empty($params['password'])){
				$error[] = "Password is a required field";
			} elseif ($params['password'] != $params['retype-password']){
				$error[] = "Password and retyped password don't match";
			} else {
				$nonEncodedPassword = $params['password'];
		        $newuser = new sfUser($user->getUsername(),$params['password']);
		        $encoder = $app['security.encoder_factory']->getEncoder($newuser);
		        $encodedPassword = $encoder->encodePassword($nonEncodedPassword,$newuser->getSalt());
		        $params['password'] = $encodedPassword;
		        unset($params['retype-password']);
			}
		}
		
		return $error;
	}
	
	public function updatePassword($params)
	{
		$id = $params['id'];
		unset($params['id']);
		$params['newpassword'] = 0;
		$rows = $this->db->update('employee',$params, array('id' => $id));
        $user = $this->getById($id);
        return $user;
	}

    public function createUser($params) 
    {
        unset($params['id']);
        $roles = $params['roles'];
        unset($params['roles']);
        $now = new \DateTime('NOW');
    	$params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('employee',$params);
        $id = $this->db->lastInsertId();
        foreach ($roles as $rid){
        	$this->db->insert('employee_role', array('employee_id' => $id, 'role_id' => $rid));
        }
        $user = $this->getById($id);
        return $user;
    }

	public function updateUser($id, $params) 
	{
        $roles = $params['roles'];
        unset($params['roles']);
        $rows = $this->db->update('employee',$params, array('id' => $id));
        $this->db->delete('employee_role', array('employee_id' => $id));
        foreach ($roles as $rid){
        	$this->db->insert('employee_role', array('employee_id' => $id, 'role_id' => $rid));
        }
        $user = $this->getById($id);
        return $user;
    }
    
    public function deleteUser($id) 
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('employee',$params, array('id' => $id));
        $user = $this->getById($id);
        return $user;
    }
    
    public function encodePassword($username, $nonEncodedPassword, $app)
    {
        $user = new sfUser($username, $nonEncodedPassword);
        return $encodePassword;
    }
}