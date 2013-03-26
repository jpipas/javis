<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class AdList extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'ad_list';
    }

    public function getList($filter = null) {
        $wherestr = "0 = 0";
        if($filter) {
            $wherestr = $this->getWhereString($filter);
        }
        $sql = "select distinct cl.company_name as 'client', con.full_name as 'marketing_dir', adt.description as 'ad_type', ads.description as 'ad_size', ds.username as 'designer', ep.username as 'salesrep', CASE WHEN a.seasonal_promo = 1 THEN 'Yes' ELSE 'No' END as 'seasonal' from advertisement a
            left join client cl on a.client_id = cl.id
            left join contact con on cl.id = con.client_id
            left join employee ep on cl.salesrep_id = ep.id
            left join employee ds on a.designer_id = ds.id
            left join ad_size ads on a.ad_size_id = ads.id
            left join ad_type adt on a.ad_type_id = adt.id
            left join advertisement_publication ap on a.id = ap.advertisement_id
            left join publication p on ap.publication_id = p.id
            left join contract_advertisement ca on a.id = ca.advertisement_id
            left join contract c on ca.contract_id = c.id
            left join contract_duration cd on c.id = cd.contract_id
            left join duration d on cd.duration_id = d.id
            WHERE $wherestr
            and con.role_id = 2";
        //echo $sql;
        return $this->db->fetchAll($sql);
    }

}