<?php

namespace JavisERP\System\Database;

use Doctrine\DBAL\Connection;

abstract class AbstractBusinessService
{
    abstract public function getTableName();

    public $db;

    public function __construct(Connection $db = null)
    {
        $this->db = $db;
    }

    public function getTotalCount($filter = null){
        $where_clause = "";
        $where_clause .= "WHERE deleted_at is null AND ";
        $where_clause .= $this->getWhereString($filter);
        $sql = "SELECT count(*) as 'totalCount' FROM ".$this->getTableName()." ".$where_clause;
        return $this->db->fetchAssoc($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM ".$this->getTableName()." WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }

    public function deleteById($id) {
        return $this->db->update($this->getTableName(),array("deleted_at" => "now()"), array("id" => $id));
    }

    public function getWhereString($filter){
        $where = " 0 = 0 ";
        $qs = "";
        if (is_array($filter)) {
            for ($i=0;$i<count($filter);$i++){
                switch($filter[$i]['data']['type']){
                    case 'string' :
                        switch ($filter[$i]['field']){
                            case 'cl.territory_id':
                            case 'p.id':
                            case 'd.id':
                                $qs .= " AND ".$filter[$i]['field']." = ".$filter[$i]['data']['value'];break;
                            default:
                                $qs .= " AND ".$filter[$i]['field']." LIKE '%".$filter[$i]['data']['value']."%'"; break;
                        }
                    break;
                    case 'list' :
                        if (strstr($filter[$i]['data']['value'],',')){
                            $fi = explode(',',$filter[$i]['data']['value']);
                            for ($q=0;$q<count($fi);$q++){
                                $fi[$q] = "'".$fi[$q]."'";
                            }
                            $filter[$i]['data']['value'] = implode(',',$fi);
                            $qs .= " AND ".$filter[$i]['field']." IN (".$filter[$i]['data']['value'].")";
                        }else{
                            $qs .= " AND ".$filter[$i]['field']." = '".$filter[$i]['data']['value']."'";
                        }
                    break;
                    case 'boolean' : $qs .= " AND ".$filter[$i]['field']." = ".($filter[$i]['data']['value']); break;
                    case 'numeric' :
                        switch ($filter[$i]['data']['comparison']) {
                            case 'eq' : $qs .= " AND ".$filter[$i]['field']." = ".$filter[$i]['data']['value']; break;
                            case 'lt' : $qs .= " AND ".$filter[$i]['field']." < ".$filter[$i]['data']['value']; break;
                            case 'gt' : $qs .= " AND ".$filter[$i]['field']." > ".$filter[$i]['data']['value']; break;
                        }
                    break;
                    case 'date' :
                        switch ($filter[$i]['data']['comparison']) {
                            case 'eq' : $qs .= " AND ".$filter[$i]['field']." = '".date('Y-m-d',strtotime($filter[$i]['data']['value']))."'"; break;
                            case 'lt' : $qs .= " AND ".$filter[$i]['field']." < '".date('Y-m-d',strtotime($filter[$i]['data']['value']))."'"; break;
                            case 'gt' : $qs .= " AND ".$filter[$i]['field']." > '".date('Y-m-d',strtotime($filter[$i]['data']['value']))."'"; break;
                        }
                    break;
                }
            }
            $where .= $qs;

        } else {
            $filter_array = json_decode($filter,true);
            for($i=0;$i<count($filter_array);$i++){
                if(array_key_exists('value',$filter_array[$i])){
                   $qs .= " AND ".$filter_array[$i]['property']." = ".$filter_array[$i]['value'];
                }
            }
            $where .= $qs;
        }
        return $where;
    }
}