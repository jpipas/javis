<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class ContactRole extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'contact_role';
    }

    public function getAll() {
        $sql = "SELECT * FROM contact_role WHERE deleted_at IS NULL";
        return $this->db->fetchAll($sql);
    }

		public function getById($id)
		{
			$sql = "SELECT
				*
			FROM
				contact_role
			WHERE
				deleted_at IS NULL AND
				id = ?";
			return $this->db->fetchAssoc($sql,array((int) $id));
		}
}