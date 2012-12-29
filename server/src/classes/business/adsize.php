<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class AdSize extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'ad_size';
    }

    public function getAll() {
        $sql = "SELECT * FROM ad_size";
        return $this->db->fetchAll($sql);
    }

}