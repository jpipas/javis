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
        $sql = "SELECT a.* FROM advertisement as a LEFT JOIN contract_advertisement as ca ON a.id = ca.advertisement_id LEFT JOIN contract as c ON ca.contract_id = c.id WHERE c.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $contract_id));
    }


}