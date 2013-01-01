<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Duration extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'duration';
    }

    public function getAll() {
        $sql = "SELECT * FROM duration";
        return $this->db->fetchAll($sql);
    }

    public function getByContractId($id){
        $sql = "SELECT d.* FROM duration as d LEFT JOIN contract_duration as cd on d.id = cd.duration_id WHERE cd.contract_id = $id";
        return $this->db->fetchAll($sql);
    }

}