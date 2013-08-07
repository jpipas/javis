<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class PaymentType extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'payment_type';
    }

    public function getAll() {
        $sql = "SELECT
        	*
        FROM
        	payment_type
        WHERE
        	payment_type.deleted_at IS NULL
        ORDER BY
        	payment_type.description";
        return $this->db->fetchAll($sql);
    }

}