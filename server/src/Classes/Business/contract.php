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
        $where_clause .= "WHERE deleted_at is null ";
        if($filter){
            $where_clause .= " AND ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                $where_clause .= $fltr['property']." = ".$fltr['value'];
            }
        }
        $sql = "SELECT c.* FROM contract as c $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function createContract($params) {
        unset($params['durations']);
        unset($params['payment_term_description']);
        $this->db->insert('contract',$params);
        $contract = $this->getById($this->db->lastInsertId());
        return $contract;
    }

    public function updateContract($id, $params) {
        unset($params['id']);
        $duration_array = $params['durations'];
        unset($params['durations']);
        unset($params['client_name']);
        unset($params['payment_term_description']);
        $this->db->update('contract',$params, array('id'=>$id));
        $this->db->delete('contract_duration',array("contract_id"=>$id));
        foreach($duration_array as $duration){
            $this->db->insert('contract_duration', array("contract_id"=>$id,"duration_id"=>$duration['id']));
        }
        $contract = $this->getById($id);
        return $contract;
    }

    public function getById($id) {
        $sql = "SELECT * FROM contract WHERE id = ? and deleted_at is null";
        return $this->db->fetchAll($sql,array((int)$id));
    }

    public function deleteById($id) {
        return $this->db->update('contract',array("deleted_at" => "now()"), array("id" => $id));
    }
}