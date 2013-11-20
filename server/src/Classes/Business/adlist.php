<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class AdList extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'ad_list';
    }

    public function getList($page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array())
    {
        $lsql = '';
		if (is_numeric($start) && is_numeric($limit)){
    			$lsql = " LIMIT $start, $limit";
		}
    		
		// sort our results
		if (is_array($sort)){
			$order = array();
			array_walk($sort, function($sort, $key) use (&$order){
				$order[] = $sort['property'].' '.$sort['direction'];
			});
			$osql = implode(', ', $order);
		} else {
			$osql = 'd.date_string';
		}
    		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			//$where[] = "p.description LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					if ($f['property'] == 'client_id'){
						$where[$f['property']] = 'cl.id = '.$qq;
					} else {
						$where[$f['property']] = $f['property']." = ".$qq;
					}
        		}
			}
		
		// search criteria was passed in
		} elseif (isset($search['query']) && !empty($search['query'])){
			if (@count($search['fields']) >= 1){
				$or = array();
				$qq = $this->db->quote($search['query'].'%');
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq){
					$or[] = $field.' LIKE '.$qq;
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			}
		}
    		
		// make sure we have a territory, publication, and duration
		if (isset($where['c.territory_id']) && isset($where['p.id']) && isset($where['d.id'])){
    		if (@count($where) > 0){
    			$wsql = " AND ".implode(" AND ", $where);
    		}
	        $sql = "SELECT SQL_CALC_FOUND_ROWS
	        	DISTINCT(cl.company_name) 				AS 'client',
	        	con.full_name 							AS 'marketing_dir',
	        	c.contract_number						AS contract_number,
	        	c.notes									AS contract_notes,
	        	adt.description 						AS 'ad_type',
	        	ads.description 						AS 'ad_size',
	        	ds.username 							AS 'designer',
	        	CONCAT(ds.first_name,' ',ds.last_name) 	AS designer_name,
	        	ep.username 							AS 'salesrep', 
	        	CONCAT(ep.first_name,' ',ep.last_name) 	AS salesrep_name,
	        	CASE WHEN a.seasonal_promo = 1 THEN 'Yes' ELSE 'No' END AS 'seasonal'
	        FROM
	        	(advertisement AS a)
	        LEFT JOIN client AS cl ON a.client_id = cl.id
	        LEFT JOIN contact AS con ON cl.id = con.client_id AND con.role_id = 2
	        LEFT JOIN employee AS ds ON a.designer_id = ds.id
	        LEFT JOIN ad_size AS ads ON a.ad_size_id = ads.id
	        LEFT JOIN ad_type AS adt ON a.ad_type_id = adt.id
	        LEFT JOIN advertisement_publication AS ap ON a.id = ap.advertisement_id
	        LEFT JOIN publication AS p ON ap.publication_id = p.id
	        LEFT JOIN contract_advertisement AS ca ON a.id = ca.advertisement_id
	        LEFT JOIN contract AS c ON ca.contract_id = c.id
	        LEFT JOIN contract_duration AS cd ON c.id = cd.contract_id
	        LEFT JOIN duration AS d ON cd.duration_id = d.id
	        LEFT JOIN employee AS ep ON c.soldby_id = ep.id
	        WHERE 
	        	a.deleted_at IS NULL AND
	        	c.deleted_at IS NULL AND
	        	cl.deleted_at IS NULL AND
	        	(c.cancelled_at IS NULL OR c.cancelled_at > d.date_string)
	        $wsql
	        ORDER BY
	        	$osql
	        $lsql";
	        $rows = $this->db->fetchAll($sql);
	        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
	        return array($totalCount, $rows);
	        
		// if a territory, publication, and duration weren't specified, then don't search
		} else {
			return array(0, array());
		}
    }

}