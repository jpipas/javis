<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;
use PHPExcel;

class ReportContractMetrics extends AbstractBusinessService
{
    public function getTableName()
    {
        return '';
    }

	public function getReport(&$app, $criteria, $node = '', $output = '')
	{
		$error = array();
		if (!isset($criteria['duration_id'])){
			$error[] = 'Sales period is required';
		} else {
			$duration = $app['business.duration']->getById($criteria['duration_id']);
			if (empty($duration['id'])){
				$error[] = 'Invalid period specified';
			}
		}
		if (@count($error) > 0){
			return array('error' => $error);
		}
		set_time_limit(120);
		
		$sql = array();
		// limit by sales rep
		if (isset($criteria['soldby_id'])){
			if (is_array($criteria['soldby_id'])){
				if (@count($criteria['soldby_id']) > 0){
					$sql[] = "c.soldby_id IN ('".implode("', '", $criteria['soldby_id'])."')";
				}
			} elseif (!empty($criteria['soldby_id'])) {
				$sql[] = "c.soldby_id = ".$this->db->quote($criteria['soldby_id']);
			}
		}
		
		// limit by territory
		if (isset($criteria['territory_id'])){
			if (is_array($criteria['territory_id'])){
				if (@count($criteria['territory_id']) > 0){
					$sql[] = "t.id IN ('".implode("', '", $criteria['territory_id'])."')";
				}
			} elseif (!empty($criteria['territory_id'])) {
				$sql[] = "t.id = ".$this->db->quote($criteria['territory_id']);
			}
		}
		
		// limit by region
		if (isset($criteria['region_id'])){
			if (is_array($criteria['region_id'])){
				if (@count($criteria['region_id']) > 0){
					$sql[] = "r.id IN ('".implode("', '", $criteria['region_id'])."')";
				}
			} elseif (!empty($criteria['region_id'])) {
				$sql[] = "r.id = ".$this->db->quote($criteria['region_id']);
			}
		}
		
		// see if we need to limit what they can see
		if ($app['business.user']->hasPermission($app, 'contract_view_limit')){
    		$tids = $app['business.user']->getUserVisibleTerritories($app);
    		$eids = $app['business.user']->getUserVisibleDirectReports($app);
    		$sql[] = "(c.soldby_id IN ('".implode("', '", $eids)."') OR c.territory_id IN ('".implode("', '", $tids)."'))";
    	}
		
		$wsql = '';
		if (@count($sql) > 0){
			$wsql = ' AND '.implode(' AND ', $sql);
		}
		
		$paytypes = $app['business.paymenttype']->getAll();
		
		// get report data
		$result = array();
		
		/* SPECIFIC CONTRACTS FOR FOUND TERRITORIES */
		$sth = $this->db->executeQuery("SELECT
			t.id							AS territory_id,
			t.name							AS territory_name,
			r.id							AS region_id,
			r.title							AS region_title,
			c.soldby_id,
			CONCAT(e.first_name, ' ',e.last_name) AS soldby_name,
			c.id							AS contract_id,
			cl.company_name,
			c.contract_number				AS text,
			c.contract_number,
			c.subtotal,
			c.monthly_payment,
			c.design_fee,
			IF(payment_type.revenue_affecting = 1,c.discount,0) AS discount,
			c.durations									AS durations,
			c.cancelled_at								AS cancelled_at,
			payment_type.description					AS payment_type_description,
			payment_type.abbrev							AS payment_type_abbrev,
			payment_type.revenue_affecting				AS revenue_affecting,
			1											AS total_contracts,
			IF(c.design_fee > 0,1,0)					AS design_contracts,
			IF(c.cancelled_at IS NOT NULL,1,0) 			AS cancelled_contracts,
			IF(payment_type.revenue_affecting = 1,1,0) 	AS revenue_contracts
		FROM
			(territory AS t,
			region AS r,
			(SELECT
				contract.*,
				COUNT(contract_duration.id) AS durations
			FROM
				contract,
				contract_duration
			WHERE
				contract.id = contract_duration.contract_id
			GROUP BY
				contract.id) AS c,
			client AS cl)
			LEFT JOIN employee AS e ON e.id = c.soldby_id
			LEFT JOIN payment_term ON payment_term.id = c.payment_term_id
			LEFT JOIN payment_type ON payment_type.id = payment_term.payment_type_id
		WHERE
			t.id = c.territory_id AND
			r.id = t.region_id AND
			c.client_id = cl.id AND
			YEAR(c.sale_date) = :sale_year AND
			MONTH(c.sale_date) = :sale_month AND
			c.deleted_at IS NULL
			$wsql
		ORDER BY
			c.contract_number", array(
				'sale_year' => date('Y',strtotime($duration['date_string'])), 
				'sale_month' => date('n',strtotime($duration['date_string']))
			));
		while ($r = $sth->fetch()){
			$r['leaf'] = true;
			$r['id'] = 'contract_'.$r['contract_id'];
			$r['paytype_'.strtolower($r['payment_type_abbrev'])] = 1;
			if ($r['durations'] <= 11){
				$r['duration_1'] = 1;
				$r['discount_1'] = $r['discount'];
				$r['revenue_contracts_1'] = $r['revenue_contracts'];
			} elseif ($r['durations'] <= 23){
				$r['duration_2'] = 1;
				$r['discount_2'] = $r['discount'];
				$r['revenue_contracts_2'] = $r['revenue_contracts'];
			} elseif ($r['durations'] <= 35){
				$r['duration_3'] = 1;
				$r['discount_3'] = $r['discount'];
				$r['revenue_contracts_3'] = $r['revenue_contracts'];
			} else {
				$r['duration_4'] = 1;
				$r['discount_4'] = $r['discount'];
				$r['revenue_contracts_4'] = $r['revenue_contracts'];
			}
			$result['contracts'][$r['contract_id']] = $r;
		}
		
