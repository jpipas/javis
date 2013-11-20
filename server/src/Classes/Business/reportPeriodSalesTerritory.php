<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;
use PHPExcel;

class ReportPeriodSalesTerritory extends AbstractBusinessService
{
    public function getTableName()
    {
        return '';
    }

	public function periodSalesByTerritory(&$app, $criteria, $node = '', $output = '')
	{
		$error = array();
		if (!isset($criteria['duration_id'])){
			$error[] = 'Period is required';
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
		if (isset($criteria['territory_id'])){
			if (is_array($criteria['territory_id'])){
				if (@count($criteria['territory_id']) > 0){
					$sql[] = "t.id IN ('".implode("', '", $criteria['territory_id'])."')";
				}
			} elseif (!empty($criteria['territory_id'])) {
				$sql[] = "t.id = ".$this->db->quote($criteria['territory_id']);
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
		$sth = $this->db->executeQuery("SELECT
			t.id,
			t.name	AS territory_name,
			t.name	AS text,
			state.name AS state_name,
			state.abbr AS state_abbr,
			CONCAT(e.first_name, ' ',e.last_name) AS manager_name,
			COUNT(DISTINCT(c.id)) 				AS total_contracts,
			0									AS active_contracts,
			0									AS inactive_contracts,
			0									AS design_contracts,
			SUM(c.subtotal) 					AS subtotal,
			SUM(c.monthly_payment) 				AS monthly_payment,
			SUM(c.design_fee) 					AS design_fee,
			0									AS avg_discount,
			ROUND(AVG(c.durations),2)			AS avg_duration
		FROM
			(territory AS t,
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
			state,
			contract_duration AS cd,
			duration AS d)
			LEFT JOIN employee AS e ON e.id = t.manager_id
		WHERE
			t.id = c.territory_id AND
			t.state_id = state.id AND
			cd.contract_id = c.id AND
			d.id = cd.duration_id AND
			d.id = :duration AND
			c.deleted_at IS NULL AND
			(c.cancelled_at IS NULL OR c.cancelled_at > d.date_string)
			$wsql
		GROUP BY
			t.id
		ORDER BY
			t.name", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			$r['leaf'] = false;
			foreach ($paytypes as $type){
				$r['avg_'.strtolower($type['abbrev'])] = 0;
			}
			$result[$r['id']] = $r;
		}
		
		/* Get average discount, excluding non revenue generating payment types */
		$sth = $this->db->executeQuery("SELECT
			t.id,
			ROUND(AVG(c.discount),4)	AS avg_discount
		FROM
			(territory AS t,
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
			state,
			contract_duration AS cd,
			duration AS d,
			payment_term AS pterm,
			payment_type AS ptype)
			LEFT JOIN employee AS e ON e.id = t.manager_id
		WHERE
			t.id = c.territory_id AND
			t.state_id = state.id AND
			cd.contract_id = c.id AND
			d.id = cd.duration_id AND
			c.payment_term_id = pterm.id AND
			pterm.payment_type_id = ptype.id AND
			ptype.revenue_affecting = 1 AND /* exclude trade-outs */
			d.id = :duration AND
			c.deleted_at IS NULL AND
			(c.cancelled_at IS NULL OR c.cancelled_at > d.date_string)
			$wsql
		GROUP BY
			t.id
		ORDER BY
			t.name", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			if (isset($result[$r['id']])){
				$result[$r['id']]['avg_discount'] = $r['avg_discount'];
			}
		}

		/* INACTIVE CONTRACTS FOR THE SPECIFIED PERIOD */
		$sth = $this->db->executeQuery("SELECT
			COUNT(DISTINCT(c.id)) 	AS contracts,
			c.territory_id			AS id
		FROM
			(contract AS c,
			territory AS t)
			LEFT JOIN contract_duration AS cd ON cd.contract_id = c.id
			LEFT JOIN duration AS d ON d.id = cd.duration_id AND d.id = :duration
		WHERE
			c.territory_id = t.id AND
			c.deleted_at IS NULL AND
			(d.id IS NULL OR c.cancelled_at <= d.date_string)
			$wsql
		GROUP BY
			c.territory_id", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			if (isset($result[$r['id']])){
				$result[$r['id']]['inactive_contracts'] = $r['contracts'];
			}
		}
	
		/* ACTIVE CONTRACTS FOR THE SPECIFIED PERIOD */
		$sth = $this->db->executeQuery("SELECT
			COUNT(DISTINCT(c.id)) 	AS contracts,
			c.territory_id			AS id
		FROM
			(contract AS c,
			territory AS t)
			LEFT JOIN contract_duration AS cd ON cd.contract_id = c.id
			LEFT JOIN duration AS d ON d.id = cd.duration_id AND d.id = :duration
		WHERE
			c.territory_id = t.id AND
			c.deleted_at IS NULL AND
			d.id IS NOT NULL AND
			(c.cancelled_at IS NULL OR c.cancelled_at > d.date_string)
			$wsql
		GROUP BY
			c.territory_id", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			if (isset($result[$r['id']])){
				$result[$r['id']]['active_contracts'] = $r['contracts'];
			}
		}
	
		/* NUM DESIGN CONTRACTS */
		$sth = $this->db->executeQuery("SELECT
			COUNT(DISTINCT(c.id)) 	AS contracts,
			c.territory_id			AS id
		FROM
			(contract AS c,
			territory AS t)
			LEFT JOIN contract_duration AS cd ON cd.contract_id = c.id
			LEFT JOIN duration AS d ON d.id = cd.duration_id AND d.id = :duration
		WHERE
			c.territory_id = t.id AND
			c.deleted_at IS NULL AND
			d.id IS NOT NULL AND
			c.design_fee > 0 AND
			(c.cancelled_at IS NULL OR c.cancelled_at > d.date_string)
			$wsql
		GROUP BY
			c.territory_id", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			if (isset($result[$r['id']])){
				$result[$r['id']]['design_contracts'] = $r['contracts'];
			}
		}
		
