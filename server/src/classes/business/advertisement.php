<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Advertisement extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'advertisement';
    }

    public function getAll($page = null,$start = 0,$limit = 0) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        //$sql = "SELECT c.*,s.name as 'state' FROM client AS c LEFT JOIN state s ON c.state_id = s.id $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function getByContractId($contract_id) {
        $sql = "SELECT * FROM advertisement WHERE contract_id = ?";
        return $this->db->fetchAssoc($sql,array((int) $contract_id));
    }


}