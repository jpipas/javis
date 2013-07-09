<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Contact extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'contact';
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
    			$osql = 'full_name';
    		}
    		
    		// build our search criteria
    		$where = array();
    		$wsql = '';
    		// handle query filter
    		if ($query){
    			$where[] = "contact.full_name LIKE '".addslashes($query)."%'";
    		
    		// handle additional filters
    		} elseif (@count($filter) > 0){
    			foreach ($filter as $f){
    				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
    					$qq = $this->db->quote($f['value']);
    					$where[$f['property']] = $f['property']." = ".$qq;
            }
    			}
    		
    		// search criteria was passed in
    		} elseif (isset($search['query']) && !empty($search['query'])){
    			if (@count($search['fields']) >= 1){
    				$or = array();
    				$qq = $this->db->quote($search['query'].'%');
    				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
    					$or[] = 'contact.'.$field.' LIKE '.$qq;
    				});
    				if (@count($or) > 0){
    					$where[] = "(".implode(' OR ', $or).")";
    				}
    			} else {
    				$parts = explode(" ", $search['query']);
	    			$where[] = "contact.full_name LIKE '".addslashes($search['query'])."%'";
    			}
    		}
    		if (@count($where) > 0){
    			$wsql = " AND ".implode(" AND ", $where);
    		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	contact.*,
        	contact_role.description AS role_name
        FROM
        	(contact)
        	LEFT JOIN contact_role ON contact_role.id = contact.role_id AND contact_role.deleted_at IS NULL
        WHERE
        	contact.deleted_at IS NULL
        	$wsql
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getByClientId($client_id) {
        $sql = "SELECT * FROM contact where client_id = ? and deleted_at is null";
        return $this->db->fetchAll($sql, array((int) $client_id));
    }

    public function getById($id) {
        $sql = "SELECT * FROM contact WHERE id = ? and deleted_at is null";
        return $this->db->fetchAll($sql,array((int)$id));
    }

		public function validate(&$app, &$params)
		{
			$error = array();
			unset($params['id'],$params['role'],$params['revoke_view'],$params['revoke_edit'],$params['revoke_delete']);
			
			// name is required
			if (empty($params['full_name'])){ $error[] = "Contact name is required"; }
			
			// make sure we have a valid client
			if (empty($params['client_id'])){
				$error[] = "Client is a required field";
			} else {
				$client = $app['business.client']->getById($params['client_id']);
				if (!isset($client['id'])){
					$error[] = "Invalid client specified";
				}				
			}
			
			// if e-mail is specified, make sure it is validly formatted
			if (isset($params['email_address']) && !empty($params['email_address']) && !filter_var($params['email_address'], FILTER_VALIDATE_EMAIL)){
	    	$error[] = "E-mail address appears to be incorrectly formatted";
	    }
	    
	    // validate or create a new contact role
	    if (!empty($params['role_id'])){
	    	// if numeric, they picked a role from the drop down
	    	if (is_numeric($params['role_id'])){
		    	$role = $app['business.contactrole']->getById($params['role_id']);
		    	if (!isset($role['id'])){
		    		$error[] = "Invalid role specified";
		    	} else {
		    		unset($params['role_name']);
		    	}
		    
		  	// create a new role
		    } else {
		    	// only create a new role if we don't have any other errors
		    	if (@count($error) < 1){
		    		$sql = "SELECT * FROM contact_role WHERE deleted_at IS NULL AND description = :desc";
		    		$role = $this->db->fetchAssoc($sql, array('desc' => $params['role_id']));
		    		if ($role['id']){
		    			$params['role_id'] = $role['id'];
		    			unset($params['role_name']);
		    		} else {
		    			$this->db->insert('contact_role', array('description' => $params['role_id']));
		    			$params['role_id'] = $this->db->lastInsertId();
		    			unset($params['role_name']);
		    		}
		    	}
		    }
	    } else {
	    	$error[] = "Role is a required field";
	    }
			return $error;
		}

    public function createContact($params) 
    {
    		unset($params['id']);
    		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('contact',$params);
        $contact = $this->getById($this->db->lastInsertId());
        return $contact;
    }

    public function updateContact($id, $params) 
    {
        $this->db->update('contact',$params, array('id'=>$id));
        $contact = $this->getById($id);
        return $contact;
    }

		public function deleteContact($id)
		{
			$now = new \DateTime('NOW');
			$params['deleted_at'] = $now->format('Y-m-d H:i:s');
      $rows = $this->db->update($this->getTableName(),$params, array('id' => $id));
      $res = $this->getById($id);
      return $res;
		}
}