		$this->summarize($result, $paytypes);
		if (!empty($node)){
			if ($node == 'root'){
				return $result['nodes']['root'];
			} elseif (isset($result['nodes'][$node]['children'])){
				return $result['nodes'][$node]['children'];
			}
			return array();
		}
		
		if ($output == 'xlsx'){
			ob_start();
	    	$xls = new XLS\PeriodSalesBySalesRep();
	    	$xls->generateSpreadsheet($duration, $result);
	    	
	    	$dir = $app['business.download']->getTempDir();
			
			$ownerid = null;
			$token = $app['security']->getToken();
			if (null !== $token) {
				$user = $token->getUser();
				$ownerid = $user->getId();
			} else {
				$app['monolog']->addInfo('unable to get security token');
			}
			
			$filename = $ownerid.'_SalesRepSalesReport_'.uniqid().'.xlsx';
			$writer = PHPExcel\IOFactory::createWriter($xls, 'Excel2007');
			$writer->save($_SERVER['DOCUMENT_ROOT'].'/'.$dir.'/'.$filename);
			ob_end_clean();
    		return array('file' => $filename, 'id' => $filename);
    	}
	}
	
	function summarize(&$result, &$paytypes){
		$dataset = array(
			'subtotal' 				=> 0,
			'monthly_payment' 		=> 0,
			'design_fee'			=> 0,
			'total_contracts'		=> 0,
			'cancelled_contracts' 	=> 0,
			'design_contracts'		=> 0,
			'revenue_contracts'		=> 0,
			'revenue_contracts_1'	=> 0,
			'revenue_contracts_2'	=> 0,
			'revenue_contracts_3'	=> 0,
			'revenue_contracts_4'	=> 0,
			'discount'				=> 0,
			'discount_1'			=> 0,
			'discount_2'			=> 0,
			'discount_3'			=> 0,
			'discount_4'			=> 0,
			'durations'				=> 0,
			'duration_1'			=> 0,
			'duration_2'			=> 0,
			'duration_3'			=> 0,
			'duration_4'			=> 0
		);
		foreach ($paytypes as $type){
			$dataset['paytype_'.strtolower($type['abbrev'])] = 0;
		}
		foreach ($result['contracts'] as $cid => $con){
			// company-wide
			if (!isset($result['nodes']['root'])){
				$result['nodes']['root'] = $dataset;
			}
			foreach ($dataset as $key => $val){
				if (isset($con[$key])){
					$result['nodes']['root'][$key] += $con[$key];
				}
			}
			$result['nodes']['root']['id'] = 'company';
			$result['nodes']['root']['text'] = 'Company-wide';
			
			// setup region parent
			if (!isset($result['nodes']['company'])){
				$result['nodes']['company'] = $dataset;
			}
			foreach ($dataset as $key => $val){
				if (isset($con[$key])){
					$result['nodes']['company'][$key] += $con[$key];
				}
			}
			
			// region
			if (!isset($result['nodes']['region_'.$con['region_id']])){
				$result['nodes']['company']['children']['region_'.$con['region_id']] = $result['nodes']['region_'.$con['region_id']] = array_merge($dataset, array('id' => 'region_'.$con['region_id'], 'text' => $con['region_title'], 'leaf' => false));
			}
			foreach ($dataset as $key => $val){
				if (isset($con[$key])){
					$result['nodes']['company']['children']['region_'.$con['region_id']][$key] = $result['nodes']['region_'.$con['region_id']][$key] += $con[$key];
				}
			}
			
			// territory
			if (!isset($result['nodes']['territory_'.$con['territory_id']])){
				$result['nodes']['region_'.$con['region_id']]['children']['territory_'.$con['territory_id']] = $result['nodes']['territory_'.$con['territory_id']] = array_merge($dataset, array('id' => 'territory_'.$con['territory_id'], 'text' => $con['territory_name'], 'leaf' => false));
			}
			foreach ($dataset as $key => $val){
				if (isset($con[$key])){
					$result['nodes']['region_'.$con['region_id']]['children']['territory_'.$con['territory_id']][$key] = $result['nodes']['territory_'.$con['territory_id']][$key] += $con[$key];
				}
			}
			$result['nodes']['territory_'.$con['territory_id']]['children'][] = $con;
		}
		unset($result['contracts']);
		foreach ($result['nodes'] as $key => $val){
			$result['nodes'][$key]['avg_discount'] = round($val['discount'] / $val['revenue_contracts'], 4);
			for ($i = 1; $i <= 4; $i++){
				if ($val['revenue_contracts_'.$i] > 0){
					$result['nodes'][$key]['avg_discount_'.$i] = round($val['discount_'.$i] / $val['revenue_contracts_'.$i], 4);
				} else {
					$result['nodes'][$key]['avg_discount_'.$i] = 0;
				}
			}
			$result['nodes'][$key]['avg_duration'] = round($val['durations'] / $val['total_contracts'], 2);
			if (isset($result['nodes'][$key]['children'])){
				$result['nodes'][$key]['children'] = array_values($val['children']);
				foreach ($result['nodes'][$key]['children'] as $k => $v){
					if ($v['revenue_contracts'] > 0){
						$result['nodes'][$key]['children'][$k]['avg_discount'] = round($v['discount'] / $v['revenue_contracts'], 4);
					} else {
						$result['nodes'][$key]['children'][$k]['avg_discount'] = 0;
					}
					$result['nodes'][$key]['children'][$k]['avg_duration'] = round($v['durations'] / $v['total_contracts'], 2);
					for ($i = 1; $i <= 4; $i++){
						if (isset($v['discount_'.$i]) && $v['discount_'.$i] > 0 && $v['revenue_contracts_'.$i] > 0){
							$result['nodes'][$key]['children'][$k]['avg_discount_'.$i] = round($v['discount_'.$i] / $v['revenue_contracts_'.$i], 4);
						} else {
							$result['nodes'][$key]['children'][$k]['avg_discount_'.$i] = 0;
						}
					}
				}
			}
		}
	}
}