<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Client extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'client';
    }

    public function getAll($page = null,$start = 0,$limit = 0,$filter,$sort) {
        $wherestr = $this->getWhereString($filter);
        $sortstr = $this->getSortString($sort);
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";

        $sql = "SELECT c.*,s.name as 'state',
        TRUNCATE(IFNULL(SUM(con.total_amount)/(CASE WHEN count(distinct p.id) = 0 THEN count(distinct c.id) ELSE count(distinct p.id) END)-IFNULL(SUM(CASE WHEN p.contract_id = con.id THEN p.payment_amount ELSE 0 END),0.00),0.00),2) as 'balance' FROM client AS c
        LEFT JOIN state s ON c.state_id = s.id
        LEFT JOIN payment p ON c.id = p.client_id
        LEFT JOIN contract con ON c.id = con.client_id
        LEFT JOIN territory t ON c.territory_id = t.id
        LEFT JOIN employee e ON c.salesrep_id = e.id
        LEFT JOIN postal_code pc ON c.postal_code_id = pc.id
        LEFT JOIN (SELECT COUNT(cd.id)-COUNT(p.id) as 'cnt', cd.contract_id from contract_duration as cd LEFT JOIN payment as p on cd.duration_id = p.duration_id GROUP BY cd.contract_id) as rm on rm.contract_id = con.id
        WHERE $wherestr
        AND c.deleted_at IS NULL
        GROUP BY c.id
        $sortstr
        $limit_clause";
        //return print_r($sql);
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
        AND c.deleted_at IS NULL
        GROUP BY c.id";
        return $this->db->fetchAll($sql,array((int) $id));
    }

    public function getRemainingMonths($id){
        $sql = "SELECT (dr - pd) as 'cnt' FROM (SELECT count(p.id) AS 'pd' FROM payment p WHERE p.contract_id IN (select id from contract where client_id = ? and deleted_at is null)) AS payments, (SELECT count(cd.id) AS 'dr' FROM contract_duration cd WHERE contract_id IN (select id from contract where client_id = ? and deleted_at is null)) AS durations";
        return $this->db->fetchAssoc($sql,array((int) $id,(int) $id));
    }

    public function createClient($params) {
        $this->db->insert('client',$params);
        $client_id = $this->db->lastInsertId();
        return $client_id;
    }

    public function updateClient($id, $params) {
        //print_r($params);
        // search for new postal code
        $postal_code = $params['postal_code_iso'];
        $postal_code_id = null;
        if($postal_code != "") {
            $sql = "SELECT * FROM postal_code WHERE iso_code = $postal_code";
            $rs = $this->db->fetchAll($sql);

            if(count($rs) == 0){
                // add the new postal code
                $array = array();
                $array['iso_code'] = $postal_code;
                $this->db->insert('postal_code',$array);
                $postal_code_id = $this->db->lastInsertId();
            } else {
                $postal_code_id = $rs[0]['id'];
            }
        }
        unset($params['id'],$params['state'],$params['postal_code'],$params['territory'],$params['balance']);
        unset($params['remaining_months'],$params['overdue_balance'],$params['salesrep'],$params['territory_name']);
        unset($params['insert_user_id'], $params['created_at'],$params['salesrep_name'],$params['state_name']);
        unset($params['postal_code_iso'],$params['remaining_months_cnt'],$params['updated_at'],$params['deleted_at']);
        $params['postal_code_id'] = $postal_code_id;
        $this->db->update('client',$params, array('id'=>$id));
        return $id;
    }

    public function searchForClient($search,$page = null,$start = 0,$limit = 0,$isCount = false,$sort) {
        ($start === null)?$start = "":$start;
        ($limit === null)?$limit_clause="":$limit_clause = "LIMIT $limit OFFSET $start";
        $search_string = json_decode($search,TRUE);
        $sortstr = $this->getSortString($sort);
        $fields = $search_string['fields'];
        $query = $search_string['query'];
        $wherestr = " 0 = 0 ";
        $js = "";
        $qs = "";
        ($isCount)?$limit_clause="":$limit_clause = $limit_clause;
        //{"fields":["company_name","stage","address1","address2","city","state_name","postal_code_iso","territory_name"],"query":"Wauwa"}
        if(is_array($fields)){
             for ($i=0;$i<count($fields);$i++){
                switch($fields[$i]){
                    case 'territory_name':
                        $js .= " LEFT JOIN territory ON c.territory_id = territory.id";
                        $qs .= " OR territory.name LIKE '%".$query."%'";
                        break;
                    case 'postal_code_iso':
                        $js .= " LEFT JOIN postal_code ON c.postal_code_id = postal_code.id";
                        $qs .= " OR postal_code.iso_code LIKE '%".$query."%'";
                        break;
                    case 'state_name':
                        $qs .= " OR s.name LIKE '%".$query."%'";
                        break;
                    case 'salesrep_name':
                        $js .= " LEFT JOIN employee ON c.salesrep_id = employee.id";
                        $qs .= " OR employee.first_name LIKE '%".$query."%' OR employee.last_name LIKE '%".$query."%' OR employee.username LIKE '%".$query."%'";
                        break;
                    default:
                        $qs .= " OR ".$fields[$i]." LIKE '%".$query."%'"; break;
                }
             }
        }
        $wherestr .= $qs;
        $wherestr = substr_replace($wherestr," AND ",7,3);
        $sql = "SELECT c.*,s.name as 'state',
        TRUNCATE(IFNULL(SUM(con.total_amount)/(CASE WHEN count(distinct p.id) = 0 THEN count(distinct c.id) ELSE count(distinct p.id) END)-IFNULL(SUM(CASE WHEN p.contract_id = con.id THEN p.payment_amount ELSE 0 END),0.00),0.00),2) as 'balance' FROM client AS c
        LEFT JOIN state s ON c.state_id = s.id
        LEFT JOIN payment p ON c.id = p.client_id
        LEFT JOIN contract con ON c.id = con.client_id
        LEFT JOIN territory t ON c.territory_id = t.id
        LEFT JOIN employee e ON c.salesrep_id = e.id
        LEFT JOIN postal_code pc ON c.postal_code_id = pc.id
        LEFT JOIN (SELECT COUNT(cd.id)-COUNT(p.id) as 'cnt', cd.contract_id from contract_duration as cd LEFT JOIN payment as p on cd.duration_id = p.duration_id GROUP BY cd.contract_id) as rm on rm.contract_id = con.id
        $js
        WHERE $wherestr
        AND c.deleted_at IS NULL
        GROUP BY c.id
        $sortstr
        $limit_clause";
        return $this->db->fetchAll($sql);
    }

    public function deleteClient($id) {
        $now = new \DateTime('NOW');
        $params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('client',$params, array('id' => $id));
        $client = $this->getById($id);
        return $client;
    }

    public function getSortString($sort){
        $sort_string = json_decode($sort,TRUE);
        $property = $sort_string[0]['property'];
        $direction = $sort_string[0]['direction'];
        switch($property){
            case 'postal_code_iso':
                $property = 'pc.iso_code';break;
            case 'territory_name':
                $property = 't.name';break;
            case 'salesrep_name':
                $property = 'e.username';break;
            default:
                if($property == null){
                    $property = 'c.id';
                }
                if($direction == null){
                  $direction = 'ASC';
                }
                break;
        }
        return "ORDER BY $property $direction";
    }
}