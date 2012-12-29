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

    public function getTotalCount(){
        $sql = "SELECT count(*) as 'totalCount' FROM ".$this->getTableName();
        return $this->db->fetchAssoc($sql);
    }

    public function getById($id) {
        $sql = "SELECT * FROM ".$this->getTableName()." WHERE id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
}