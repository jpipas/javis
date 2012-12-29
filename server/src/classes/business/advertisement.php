<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Advertisement extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'advertisement';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $where_clause = "";
        if($filter){
            $where_clause .= "WHERE ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                $where_clause .= $fltr['property']." = ".$fltr['value'];
            }
        }
        $sql = "SELECT a.* FROM advertisement as a $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function getByContractId($contract_id) {
        $sql = "SELECT a.* FROM advertisement as a LEFT JOIN contract_advertisement as ca ON a.id = ca.advertisement_id LEFT JOIN contract as c ON ca.contract_id = c.id WHERE c.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $contract_id));
    }


}