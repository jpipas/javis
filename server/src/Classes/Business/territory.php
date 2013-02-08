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
        $sql = "SELECT * FROM territory ORDER BY name ASC";
        return $this->db->fetchAll($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM territory WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

}