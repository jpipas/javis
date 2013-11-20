<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class PermissionRole extends AbstractBusinessService
{		
    public function getTableName()
    {
        return 'permission_role';
    }

    public function getAll() 
    {
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	permission_role.*,
        	COUNT(DISTINCT(employee_role.employee_id)) AS users
        FROM
        	(permission_role)
        	LEFT JOIN employee_role ON employee_role.role_id = permission_role.id
        WHERE
        	permission_role.deleted_at IS NULL
        GROUP BY
        	permission_role.id
        ORDER BY
        	permission_role.title";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id) 
    {
        $sql = "SELECT
        	permission_role.*,
        	COUNT(DISTINCT(employee_role.employee_id)) AS users
        FROM
        	(permission_role)
        	LEFT JOIN employee_role ON employee_role.role_id = permission_role.id
        WHERE
        	permission_role.deleted_at IS NULL AND
        	permission_role.id = ?
        GROUP BY
        	permission_role.id";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function getByUser($user)
    {
    	$sql = "SELECT
        	permission_role.*
        FROM
        	(permission_role,
        	employee_role)
        WHERE
        	employee_role.role_id = permission_role.id AND
        	permission_role.deleted_at IS NULL AND
        	employee_role.employee_id = ?
        ORDER BY
        	permission_role.title";
        return $this->db->fetchAll($sql, array($user));
    }
    
    public function validate(&$app, &$params)
    {
		$error = array();
		// clear params we don't need
		unset($params['users']);
	    
	    // title is required
	    if (empty($params['title'])){
	    	$error[] = "Title is a required field";
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

    public function create($params) 
    {
    	$resources = $params['resources'];
        unset($params['id'], $params['update_user_id'], $params['resources']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('permission_role',$params);
        $id = $this->db->lastInsertId();
        if (is_array($resources) && count($resources) > 0){
	        foreach ($resources as $rid){
	        	$this->db->insert('permission_role_resource', array('role_id' => $id, 'resource_id' => $rid));
	        }
	    }
        $res = $this->getById($id);
        return $res;
    }

	public function update($id, $params) 
	{
		$resources = $params['resources'];
		unset($params['insert_user_id'], $params['resources']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('permission_role',$params, array('id' => $id));
        $this->db->delete('permission_role_resource',array('role_id' => $id));
        if (is_array($resources) && count($resources) > 0){
	        foreach ($resources as $rid){
	        	$this->db->insert('permission_role_resource', array('role_id' => $id, 'resource_id' => $rid));
	        }
	    }
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id) 
    {
		$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('permission_role',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}