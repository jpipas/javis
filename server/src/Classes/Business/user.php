<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class User extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'user';
    }

    public function getAll() {
        $sql = "SELECT * FROM user";
        return $this->db->fetchAll($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM user WHERE id = ?";
        return $this->db->fetchAll($sql,array((int) $id));
    }

    public function createUser($params) {
        //unset($params['durations']);
        unset($params['territory_name'], $params['territory']);
        $this->db->insert('user',$params);
        $user = $this->getById($this->db->lastInsertId());
        return $user;
    }

}