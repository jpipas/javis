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

    public function getOneById($id){
        $sql = "SELECT * FROM territory WHERE id = ?";
        return $this->db->fetchAll($sql,array((int) $id));
    }

    public function createTerritory($params) {
        unset($params['state_name'],$params['manager_username'],$params['manager'], $params['state']);
        $this->db->insert('territory',$params);
        $territory = $this->getById($this->db->lastInsertId());
        return $territory;
    }

}