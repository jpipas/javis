<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Activity extends AbstractBusinessService
{
		protected $types = array(
			'event'		=> array(
					'id'					=> 'event',
					'description'	=> 'Events',
					'cls'					=> 'view_action ui-silk ui-silk-date',
					'clsEdit'			=> 'edit_action ui-silk ui-silk-date-edit',
					'clsDelete'		=> 'delete_action ui-silk ui-silk-date-delete',
					'clsAdd'			=> 'add_action ui-silk ui-silk-date-add'
				),
			'phone'		=> array(
					'id'					=> 'phone',
					'description'	=> 'Phone Calls',
					'cls'					=> 'view_action ui-silk ui-silk-telephone',
					'clsEdit'			=> 'edit_action ui-silk ui-silk-telephone-edit',
					'clsDelete'		=> 'delete_action ui-silk ui-silk-telephone-delete',
					'clsAdd'			=> 'add_action ui-silk ui-silk-telephone-add'
				),
			'task'		=> array(
					'id'					=> 'task',
					'description'	=> 'Tasks',
					'cls'					=> 'view_action ui-silk ui-silk-clock',
					'clsEdit'			=> 'edit_action ui-silk ui-silk-clock-edit',
					'clsDelete'		=> 'delete_action ui-silk ui-silk-clock-delete',
					'clsAdd'			=> 'add_action ui-silk ui-silk-clock-add'
				)
		);
		
		protected $statuses = array(
			'new'			=> array(
					'id' 						=> 'new',
					'description'		=> 'New'
				),
			'open'		=> array(
					'id' 						=> 'open',
					'description'		=> 'Open'
				),
			'waiting'		=> array(
					'id' 						=> 'waiting',
					'description'		=> 'Waiting'
				),
			'completed'		=> array(
					'id' 						=> 'completed',
					'description'		=> 'Completed'
				),
			'stale'		=> array(
					'id' 						=> 'stale',
					'description'		=> 'Stale'
				),
			'dead'		=> array(
					'id' 						=> 'dead',
					'description'		=> 'Dead'
				)				
		);
		
    public function getTableName()
    {
        return 'employee';
    }
    
    /* Activity Type getters */
    public function getAllTypes()
    {
    	return array(count($this->types), $this->types);
    }
    
    public function getByIdType($id)
    {
    	if ($this->types[$id]){
    		return $this->types[$id];
    	}
    	return '';
    }
    
    /* Activity Status getters */
    public function getAllStatuses()
    {
    	return array(count($this->statuses), $this->statuses);
    }
    
    public function getByIdStatus($id)
    {
    	if ($this->statuses[$id]){
    		return $this->statuses[$id];
    	}
    	return '';
    }

		/* Activity Functions */
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
    			$osql = 'post_date DESC, post_time DESC';
    		}
    		
    		// build our search criteria
    		$where = array();
    		$wsql = '';
    		// handle query filter
    		if ($query){
    			$where[] = "activity.title LIKE '".addslashes($query)."%'";
    		
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
    					$or[] = 'activity.'.$field.' LIKE '.$qq;
    				});
    				if (@count($or) > 0){
    					$where[] = "(".implode(' OR ', $or).")";
    				}
    			} else {
    				$parts = explode(" ", $search['query']);
	    			$where[] = "activity.title LIKE '".addslashes($search['query'])."%'";
    			}
    		}
    		if (@count($where) > 0){
    			$wsql = " AND ".implode(" AND ", $where);
    		}
    		list($count,$types) = $this->getAllTypes();
    		list($count,$statuses) = $this->getAllStatuses();
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	activity.*,
        	CONCAT(own.first_name, ' ',own.last_name) AS owner_name,
        	CONCAT(ass.first_name, ' ',ass.last_name) AS assigned_to_name,
        	client.company_name 											AS client_name
        FROM
        	(activity,
        	client)
        	LEFT JOIN employee AS own ON own.id = activity.owner_id
        	LEFT JOIN employee AS ass ON ass.id = activity.assigned_to_id
        WHERE
        	activity.deleted_at IS NULL AND
        	client.deleted_at IS NULL AND
        	client.id = activity.client_id
        	$wsql
        ORDER BY
        	$osql
        $lsql ";
        $rows = $this->db->fetchAll($sql);
        array_walk($rows, function($row,$key) use (&$rows, &$types, &$statuses){
        	$rows[$key]['type'] = $types[$row['type_id']];
        	$rows[$key]['status'] = $statuses[$row['status_id']];
        });
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id) {
        $sql = "SELECT 
        	activity.*
        FROM
        	activity
        WHERE
        	id = ? AND
        	deleted_at IS NULL";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function validate(&$app, &$params){
    		$error = array();
    		// clear params we don't need
    		unset($params['owner_id'], $params['owner_name'], $params['assigned_to_name'], $params['client_name'], $params['created_at'], 
    			$params['deleted_at'], $params['type_cls'], $params['type_cls_edit'], $params['type_cls_add'], $params['type_cls_delete'], 
    			$params['status_cls'], $params['status_cls_edit'], $params['status_cls_add'], $params['status_cls_delete'], $params['owner'],
    			$params['assigned_to'], $params['client']);
		    
		    // title is required
		    if (empty($params['title'])){
		    	$error[] = "Title is a required field";
		    }
		    
		    // verify client selection
		    if (empty($params['client_id'])){
		    	$error[] = "Client is a required field";
		    } else {
		    	$client = $app['business.client']->getById($params['client_id']);
		    	if (empty($client['id'])){ $error[] = "Unable to locate specified client"; }
		    }
				
				// verify type
				if (empty($params['type_id'])){
					$error[] = "Type is a required field";
				} else {
					$type = $this->getByIdType($params['type_id']);
					if (!$type['id']){ $error[] = "Invalid type selected"; }
				}
				
				// verify status
				if (empty($params['status_id'])){
					$error[] = "Status is a required field";
				} else {
					$status = $this->getByIdStatus($params['status_id']);
					if (!$status['id']){ $error[] = "Invalid status selected"; }
				}
				
				// verify date
				if (empty($params['post_date'])){
					$error[] = "Date is a required field";
				} else {
					// verify date format here.

					$params['post_date'] = date('Y-m-d', strtotime($params['post_date']));
				}
				
				// verify time
				if (!empty($params['post_time'])){
					// verify time format here
					
					$params['post_time'] = date('H:i:s', strtotime($params['post_time']));
				} else {
					$params['post_time'] = null;
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
				$params['owner_id'] = $params['insert_user_id'] = $params['update_user_id'] = $ownerid;
		    return $error;
    }

    public function createActivity($params) {
        unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('activity',$params);
        $res = $this->getById($this->db->lastInsertId());
        return $res;
    }

		public function updateActivity($id, $params) {
				unset($params['owner_id'], $params['insert_user_id']);
				$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('activity',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function deleteActivity($id) {
    		$now = new \DateTime('NOW');
				$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('activity',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}