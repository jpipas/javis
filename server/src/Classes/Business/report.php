<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;
use PHPExcel;

class Report extends AbstractBusinessService
{
    public function getTableName()
    {
        return '';
    }

	public function periodSalesByTerritory(&$app, $criteria)
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
		$wsql = '';
		if (@count($sql) > 0){
			$wsql = ' AND '.implode(' AND ', $sql);
		}
		
		// get report data
		$result = array();
		$sth = $this->db->executeQuery("SELECT
			t.id,
			t.name	AS territory_name,
			state.name AS state_name,
			state.abbr AS state_abbr,
			CONCAT(e.first_name, ' ',e.last_name) AS publisher_name,
			COUNT(DISTINCT(c.id)) 	AS total_contracts,
			0						AS active_contracts,
			0						AS inactive_contracts,
			0						AS design_contracts,
			SUM(c.subtotal) 		AS subtotal,
			SUM(c.monthly_payment) 	AS monthly_payment,
			SUM(c.design_fee) 		AS design_fee
		FROM
			(territory AS t,
			contract AS c,
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
			state.name, t.name", array('duration' => $criteria['duration_id']));
		while ($r = $sth->fetch()){
			$result[$r['id']] = $r;
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
			t.id,
			t.name	AS territory_name,
			CONCAT(e.first_name, ' ',e.last_name) AS salesrep_name,
			c.id	AS contract_id,
			cl.company_name,
			c.contract_number,
			c.subtotal,
			c.monthly_payment,
			c.design_fee
		FROM
			(territory AS t,
			contract AS c,
			client AS cl,
			contract_duration AS cd,
			duration AS d)
			LEFT JOIN employee AS e ON e.id = c.soldby_id
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
			$result[$r['id']]['contracts'][$r['contract_id']] = $r;
		}
			
		
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