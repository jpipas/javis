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

}