		/* SPECIFIC CONTRACTS FOR FOUND TERRITORIES */
		$sth = $this->db->executeQuery("SELECT
			t.id	AS territory_id,
			t.name	AS territory_name,
			CONCAT(e.first_name, ' ',e.last_name) AS manager_name,
			c.id	AS contract_id,
			cl.company_name,
			c.contract_number	AS text,
			c.contract_number,
			c.subtotal,
			c.monthly_payment,
			c.design_fee,
			c.discount 						AS avg_discount,
			c.durations						AS avg_duration,
			payment_type.description		AS payment_type_description,
			payment_type.abbrev				AS payment_type_abbrev,
			payment_type.revenue_affecting	AS revenue_affecting
		FROM
			(territory AS t,
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
			client AS cl,
			contract_duration AS cd,
			duration AS d)
			LEFT JOIN employee AS e ON e.id = c.soldby_id
			LEFT JOIN payment_term ON payment_term.id = c.payment_term_id
			LEFT JOIN payment_type ON payment_type.id = payment_term.payment_type_id
		WHERE
			t.id = c.territory_id AND
			c.client_id = cl.id AND
			cd.contract_id = c.id AND
			d.id = cd.duration_id AND
			d.id = :duration AND
			c.deleted_at IS NULL AND
			(c.cancelled_at IS NULL OR c.cancelled_at > d.date_string) AND
			t.id IN ('".implode("', '", array_keys($result))."')
		ORDER BY
			c.contract_number", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			$r['leaf'] = true;
			$r['id'] = $r['territory_id'].'_'.$r['contract_id'];
			$r['avg_'.strtolower($r['payment_type_abbrev'])] = 1;
			$result[$r['territory_id']]['contracts'][$r['contract_id']] = $r;
		}
		
		foreach ($result as $tid => $territory){
			foreach ($territory['contracts'] as $cid => $contract){
				if (isset($contract['payment_type_abbrev'])){
					$result[$tid]['avg_'.strtolower($contract['payment_type_abbrev'])] += 1;
				}
			}
		}
		
		if ($node == 'root'){
			return array_values($result);
		} elseif (!empty($node)){
			if (isset($result[$node]) && isset($result[$node]['contracts'])){
				return array_values($result[$node]['contracts']);
			}
			return array();
		}
		
		if ($output == 'xlsx'){
			ob_start();
	    	$xls = new XLS\PeriodSalesByTerritory();
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
			
			$filename = $ownerid.'_TerritorySalesReport_'.uniqid().'.xlsx';
			$writer = PHPExcel\IOFactory::createWriter($xls, 'Excel2007');
			$writer->save($_SERVER['DOCUMENT_ROOT'].'/'.$dir.'/'.$filename);
			ob_end_clean();
    		return array('file' => $filename, 'id' => $filename);
    	}
	}
}