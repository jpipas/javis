<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class PaymentCategory extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'payment_category';
    }

    public function getAll() {
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	payment_category.*
        FROM
        	payment_category
        WHERE
        	deleted_at IS NULL";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

}