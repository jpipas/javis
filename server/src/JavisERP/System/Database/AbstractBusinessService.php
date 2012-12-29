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
        if($filter){
            $where_clause .= "WHERE ";
            $filter_array = json_decode($filter,true);
            foreach($filter_array as $fltr){
                $where_clause .= $fltr['property']." = ".$fltr['value'];
            }
        }
        $sql = "SELECT count(*) as 'totalCount' FROM ".$this->getTableName()." ".$where_clause;
        return $this->db->fetchAssoc($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM ".$this->getTableName()." WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
}