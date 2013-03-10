<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class State extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'state';
    }

    public function getAll() {
        $sql = "SELECT * FROM state ORDER BY name ASC";
        return $this->db->fetchAll($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM state WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

}