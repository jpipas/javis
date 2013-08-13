<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class PermissionResource extends AbstractBusinessService
{		
    public function getTableName()
    {
        return 'permission_resource';
    }

    public function getAll() {
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	permission_resource.*,
        	permission_resource.title AS text
        FROM
        	(permission_resource)
        WHERE
        	permission_resource.deleted_at IS NULL
        ORDER BY
        	permission_resource.parent_id, permission_resource.title";
        $result = array();
        $sth = $this->db->query($sql);
        while ($r = $sth->fetch()){
        	if ($r['parent_id']){
        		if ($result[$r['parent_id']]){
        			$r['leaf'] = true;
        			$result[$r['parent_id']]['children'][$r['id']] = $r;
        		}
        	} else {
        		$r['leaf'] = false;
        		$result[$r['id']] = $r;
        	}
        }
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        $result = array_values($result);
        foreach ($result as $key => $val){
        	$result[$key] = $this->array_values_recursive($val);
        }
        return array($totalCount, $result);
    }
    
    function array_values_recursive($arr){
		if (is_array($arr)){
			foreach($arr as $key => $val){
				if($key == 'children' && is_array($val)){
					$arr[$key] = array_values($this->array_values_recursive($val));
				}
			}
		}
		return $arr;
	}

    public function getById($id) {
        $sql = "SELECT 
        	permission_resource.*,
        	parent.title AS parent_title
        FROM
        	(permission_resource)
        	LEFT JOIN permission_resource AS parent ON parent.id = permission_resource.parent_id
        WHERE
        	permission_resource.id = ? AND
        	permission_resource.deleted_at IS NULL";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function getByRole($role)
    {
    	$sql = "SELECT 
        	permission_resource.*,
        	parent.title AS parent_title
        FROM
        	(permission_resource,
        	permission_role_resource AS prr)
        	LEFT JOIN permission_resource AS parent ON parent.id = permission_resource.parent_id
        WHERE
        	permission_resource.id = prr.resource_id AND
        	prr.role_id = ? AND
        	permission_resource.deleted_at IS NULL";
        return $this->db->fetchAll($sql,array((int) $role));
    }
    
    public function getByUser($user)
    {
    	$sql = "SELECT 
        	permission_resource.*,
        	parent.title AS parent_title
        FROM
        	(permission_resource,
        	permission_role_resource AS prr,
        	employee_role)
        	LEFT JOIN permission_resource AS parent ON parent.id = permission_resource.parent_id
        WHERE
        	permission_resource.id = prr.resource_id AND
        	employee_role.role_id = prr.role_id AND
        	employee.employee_id = ? AND
        	permission_resource.deleted_at IS NULL";
        return $this->db->fetchAll($sql,array((int) $user));
    }
    
    public function validate(&$app, &$params)
    {
		$error = array();
		// clear params we don't need
		unset($params['parent_title'], $params['text'], $params['leaf'], $params['loaded'], $params['expanded'], $params['parentId']);
	    
	    // title is required
	    if (empty($params['title'])){
	    	$error[] = "Title is a required field";
	    }
	    
	    // verify client selection
	    if (empty($params['resourceid']) && !$params['is_folder']){
	    	$error[] = "Resource ID is required";
	    }
			
		// verify type
		if (!$params['is_folder']){
			if (empty($params['parent_id'])){
				$error[] = "Folder is a required field";
			} else {
				$parent = $this->getById($params['parent_id']);
				if (!$parent['id']){ $error[] = "Invalid parent resource specified"; }
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
		unset($params['is_folder']);
	    return $error;
    }

    public function create($params) 
    {
        unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $this->db->insert('permission_resource',$params);
        $res = $this->getById($this->db->lastInsertId());
        return $res;
    }

	public function update($id, $params) 
	{
		unset($params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('permission_resource',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id) 
    {
		$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('permission_resource',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}