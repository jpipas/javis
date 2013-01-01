<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Publication extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'publication';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $where_clause = "";
        if($filter){
            $where_clause .= "WHERE ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'client_id'){
                    $where_clause = sprintf(" left join advertisement_publication as ap on p.id = ap.publication_id
                                    left join advertisement as a on ap.advertisement_id = a.id
                                    left join contract_advertisement as ca on a.id = ca.advertisement_id
                                    left join contract as c on ca.contract_id = c.id
                                    left join client as cl on c.client_id = cl.id
                                    where cl.id = %d
                                    group by p.id",$fltr['value']);
                } else if($fltr['property'] == 'description'){
                    $where_clase = " description LIKE '%".$fltr['value']."'";
                } else {
                    $where_clause .= $fltr['property']." = ".$fltr['value'];
                }
            }
        }
        $sql = "SELECT p.* FROM publication as p $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }


    public function getTotalCount($filter = null) {
        $where_clause = "";
        if($filter){
            $where_clause .= "WHERE ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'client_id'){
                    $where_clause = sprintf(" left join advertisement_publication as ap on p.id = ap.publication_id
                                    left join advertisement as a on ap.advertisement_id = a.id
                                    left join contract_advertisement as ca on a.id = ca.advertisement_id
                                    left join contract as c on ca.contract_id = c.id
                                    left join client as cl on c.client_id = cl.id
                                    where cl.id = %d
                                    group by p.id",$fltr['value']);
                } else {
                    $where_clause .= $fltr['property']." = ".$fltr['value'];
                }
            }
        }
        $sql = "SELECT count(*) as 'totalCount' FROM publication as p $where_clause";
        return $this->db->fetchAssoc($sql);
    }
}