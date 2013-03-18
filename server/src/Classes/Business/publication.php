<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Publication extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'publication';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter,$query) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $where_clause = "WHERE deleted_at is null ";
        if($filter){
            $where_clause .= "WHERE deleted_at is null AND ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'client_id'){
                    $where_clause = sprintf(" left join advertisement_publication as ap on p.id = ap.publication_id
                                    left join advertisement as a on ap.advertisement_id = a.id
                                    left join contract_advertisement as ca on a.id = ca.advertisement_id
                                    left join contract as c on ca.contract_id = c.id
                                    left join client as cl on c.client_id = cl.id
                                    where cl.id = %d and p.deleted_at is null
                                    group by p.id",$fltr['value']);
                } else if($fltr['property'] == 'description'){
                    $where_clase = " description LIKE '%".$fltr['value']."'";
                } else {
                    $where_clause .= $fltr['property']." = ".$fltr['value'];
                }
            }
        } else if($query){
            $where_clause .= "AND description LIKE '%".$query."%'";
        }
        $sql = "SELECT p.* FROM publication as p $where_clause $limit_clause";
        return $this->db->fetchAll($sql);
    }


    public function getTotalCount($filter = null,$query=null) {
        $where_clause = "WHERE deleted_at is null ";
        if($filter){
            $where_clause = "WHERE deleted_at is null AND ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                if($fltr['property'] == 'client_id'){
                    $where_clause = sprintf(" left join advertisement_publication as ap on p.id = ap.publication_id
                                    left join advertisement as a on ap.advertisement_id = a.id
                                    left join contract_advertisement as ca on a.id = ca.advertisement_id
                                    left join contract as c on ca.contract_id = c.id
                                    left join client as cl on c.client_id = cl.id
                                    where cl.id = %d AND p.deleted_at is null
                                    group by p.id",$fltr['value']);
                } else {
                    $where_clause .= $fltr['property']." = ".$fltr['value'];
                }
            }
        } else if($query){
            $where_clause .= "AND description LIKE '%".$query."%'";
        }
        $sql = "SELECT count(*) as 'totalCount' FROM publication as p $where_clause";
        return $this->db->fetchAssoc($sql);
    }

    public function createPublication($params){
        unset($params['advertisement'],$params['postal_code'],$params['territory']);
        $postal_code_array = $params['postal_codes'];
        unset($params['postal_codes']);
        $this->db->insert('publication',$params);
        $pub_id = $this->db->lastInsertId();
        foreach($postal_code_array as $postal_code){
            $this->db->insert('publication_zip', array('publication_id' => $pub_id, 'postal_code_id' => $postal_code));
        }
        $publication = $this->getById($pub_id);
        return $publication;
    }

    public function updatePublication($id, $params) {
        unset($params['advertisement'],$params['postal_code'],$params['territory'],$params['id']);
        $postal_code_array = $params['postal_codes'];
        unset($params['postal_codes']);
        $this->db->update('publication',$params, array('id'=>$id));
        $this->db->delete('publication_zip',array("publication_id"=>$id));
        foreach($postal_code_array as $postal_code){
            $this->db->insert('publication_zip', array('publication_id' => $id, 'postal_code_id' => $postal_code));
        }
        $publication = $this->getById($pub_id);
        return $publication;
    }

    public function deleteById($id) {
        return $this->db->update('publication',array("deleted_at" => "now()"), array("id" => $id));
    }

    public function getById($id) {
        $sql = "SELECT * FROM publication WHERE id = ? and deleted_at is null";
        return $this->db->fetchAll($sql,array((int)$id));
    }
}