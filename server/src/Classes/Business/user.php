<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class User extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'employee';
    }

    public function getAll() {
        $sql = "SELECT * FROM employee";
        return $this->db->fetchAll($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM employee WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

    public function createUser($params) {
        unset($params['territory_name'], $params['territory'], $params['fullname']);
        $params['roles'] = "ROLE_USER";
        $this->db->insert('employee',$params);
        $user = $this->getById($this->db->lastInsertId());
        return $user;
    }

}