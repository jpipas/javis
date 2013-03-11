<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Client extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'client';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter) {
        $wherestr = $this->getWhereString($filter);

        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $sql = "SELECT c.*,s.name as 'state',
        TRUNCATE(IFNULL(SUM(con.total_amount)/(CASE WHEN count(distinct p.id) = 0 THEN count(distinct c.id) ELSE count(distinct p.id) END)-IFNULL(SUM(CASE WHEN p.contract_id = con.id THEN p.payment_amount ELSE 0 END),0.00),0.00),2) as 'balance' FROM client AS c
        LEFT JOIN state s ON c.state_id = s.id
        LEFT JOIN payment p ON c.id = p.client_id
        LEFT JOIN contract con ON c.id = con.client_id
        LEFT JOIN (SELECT COUNT(cd.id)-COUNT(p.id) as 'cnt', cd.contract_id from contract_duration as cd LEFT JOIN payment as p on cd.duration_id = p.duration_id GROUP BY cd.contract_id) as rm on rm.contract_id = con.id
        WHERE $wherestr
        GROUP BY c.id
        $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function getById($id){
        $sql = "SELECT c.*,s.name as 'state',
        TRUNCATE(IFNULL(SUM(con.total_amount)/(CASE WHEN count(distinct p.id) = 0 THEN count(distinct c.id) ELSE count(distinct p.id) END)-IFNULL(SUM(CASE WHEN p.contract_id = con.id THEN p.payment_amount ELSE 0 END),0.00),0.00),2) as 'balance' FROM client AS c
        LEFT JOIN state s ON c.state_id = s.id
        LEFT JOIN payment p ON c.id = p.client_id
        LEFT JOIN contract con ON c.id = con.client_id
        LEFT JOIN (SELECT COUNT(cd.id)-COUNT(p.id) as 'cnt', cd.contract_id from contract_duration as cd LEFT JOIN payment as p on cd.duration_id = p.duration_id GROUP BY cd.contract_id) as rm on rm.contract_id = con.id
        WHERE c.id = ?
        GROUP BY c.id";
        return $this->db->fetchAll($sql,array((int) $id));
    }

    public function getRemainingMonths($id){
        $sql = "SELECT (dr - pd) as 'cnt' FROM (SELECT count(p.id) AS 'pd' FROM payment p WHERE p.contract_id IN (select id from contract where client_id = ? and deleted_at is null)) AS payments, (SELECT count(cd.id) AS 'dr' FROM contract_duration cd WHERE contract_id IN (select id from contract where client_id = ? and deleted_at is null)) AS durations";
        return $this->db->fetchAssoc($sql,array((int) $id,(int) $id));
    }

    public function createClient() {
        $this->db->insert('client',$params);
        $client = $this->getById($this->db->lastInsertId());
        return $client;
    }

    public function updateClient($id, $params) {
        unset($params['id'],$params['state'],$params['postal_code'],$params['territory'],$params['balance']);
        unset($params['remaining_months'],$params['overdue_balance'],$params['salesrep']);
        $this->db->update('client',$params, array('id'=>$id));
        $client = $this->getById($id);
        return $client;
    }
}