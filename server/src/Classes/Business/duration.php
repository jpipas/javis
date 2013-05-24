<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Duration extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'duration';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter,$query) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $where_clause = "";
        if($filter){
            $where_clause .= "WHERE 0 = 0 ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'contract_id'){
                    $where_clause = sprintf(" left join contract_duration as cd on d.id = cd.duration_id
                                    where cd.contract_id = %d",$fltr['value']);
                } else if($fltr['property'] == 'description'){
                    if(array_key_exists('value', $fltr)){
                        $where_clause .= " AND description LIKE '%".$fltr['value']."%'";
                    }
                } else if($fltr['property'] == 'payment_window') {
                    $where_clause .= " AND d.id NOT IN (SELECT p.duration_id FROM payment p WHERE p.contract_id =".$fltr['value'].")";
                } else {
                    $where_clause .= " AND ".$fltr['property']." = ".$fltr['value'];
                }
            }
        }
        if($query){
            $where_clause .= "WHERE description LIKE '%$query%'";
        }
        $sql = "SELECT d.* FROM duration as d $where_clause ORDER BY d.date_string";
        return $this->db->fetchAll($sql);
    }

    public function getByContractId($id){
        $sql = "SELECT d.* FROM duration as d LEFT JOIN contract_duration as cd on d.id = cd.duration_id WHERE cd.contract_id = $id ORDER BY d.date_string";
        return $this->db->fetchAll($sql);
    }

}