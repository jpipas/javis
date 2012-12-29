<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Territory extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'territory';
    }

    public function getAll() {
        $sql = "SELECT * FROM territory";
        return $this->db->fetchAll($sql);
    }

}