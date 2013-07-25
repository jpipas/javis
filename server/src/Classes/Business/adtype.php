<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class AdType extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'ad_type';
    }

    public function getAll() {
        $sql = "SELECT
        	*
        FROM
        	ad_type 
        WHERE
        	deleted_at IS NULL
        ORDER BY
        	description";
        return $this->db->fetchAll($sql);
    }

}