<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Contract extends AbstractBusinessService {

    public function getTableName()
    {
        return 'contract';
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
        $sql = "SELECT c.* FROM contract as c $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }
}