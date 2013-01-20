<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class PostalCode extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'postal_code';
    }

    public function getAll() {
        $sql = "SELECT * FROM postal_code";
        return $this->db->fetchAll($sql);
    }

    public function getByPublicationId($id){
        $sql = "SELECT pc.* FROM postal_code pc LEFT JOIN publication_zip pz ON pc.id = pz.postal_code_id WHERE pz.publication_id = ?";
        return $this->db->fetchAll($sql,array((int) $id));
    }
}