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
        $sql = "SELECT * FROM payment_type";
        return $this->db->fetchAll($sql);
    }

}