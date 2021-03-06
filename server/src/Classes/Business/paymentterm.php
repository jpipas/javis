<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class PaymentTerm extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'payment_term';
    }

    public function getAll() {
        $sql = "SELECT
        	*
        FROM
        	payment_term
        WHERE
        	deleted_at IS NULL
        ORDER BY
        	payment_term.description";
        return $this->db->fetchAll($sql);
    }

}