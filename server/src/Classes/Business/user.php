<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class User extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'employee';
    }

    public function getAll($page = '', $start = '', $limit = '', $sort) {
    		if (is_numeric($start) && is_numeric($limit)){
	    			$lsql = " LIMIT $start, $limit";
    		}
    		if (is_array($sort)){
    			$order = array();
    			array_walk($sort, function($sort, $key) use (&$order){
    				$order[] = $sort['property'].' '.$sort['direction'];
    			});
    			$osql = implode(', ', $order);
    		} else {
    			$osql = 'last_name ASC';
    		}
        $sql = "SELECT
        	employee.*,
        	CONCAT(m.first_name, ' ',m.last_name) AS manager_name,
        	territory.name AS territory_name
        FROM
        	(employee)
        	LEFT JOIN employee AS m ON m.id = employee.manager_user_id
        	LEFT JOIN territory ON territory.id = employee.territory_id
        WHERE
        	employee.deleted_at IS NULL
        ORDER BY
        	$osql
        $lsql ";
        return $this->db->fetchAll($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM employee WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

    public function createUser($params) {
        unset($params['territory_name'], $params['territory'], $params['fullname'], $params['manager'], $params['manager_name'], $params['id'], $params['created_at'], $params['last_login'], $params['deleted_at']);
        $params['roles'] = "ROLE_USER";
        $this->db->insert('employee',$params);
        $user = $this->getById($this->db->lastInsertId());
        return $user;
    }

		public function updateUser($id, $params) {
        unset($params['territory_name'], $params['territory'], $params['fullname'], $params['manager'], $params['manager_name'], $params['created_at'], $params['last_login'], $params['deleted_at']);
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