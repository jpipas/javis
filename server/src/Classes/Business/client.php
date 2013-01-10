<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Client extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'client';
    }

    public function getAll($page = null,$start = 0,$limit = 0) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $sql = "SELECT c.*,s.name as 'state',
        TRUNCATE(SUM(CASE WHEN con.id = rm.contract_id THEN rm.cnt ELSE 0 END)/COUNT(distinct p.id),0) as 'remaining_months',
        TRUNCATE(IFNULL(SUM(con.total_amount)-IFNULL(SUM(p.payment_amount),0.00),0.00)/COUNT(distinct p.id),2) as 'balance' FROM client AS c
        LEFT JOIN state s ON c.state_id = s.id
        LEFT JOIN payment p ON c.id = p.client_id
        LEFT JOIN contract con ON c.id = con.client_id
        LEFT JOIN (SELECT COUNT(cd.id)-COUNT(p.id) as 'cnt', cd.contract_id from contract_duration as cd LEFT JOIN payment as p on cd.duration_id = p.duration_id GROUP BY cd.contract_id) as rm on rm.contract_id = con.id
        GROUP BY c.id
        $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function getById($id){
        $sql = "SELECT c.*,s.name as 'state',
        TRUNCATE(SUM(CASE WHEN con.id = rm.contract_id THEN rm.cnt ELSE 0 END)/COUNT(distinct p.id),0) as 'remaining_months',
        TRUNCATE(IFNULL(SUM(con.total_amount)-IFNULL(SUM(p.payment_amount),0.00),0.00)/COUNT(distinct p.id),2) as 'balance' FROM client AS c
        LEFT JOIN state s ON c.state_id = s.id
        LEFT JOIN payment p ON c.id = p.client_id
        LEFT JOIN contract con ON c.id = con.client_id
        LEFT JOIN (SELECT COUNT(cd.id)-COUNT(p.id) as 'cnt', cd.contract_id from contract_duration as cd LEFT JOIN payment as p on cd.duration_id = p.duration_id GROUP BY cd.contract_id) as rm on rm.contract_id = con.id
        WHERE c.id = ?
        GROUP BY c.id";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
}