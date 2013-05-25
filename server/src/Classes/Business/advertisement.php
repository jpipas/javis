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
        $where_clause = "WHERE deleted_at is null";
        if($filter){
            $where_clause .= " AND ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'contract_id'){
                   return $this->getByContractId($fltr['value']);
                }
                $where_clause .= $fltr['property']." = ".$fltr['value'];
            }
        }
        $sql = "SELECT a.* FROM advertisement as a $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function getById($id){
        $sql = "SELECT a.* FROM advertisement as a WHERE a.id = ?";
        return $this->db->fetchAll($sql,array((int) $id));
    }

    public function createAdvertisement($params){
        $publications_array = array();
        $publications_array = $params['publications'];
        $contract_id = $params['contract_id'];
        //echo $contract_id;
        unset($params['publications']);
        unset($params['contract_id'],$params['deleted_at'],$params['created_at'],$params['updated_at']);
        unset($params['edit_action'], $params['view_action'], $params['delete_action'], $params['publications'], $params['client']);
        $this->db->insert('advertisement',$params);
        $ad_id = $this->db->lastInsertId();
        $this->db->insert('contract_advertisement',array("contract_id"=>$contract_id,"advertisement_id"=>$ad_id));
        foreach($publications_array as $publication){
            $this->db->insert('advertisement_publication', array("advertisement_id"=>$ad_id,"publication_id"=>$publication));
        }
        $advertisement = $this->getById($ad_id);
        return $advertisement;
    }


    public function getByContractId($contract_id) {
        $sql = "SELECT a.* FROM advertisement as a LEFT JOIN contract_advertisement as ca ON a.id = ca.advertisement_id LEFT JOIN contract as c ON ca.contract_id = c.id WHERE c.id = ? AND a.deleted_at is null";
        //echo $contract_id;
        //echo $sql;
        return $this->db->fetchAll($sql,array((int) $contract_id));
    }

    public function deleteByContractId($contract_id) {
        $sql = "UPDATE advertisement a SET a.deleted_at = NOW() WHERE a.id IN (SELECT advertisement_id FROM contract_advertisement WHERE contract_id = ?)";
        return $this->db->executeQuery($sql,array((int) $contract_id));
        //$this->db->update('advertisement',array("deleted_at"=>"now"),array("contract_id"=>$contract_id));
    }

    public function deleteById($id) {
        return $this->db->update('advertisement',array("deleted_at" => "now()"), array("id" => $id));
    }
}