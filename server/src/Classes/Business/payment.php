<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Payment extends AbstractBusinessService {

    public function getTableName()
    {
        return 'payment';
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
        $sql = "SELECT p.* FROM payment as p $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function createPayment($params) {
        $this->db->insert('payment',$params);
        $payment = $this->getById($this->db->lastInsertId());
        return $payment;
    }

    public function updatePayment($id, $params) {
        unset($params['id']);
        $duration_array = $params['durations'];
        unset($params['durations']);
        unset($params['client_name']);
        unset($params['payment_term_description']);
        $this->db->update('payment',$params, array('id'=>$id));
        $this->db->delete('payment_duration',array("payment_id"=>$id));
        foreach($duration_array as $duration){
            $this->db->insert('payment_duration', array("payment_id"=>$id,"duration_id"=>$duration['id']));
        }
        $payment = $this->getById($id);
        return $payment;
    }

    public function getById($id) {
        $sql = "SELECT * FROM payment WHERE id = ?";
        return $this->db->fetchAll($sql,array((int)$id));
    }
}