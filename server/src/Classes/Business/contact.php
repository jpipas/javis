<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Contact extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'contact';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter) {
        $wherestr = $this->getWhereString($filter);
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $sql = "SELECT * FROM contact WHERE $wherestr $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function getByClientId($client_id) {
        $sql = "SELECT * FROM contact where client_id = ?";
        return $this->db->fetchAll($sql, array((int) $client_id));
    }

    public function getById($id) {
        $sql = "SELECT * FROM contact WHERE id = ? and deleted_at is null";
        return $this->db->fetchAll($sql,array((int)$id));
    }

    public function createContact($params) {
        unset($params['role']);
        unset($params['id']);
        $this->db->insert('contact',$params);
        $contact = $this->getById($this->db->lastInsertId());
        return $contact;
    }

    public function updateContact($id, $params) {
        unset($params['id']);
        $this->db->update('contact',$params, array('id'=>$id));
        $contact = $this->getById($id);
        return $contact;
    }

}