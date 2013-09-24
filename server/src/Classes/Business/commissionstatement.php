<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class CommissionStatement extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'commission_statement';
    }

    public function getAll(&$app, $page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array()) 
    {
    	// limit our search results
		$lsql = '';
		// don't limit our return for this data set
		/*
		if (is_numeric($start) && is_numeric($limit)){
    			$lsql = " LIMIT $start, $limit";
		}
		*/
		
		// sort our results
		if (is_array($sort)){
			$order = array();
			array_walk($sort, function($sort, $key) use (&$order){
				switch ($sort['property']){
					case 'fullname':
						$order[] = 'e.last_name '.$sort['direction'];
						$order[] = 'e.first_name '.$sort['direction'];
						break;
				
					default:
						$order[] = $sort['property'].' '.$sort['direction'];
						break;
				}
			});
			$osql = implode(', ', $order);
		} else {
			$order = array();
			$order[] = 'e.last_name ASC';
			$order[] = 'e.first_name ASC';
			$osql = implode(', ', $order);
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			$where[] = "commission_cycle.title LIKE '".addslashes($query)."%'";
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					switch($f['property']){
						default:
							$where[$f['property']] = $f['property']." = ".$qq;
							break;
					}
        		}
			}
		} 
		
		// search criteria was passed in
		if (isset($search['query']) && !empty($search['query'])){
			if (@count($search['fields']) >= 1){
				$or = array();
				$qq = $this->db->quote($search['query'].'%');
				$qqq = $this->db->quote('%'.$search['query'].'%');
				$q = $search['query'];
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq, &$q, &$qqq){
					switch ($field){
						case 'fullname':
							$parts = explode(" ", $q);
			    			if (@count($parts) == 2){
			    				$or[] = "e.first_name LIKE '".addslashes($parts[0])."%' AND e.last_name LIKE '".addslashes($parts[1])."%'";
			    			} else {
			    				$or[] = "(e.first_name LIKE '".addslashes($q)."%' OR e.last_name LIKE '".addslashes($q)."%')";
			    			}
							break;
						
						case 'date_string':
							$or[] = 'd.date_string LIKE '.$qq;
							break;
						
						case 'territories':
							$or[] = 'cep.territories LIKE '.$qqq;
							break;
						
						case 'amount_publisher':
							$or[] = 'cep.amount_publisher LIKE '.$qq;
							break;
						
						case 'baselines':
							$or[] = 'cb.baselines LIKE '.$qq;
							break;
						
						case 'amount_salesrep':
							$or[] = 'ces.amount_salesrep LIKE '.$qq;
							break;
						
						default:
							$or[] = 'cs.'.$field.' LIKE '.$qq;
							break;
					}
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "commission_cycle.title LIKE '".addslashes($search['query'])."%'";
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	cs.*,
        	CONCAT(e.first_name, ' ', e.last_name) AS fullname,
        	cep.amount_publisher,
        	(IF(ces.amount_salesrep IS NULL,0,ces.amount_salesrep) + IF(cepae.amount_sellinto IS NULL,0,cepae.amount_sellinto)) AS amount_salesrep,
        	cb.baselines,
        	d.date_string,
        	cept.territories
        FROM
        	(commission_statements AS cs,
        	commission_period AS cp,
        	duration AS d,
        	employee AS e)
        	/* publishers territories */
        	LEFT JOIN (SELECT
        			commission_entry.publisher_statement_id,
        			GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories
        		FROM
        			(commission_entry)
        			LEFT JOIN territory AS t on t.id = commission_entry.territory_id
        		WHERE
        			commission_entry.deleted_at IS NULL
        		GROUP BY
        			commission_entry.publisher_statement_id) AS cept ON cept.publisher_statement_id = cs.id
        		
        	/* baselines */
        	LEFT JOIN (SELECT
        			ce.publisher_statement_id,
        			SUM(cb.baseline) AS baselines
        		FROM
        			((SELECT
        				DISTINCT(territory_id) AS territory_id,
        				publisher_statement_id
        			FROM
        				commission_entry AS ce
        			WHERE
        				 ce.deleted_at IS NULL
        			GROUP BY
        				publisher_statement_id,
        				territory_id) AS ce,
        			commission_statements AS cs)
        			LEFT JOIN commission_baselines AS cb ON cb.period_id = cs.period_id AND cb.territory_id = ce.territory_id AND cb.deleted_at IS NULL
        		WHERE
        			cs.deleted_at IS NULL AND
        			cs.id = ce.publisher_statement_id
        		GROUP BY
        			ce.publisher_statement_id) AS cb ON cb.publisher_statement_id = cs.id
        	
        	/* my publisher sales */
        	LEFT JOIN (SELECT
        			SUM(commission_entry.amount * commission_entry.publisher_comm) AS amount_publisher,
        			commission_entry.publisher_statement_id,
        			GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories
        		FROM
        			(commission_entry)
        			LEFT JOIN territory AS t on t.id = commission_entry.territory_id
        		WHERE
        			commission_entry.deleted_at IS NULL AND
        			commission_entry.salesrep_id IS NULL
        		GROUP BY
        			commission_entry.publisher_statement_id) AS cep ON cep.publisher_statement_id = cs.id
        			
        	/* cross-sells into publisher territory */
        	LEFT JOIN (SELECT
        			SUM(commission_entry.amount * commission_entry.publisher_comm) AS amount_sellinto,
        			commission_entry.publisher_statement_id,
        			GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories
        		FROM
        			(commission_entry)
        			LEFT JOIN territory AS t on t.id = commission_entry.territory_id
        		WHERE
        			commission_entry.deleted_at IS NULL AND
        			commission_entry.salesrep_id IS NOT NULL
        		GROUP BY
        			commission_entry.publisher_statement_id) AS cepae ON cepae.publisher_statement_id = cs.id
        			
        	/* my cross-sells into other territories */
        	LEFT JOIN (SELECT
        			SUM(commission_entry.amount * commission_entry.salesrep_comm) AS amount_salesrep,
        			commission_entry.salesrep_statement_id
        		FROM
        			(commission_entry)
        		WHERE
        			commission_entry.deleted_at IS NULL
        		GROUP BY
        			commission_entry.salesrep_statement_id) AS ces ON ces.salesrep_statement_id = cs.id
        WHERE
        	cs.employee_id = e.id AND
        	cp.id = cs.period_id AND
        	cp.duration_id = d.id AND
        	cs.deleted_at IS NULL
        	$wsql
        GROUP BY
        	cs.id
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }
    
    public function getById($id, $entries = false)
    {
    	$sql = "SELECT
    		cs.*,
        	CONCAT(e.first_name, ' ', e.last_name) AS fullname,
        	cep.amount_publisher,
        	(IF(ces.amount_salesrep IS NULL,0,ces.amount_salesrep) + IF(cepae.amount_sellinto IS NULL,0,cepae.amount_sellinto)) AS amount_salesrep,
        	d.date_string,
        	cept.territories
        FROM
        	(commission_statements AS cs,
        	commission_period AS cp,
        	duration AS d,
        	employee AS e)
        	
        	/* publisher's territories */
        	LEFT JOIN (SELECT
        			commission_entry.publisher_statement_id,
        			GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories
        		FROM
        			(commission_entry)
        			LEFT JOIN territory AS t on t.id = commission_entry.territory_id
        		WHERE
        			commission_entry.deleted_at IS NULL
        		GROUP BY
        			commission_entry.publisher_statement_id) AS cept ON cept.publisher_statement_id = cs.id
        	
        	/* my publisher sales */
        	LEFT JOIN (SELECT
        			SUM(commission_entry.amount * commission_entry.publisher_comm) AS amount_publisher,
        			commission_entry.publisher_statement_id,
        			GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories
        		FROM
        			(commission_entry)
        			LEFT JOIN territory AS t on t.id = commission_entry.territory_id
        		WHERE
        			commission_entry.deleted_at IS NULL AND
        			commission_entry.salesrep_id IS NULL
        		GROUP BY
        			commission_entry.publisher_statement_id) AS cep ON cep.publisher_statement_id = cs.id
        			
        	/* cross-sells into publisher territory */
        	LEFT JOIN (SELECT
        			SUM(commission_entry.amount * commission_entry.publisher_comm) AS amount_sellinto,
        			commission_entry.publisher_statement_id,
        			GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS territories
        		FROM
        			(commission_entry)
        			LEFT JOIN territory AS t on t.id = commission_entry.territory_id
        		WHERE
        			commission_entry.deleted_at IS NULL AND
        			commission_entry.salesrep_id IS NOT NULL
        		GROUP BY
        			commission_entry.publisher_statement_id) AS cepae ON cepae.publisher_statement_id = cs.id
        			
        	/* my cross-sells into other territories */
        	LEFT JOIN (SELECT
        			SUM(commission_entry.amount * commission_entry.salesrep_comm) AS amount_salesrep,
        			commission_entry.salesrep_statement_id
        		FROM
        			(commission_entry)
        		WHERE
        			commission_entry.deleted_at IS NULL
        		GROUP BY
        			commission_entry.salesrep_statement_id) AS ces ON ces.salesrep_statement_id = cs.id
        WHERE
        	cs.employee_id = e.id AND
        	cp.id = cs.period_id AND
        	cp.duration_id = d.id AND
        	cs.deleted_at IS NULL AND
        	cs.id = ?";
        $ret = $this->db->fetchAssoc($sql,array((int) $id));
        
        if ($entries){
        	// get publisher entries first
        	$sth = $this->db->executeQuery("SELECT
        		ce.*,
        		cl.company_name							AS client_company_name,
        		c.contract_number,
        		IF(p.id,pt.description,cpt.description)	AS paytype_description,
        		IF(p.id,pt.abbrev,cpt.abbrev)			AS paytype_abbrev,
        		t.name									AS territory_name,
        		p.postdate,
        		d.date_string,
        		ce.publisher_comm 						AS comm_percent,
        		ce.publisher_comm * ce.amount 			AS cpo_amount,
        		pc.abbrev								AS paycat_abbrev	
        	FROM
        		(commission_entry AS ce,
        		territory AS t,
        		payment_term AS pterm,
        		payment_type AS cpt,
        		duration AS d,
        		contract AS c,
        		client AS cl,
        		payment_category AS pc)
        		LEFT JOIN payment AS p ON p.id = ce.payment_id
        		LEFT JOIN payment_type AS pt ON p.payment_type_id = pt.id
        	WHERE
        		ce.territory_id = t.id AND
        		ce.duration_id = d.id AND
        		ce.contract_id = c.id AND
        		c.payment_term_id = pterm.id AND
        		pterm.payment_type_id = cpt.id AND
        		c.client_id = cl.id AND
        		ce.paycat_id = pc.id AND
        		ce.salesrep_id IS NULL AND
        		ce.publisher_statement_id = :statement AND
        		ce.deleted_at IS NULL
        	ORDER BY
        		CAST(REPLACE(c.contract_number,'-','.') AS DECIMAL(10,2))", array('statement' => $ret['id']));
        	while ($r = $sth->fetch(\PDO::FETCH_ASSOC)){
        		$ret['entries']['publisher'][$r['date_string']][$r['territory_id']]['entries'][$r['id']] = $r;
        		$ret['entries']['publisher'][$r['date_string']][$r['territory_id']]['territory_name'] = $r['territory_name'];
        	}
        	
        	// get cross-sells into publisher's territory
        	$sth = $this->db->executeQuery("SELECT
        		ce.*,
        		cl.company_name							AS client_company_name,
        		c.contract_number,
        		IF(p.id,pt.description,cpt.description)	AS paytype_description,
        		IF(p.id,pt.abbrev,cpt.abbrev)			AS paytype_abbrev,
        		t.name									AS territory_name,
        		CONCAT(e.first_name, ' ', e.last_name) 	AS salesrep_name,
        		d.date_string,
        		p.postdate,
        		ce.publisher_comm 						AS comm_percent,
        		ce.publisher_comm * ce.amount 			AS cpo_amount,
        		pc.abbrev								AS paycat_abbrev	
        	FROM
        		(commission_entry AS ce,
        		territory AS t,
        		payment_term AS pterm,
        		payment_type AS cpt,
        		duration AS d,
        		employee AS e,
        		contract AS c,
        		client AS cl,
        		payment_category AS pc)
        		LEFT JOIN payment AS p ON p.id = ce.payment_id
        		LEFT JOIN payment_type AS pt ON p.payment_type_id = pt.id
        	WHERE
        		ce.territory_id = t.id AND
        		e.id = ce.salesrep_id AND
        		ce.duration_id = d.id AND
        		ce.contract_id = c.id AND
        		c.payment_term_id = pterm.id AND
        		pterm.payment_type_id = cpt.id AND
        		c.client_id = cl.id AND
        		ce.paycat_id = pc.id AND
        		ce.salesrep_id IS NOT NULL AND
        		ce.publisher_statement_id = :statement AND
        		ce.deleted_at IS NULL
        	ORDER BY
        		CAST(REPLACE(c.contract_number,'-','.') AS DECIMAL(10,2))", array('statement' => $ret['id']));
        	while ($r = $sth->fetch(\PDO::FETCH_ASSOC)){
        		$ret['entries']['salesrep'][$r['date_string']][$r['id']] = $r;
        	}
        	
        	// get AE entries
        	$sth = $this->db->executeQuery("SELECT
        		ce.*,
        		cl.company_name							AS client_company_name,
        		c.contract_number,
        		IF(p.id,pt.description,cpt.description)	AS paytype_description,
        		IF(p.id,pt.abbrev,cpt.abbrev)			AS paytype_abbrev,
        		t.name									AS territory_name,
        		CONCAT(e.first_name, ' ', e.last_name) 	AS salesrep_name,
        		d.date_string,
        		p.postdate,
        		ce.salesrep_comm	 					AS comm_percent,
        		ce.salesrep_comm * ce.amount 			AS cpo_amount,
        		pc.abbrev								AS paycat_abbrev
        	FROM
        		(commission_entry AS ce,
        		territory AS t,
        		payment_term AS pterm,
        		payment_type AS cpt,
        		duration AS d,
        		employee AS e,
        		contract AS c,
        		client AS cl,
        		payment_category AS pc)
        		LEFT JOIN payment AS p ON p.id = ce.payment_id
        		LEFT JOIN payment_type AS pt ON p.payment_type_id = pt.id
        	WHERE
        		ce.territory_id = t.id AND
        		ce.duration_id = d.id AND
        		ce.contract_id = c.id AND
        		c.payment_term_id = pterm.id AND
        		pterm.payment_type_id = cpt.id AND
        		ce.publisher_id = e.id AND
        		c.client_id = cl.id AND
        		ce.paycat_id = pc.id AND
        		ce.salesrep_statement_id = :statement AND
        		ce.deleted_at IS NULL
        	ORDER BY
        		CAST(REPLACE(c.contract_number,'-','.') AS DECIMAL(10,2))", array('statement' => $ret['id']));
        	while ($r = $sth->fetch(\PDO::FETCH_ASSOC)){
        		$ret['entries']['salesrep'][$r['date_string']][$r['id']] = $r;
        	}
        	
        	// then get baselines for all of the territories that this publisher is in
        	if (isset($ret['entries']['publisher'])){
        		$sth = $this->db->executeQuery("SELECT
        			ce.publisher_statement_id,
        			ce.territory_id,
        			SUM(cb.baseline) AS baselines
        		FROM
        			((SELECT
        				DISTINCT(territory_id) AS territory_id,
        				publisher_statement_id
        			FROM
        				commission_entry AS ce
        			WHERE
        				 ce.deleted_at IS NULL AND
        				 ce.publisher_statement_id = :statement
        			GROUP BY
        				publisher_statement_id,
        				territory_id) AS ce,
        			commission_statements AS cs,
        			commission_baselines AS cb)
        		WHERE
        			cs.deleted_at IS NULL AND
        			cs.id = ce.publisher_statement_id AND
        			cb.period_id = cs.period_id AND
        			cb.territory_id = ce.territory_id AND
        			cb.deleted_at IS NULL
        		GROUP BY
        			ce.territory_id", array('statement' => $ret['id']));
        		while ($r = $sth->fetch(\PDO::FETCH_ASSOC)){
        			$ret['baselines'][$r['territory_id']] = $r['baselines'];
        		}
        	}
        }
        return $ret;
    }
    
    public function pdf(&$app, $id)
    {
    	set_time_limit(120);
    	$pdf = new PDF\CommissionStatement();
		
		if (is_array($id)){
			foreach ($id as $i){
				$comm = $this->getById($i, true);
				$pdf->startPageGroup();
				$pdf->buildStatement($comm);
			}
		} else {
			$comm = $this->getById($id, true);
			$pdf->buildStatement($comm);
		}

		// Close and output PDF document
		$dir = $app['business.download']->getTempDir();
		
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		
		$filename = $ownerid.'_CommissionStatement_'.uniqid().'.pdf';
		$pdf->Output($_SERVER['DOCUMENT_ROOT'].'/'.$dir.'/'.$filename, 'F');
		return array('pdf' => $filename);
    }
    
    /*
    	lock($app, $period)
    	Locks a commission period so no further editing can be completed on that period
    */
    public function lock(&$app, $comm_period)
    {
    	// set the creator, updator, owner
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		$params['update_user_id'] = $ownerid;
		
		$now = new \DateTime('NOW');
        $params['locked_at'] = $now->format('Y-m-d H:i:s');
     
     	$period = $app['business.commissionperiod']->getById($comm_period);
     	if (!isset($period['id'])){
     		return array('error' => array('Invalid commission period specified'));
     	} elseif ($period['locked_at']){
     		return array('error' => array('Commission period already locked'));
     	}
     	$params['comm_period'] = $period['id'];
     
     	$this->db->beginTransaction();
     	try {
     		// mark period locked
     		$period_rows = $this->db->executeUpdate("UPDATE commission_period SET
     			update_user_id = :update_user_id,
     			locked_at = :locked_at
     		WHERE
     			id = :comm_period", $params);
     			
     		// mark statements locked
     		$comm_rows = $this->db->executeUpdate("UPDATE commission_statements SET
     			update_user_id = :update_user_id,
     			locked_at = :locked_at
     		WHERE
     			period_id = :comm_period", $params);
     		$this->db->commit();
        	return array('statements' => ($comm_rows + $period_rows));
     	} catch (Exception $e){
     		$this->db->rollback();
     		return array('error' => array('An unexpected error occurred'));	
     	}
    }
    
    /*
    	reset($app, $period)
    	marks commission statements and entries deleted to be able to re-run commissions
    */
    public function reset(&$app, $comm_period)
    {
    	// set the creator, updator, owner
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		$params['update_user_id'] = $ownerid;
		
		$now = new \DateTime('NOW');
        $params['deleted_at'] = $now->format('Y-m-d H:i:s');
     
     	$period = $app['business.commissionperiod']->getById($comm_period);
     	if (!isset($period['id'])){
     		return array('error' => array('Invalid commission period specified'));
     	} elseif ($period['locked_at']){
     		return array('error' => array('Cannot reset a locked commission period'));
     	}
     	$params['comm_period'] = $period['id'];
     
     	$this->db->beginTransaction();
     	try {
     		// mark statements deleted/reset
     		$comm_rows = $this->db->executeUpdate("UPDATE commission_statements SET
     			update_user_id = :update_user_id,
     			deleted_at = :deleted_at
     		WHERE
     			period_id = :comm_period", $params);
     		
     		// mark entries deleted/reset
     		$entry_rows = $this->db->executeUpdate("UPDATE commission_entry AS ce, commission_statements AS cs SET
     			ce.update_user_id = :update_user_id,
     			ce.deleted_at = :deleted_at
     		WHERE
     			(ce.publisher_statement_id = cs.id OR
     			ce.salesrep_statement_id = cs.id) AND
     			cs.period_id = :comm_period AND
     			ce.manually_adjusted IS NULL", $params);
     		$this->db->commit();
        	return array('statements' => ($comm_rows + $entry_rows));
     	} catch (Exception $e){
     		$this->db->rollback();
     		return array('error' => array('An unexpected error occurred'));	
     	}
    }
    
    /*
    	resetuser($app, $period)
    	marks commission statements and entries deleted to be able to re-run commissions - for a single user
    */
    public function resetuser(&$app, $statement_id)
    {
    	// set the creator, updator, owner
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		$params['update_user_id'] = $ownerid;
		
		$now = new \DateTime('NOW');
        $params['deleted_at'] = $now->format('Y-m-d H:i:s');
     
     	$statement = $this->getById($statement_id);
     	if (!isset($statement['id'])){
     		return array('error' => array('Invalid commission statement specified'));
     	} elseif ($statement['locked_at']){
     		return array('error' => array('Cannot reset a locked commission statement'));
     	}
     	$params['statement_id'] = $statement['id'];
     
     	$this->db->beginTransaction();
     	try {
     		// mark statements deleted/reset
     		$comm_rows = $this->db->executeUpdate("UPDATE commission_statements SET
     			update_user_id = :update_user_id,
     			deleted_at = :deleted_at
     		WHERE
     			id = :statement_id", $params);
     		
     		// mark entries deleted/reset
     		$entry_rows = $this->db->executeUpdate("UPDATE commission_entry AS ce SET
     			ce.update_user_id = :update_user_id,
     			ce.deleted_at = :deleted_at
     		WHERE
     			(ce.publisher_statement_id = :statement_id OR
     			ce.salesrep_statement_id = :statement_id) AND
     			ce.manually_adjusted IS NULL", $params);
     		$this->db->commit();
        	return array('statements' => ($comm_rows + $entry_rows));
     	} catch (Exception $e){
     		$this->db->rollback();
     		return array('error' => array('An unexpected error occurred'));	
     	}
    }
    
    /*
    	run($app, $period)
    	run commissions picking up any payments that apply to the corresponding commission period
    */
    public function run(&$app, $comm_period)
    {
    	set_time_limit(120);
    	// set the creator, updator, owner
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		$params['insert_user_id'] = $params['update_user_id'] = $ownerid;
		
		$now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        
        $period = $app['business.commissionperiod']->getById($comm_period);
     	if (!isset($period['id'])){
     		return array('error' => array('Invalid commission period specified'));
     	} elseif ($period['locked_at']){
     		return array('error' => array('Commission period locked'));
     	}
        
        $this->db->beginTransaction();
        try {
        	// create the commission statements first for the proper sales reps
        	// get sales reps first
        	$salesreps_statements = $this->db->executeUpdate("INSERT INTO commission_statements (
        		employee_id,
        		period_id,
        		profitshare,
        		insert_user_id,
        		created_at
        	) SELECT
        		c.soldby_id,
        		cp.id,
        		IF(e.profitshare > 0,e.profitshare,.8),
        		:insert_user_id,
        		:created_at
			FROM
				(payment AS p,
				payment_duration AS pd,
				payment_type AS pt,
				duration AS d,
				client AS cl,
				territory AS t,
				employee AS e,
				commission_period AS cp,
				duration AS cpd,
				(SELECT 
						MIN(duration.date_string) AS date_string, 
						contract.*
					FROM 
						contract, 
						contract_duration, 
						duration 
					WHERE
						contract.id = contract_duration.contract_id AND
						contract_duration.duration_id = duration.id
					GROUP BY
						contract.id) AS c)
				LEFT JOIN commission_statements AS cs ON cs.employee_id = c.soldby_id AND cs.period_id = cp.id AND cs.deleted_at IS NULL
			WHERE
				p.id = pd.payment_id AND
				d.id = pd.duration_id AND
				cp.duration_id = cpd.id AND
				cp.cycle_id = t.cycle_id AND /* only this cycle's territories */
				p.payment_type_id = pt.id AND
				p.contract_id = c.id AND
				c.territory_id = t.id AND
				cl.id = p.client_id AND
				e.id = c.soldby_id AND
				p.deleted_at IS NULL AND
				c.deleted_at IS NULL AND
				t.deleted_at IS NULL AND
				p.postdate <= cp.cutoff_date AND
				(
					d.date_string = cpd.date_string OR /* this period's payments */
					d.date_string < cpd.date_string /* past due payments */
				) AND
				cs.id IS NULL AND
				cp.id = :comm_period
			GROUP BY
				c.soldby_id
			ORDER BY
				d.date_string", array('insert_user_id' => $params['insert_user_id'], 'created_at' => $params['created_at'], 'comm_period' => $comm_period));
			
			// create publisher's statements
        	$publishers_statements = $this->db->executeUpdate("INSERT INTO commission_statements (
        		employee_id,
        		period_id,
        		profitshare,
        		insert_user_id,
        		created_at
        	) SELECT
        		t.manager_id,
        		cp.id,
        		IF(e.profitshare > 0,e.profitshare,.8),
        		:insert_user_id,
        		:created_at
			FROM
				(payment AS p,
				payment_duration AS pd,
				payment_type AS pt,
				duration AS d,
				client AS cl,
				territory AS t,
				employee AS e,
				commission_period AS cp,
				duration AS cpd,
				(SELECT 
						MIN(duration.date_string) AS date_string, 
						contract.*
					FROM 
						contract, 
						contract_duration, 
						duration 
					WHERE
						contract.id = contract_duration.contract_id AND
						contract_duration.duration_id = duration.id
					GROUP BY
						contract.id) AS c)
				LEFT JOIN commission_statements AS cs ON cs.employee_id = t.manager_id AND cs.period_id = cp.id AND cs.deleted_at IS NULL
			WHERE
				p.id = pd.payment_id AND
				d.id = pd.duration_id AND
				cp.duration_id = cpd.id AND
				cp.cycle_id = t.cycle_id AND /* only this cycle's territories */
				p.payment_type_id = pt.id AND
				p.contract_id = c.id AND
				c.territory_id = t.id AND
				cl.id = p.client_id AND
				e.id = c.soldby_id AND
				p.deleted_at IS NULL AND
				c.deleted_at IS NULL AND
				t.deleted_at IS NULL AND
				p.postdate <= cp.cutoff_date AND
				(
					d.date_string = cpd.date_string OR /* this period's payments */
					d.date_string < cpd.date_string /* past due payments */
				) AND
				cs.id IS NULL AND
				cp.id = :comm_period
			GROUP BY
				t.manager_id
			ORDER BY
				d.date_string", array('insert_user_id' => $params['insert_user_id'], 'created_at' => $params['created_at'], 'comm_period' => $comm_period));
        		
        	// then create the commission entries
        	$commission_entries = $this->db->executeUpdate("INSERT INTO commission_entry (
				territory_id,
				publisher_statement_id,
				salesrep_statement_id,
				contract_id,
				payment_id,
				duration_id,
				amount,
				publisher_id,
				salesrep_id,
				bonus,
				publisher_comm,
				salesrep_comm,
				paycat_id,
        		insert_user_id,
        		created_at
			)
			SELECT
				c.territory_id,
				cspub.id	AS publisher_statement,
				IF(t.manager_id != c.soldby_id,cssalesrep.id,NULL) AS salesrep_statement,
				c.id,
				p.id,
				d.id,
				p.payment_amount,
				t.manager_id,
				IF(t.manager_id != c.soldby_id,c.soldby_id,NULL) AS salesrep_id,
				
				/* bonus = first period for AE with paytype = CC or ACH for 12 or more months */
				IF(t.manager_id != c.soldby_id AND c.date_string = d.date_string AND pt.bonuseligible = 1 AND c.num_months >= 12,1,0) AS bonus,
				
				/* if publisher sale, then 1.0, if bonus, 0, else .3 */
				IF(t.manager_id = c.soldby_id,1.0,
					IF(t.manager_id != c.soldby_id AND c.date_string = d.date_string AND pt.bonuseligible = 1 AND c.num_months >= 12,0,
					0.3)) AS publisher_comm,
				
				IF(t.manager_id = c.soldby_id,NULL,
						IF(c.date_string = d.date_string AND pt.bonuseligible = 1 AND c.num_months >= 12 AND t.manager_id != c.soldby_id,0.7,
							IF(e.salesrep_comm > 0,e.salesrep_comm,0.3)
						)
					) AS salesrep_comm,
					
				IF (p.postdate > d.date_string,
						2,  /* paid on overdue */
						IF (p.postdate >= DATE_SUB(d.date_string, INTERVAL 2 MONTH),
						1, /* paid on time */
						3) /* paid in advance */
					) AS paycat_id,
        		:insert_user_id,
        		:created_at
			FROM
				(payment AS p,
				payment_duration AS pd,
				payment_type AS pt,
				duration AS d,
				client AS cl,
				territory AS t,
				employee AS e,
				commission_period AS cp,
				duration AS cpd,
				commission_statements AS cspub,
				commission_statements AS cssalesrep,
				(SELECT 
						MIN(duration.date_string) AS date_string,
						COUNT(contract_duration.id) AS num_months,
						contract.*
					FROM 
						contract, 
						contract_duration, 
						duration 
					WHERE
						contract.id = contract_duration.contract_id AND
						contract_duration.duration_id = duration.id
					GROUP BY
						contract.id) AS c)
				LEFT JOIN commission_entry AS ce ON ce.payment_id = p.id AND ce.duration_id = pd.duration_id AND ce.deleted_at IS NULL
			WHERE
				p.id = pd.payment_id AND
				d.id = pd.duration_id AND
				cp.duration_id = cpd.id AND
				cp.cycle_id = t.cycle_id AND /* only this cycle's territories */
				
				/* publisher's statement */
				cspub.deleted_at IS NULL AND
				cspub.period_id = cp.id AND
				cspub.employee_id = t.manager_id AND
				
				/* sales rep's statement */
				cssalesrep.deleted_at IS NULL AND
				cssalesrep.period_id = cp.id AND
				cssalesrep.employee_id = c.soldby_id AND
				
				p.payment_type_id = pt.id AND
				p.contract_id = c.id AND
				c.territory_id = t.id AND
				cl.id = p.client_id AND
				e.id = c.soldby_id AND
				p.deleted_at IS NULL AND
				c.deleted_at IS NULL AND
				t.deleted_at IS NULL AND
				p.postdate <= cp.cutoff_date AND
				(
					d.date_string = cpd.date_string OR /* this period's payments */
					d.date_string < cpd.date_string /* past due payments */
				) AND
				ce.id IS NULL AND
				cp.id = :comm_period
			ORDER BY
				d.date_string", array('insert_user_id' => $params['insert_user_id'], 'created_at' => $params['created_at'], 'comm_period' => $comm_period));
        
        	// create uncollected entries
        	$unc_entries = $this->db->executeUpdate("INSERT INTO commission_entry (
				territory_id,
				publisher_statement_id,
				salesrep_statement_id,
				contract_id,
				duration_id,
				amount,
				publisher_id,
				salesrep_id,
				bonus,
				publisher_comm,
				salesrep_comm,
				paycat_id,
        		insert_user_id,
        		created_at
			)
			SELECT
				c.territory_id,
				cspub.id	AS publisher_statement,
				IF(t.manager_id != c.soldby_id,cssalesrep.id,NULL) AS salesrep_statement,
				c.id,
				d.id,
				c.monthly_payment,
				t.manager_id,
				IF(t.manager_id != c.soldby_id,c.soldby_id,NULL) AS salesrep_id,
				
				0 AS bonus,
				
				/* uncollected = 0 commission */
				0 AS publisher_comm,
				
				IF(t.manager_id = c.soldby_id,NULL,0) AS salesrep_comm,
				
				/* uncollected */
				5 AS paycat_id,
				
        		:insert_user_id,
        		:created_at
			FROM
				(contract AS c,
				contract_duration AS cd,
				payment_term AS pterm,
				payment_type AS pt,
				duration AS d,
				client AS cl,
				territory AS t,
				employee AS e,
				commission_period AS cp,
				duration AS cpd,
				commission_statements AS cspub,
				commission_statements AS cssalesrep)
				LEFT JOIN commission_entry AS ce ON ce.contract_id = c.id AND ce.duration_id = cd.duration_id AND ce.deleted_at IS NULL
			WHERE
				c.id = cd.contract_id AND
				d.id = cd.duration_id AND
				pterm.id = c.payment_term_id AND
				pterm.payment_type_id = pt.id AND
				
				cp.duration_id = cpd.id AND
				cp.cycle_id = t.cycle_id AND /* only this cycle's territories */
				
				/* publisher's statement */
				cspub.deleted_at IS NULL AND
				cspub.period_id = cp.id AND
				cspub.employee_id = t.manager_id AND
				
				/* sales rep's statement */
				cssalesrep.deleted_at IS NULL AND
				cssalesrep.period_id = cp.id AND
				cssalesrep.employee_id = c.soldby_id AND
				
				c.territory_id = t.id AND
				cl.id = c.client_id AND
				e.id = c.soldby_id AND
				c.deleted_at IS NULL AND
				t.deleted_at IS NULL AND
				d.date_string = cpd.date_string AND /* this periods uncollected payments */
				ce.id IS NULL AND
				cp.id = :comm_period
			ORDER BY
				d.date_string", array('insert_user_id' => $params['insert_user_id'], 'created_at' => $params['created_at'], 'comm_period' => $comm_period));
			
			// mark previously uncollected as now collected ("deleted") for this period
			$unc_delete = $this->db->executeUpdate("UPDATE
				commission_statements AS cs,
				commission_entry AS ce_unc,
				commission_entry AS ce_paid
			SET
				ce_unc.deleted_at = :deleted_at
			WHERE
				/* just this commission period */
				(cs.id = ce_unc.publisher_statement_id OR
				cs.id = ce_unc.salesrep_statement_id) AND
				
				/* just this commission period */
				(cs.id = ce_paid.publisher_statement_id OR
				cs.id = ce_paid.salesrep_statement_id) AND
				
				cs.period_id = :comm_period AND
				
				/* same contract and period */
				ce_unc.contract_id = ce_paid.contract_id AND
				ce_paid.duration_id = ce_unc.duration_id AND
				ce_paid.deleted_at IS NULL AND
				ce_unc.deleted_at IS NULL AND
				ce_unc.payment_id IS NULL AND
				ce_paid.payment_id IS NOT NULL", array('deleted_at' => $params['created_at'], 'comm_period' => $comm_period));
			
			// update manually adjusted entries updating to the new commission statement IDs
			$manadj_pubs = $this->db->executeQuery("UPDATE
				commission_statements AS cs,
				commission_statements AS csd,
				commission_entry AS ce
			SET
				ce.publisher_statement_id = cs.id
			WHERE
				ce.publisher_statement_id = csd.id AND
				cs.employee_id = ce.publisher_id AND
				csd.employee_id = ce.publisher_id AND
				csd.id != cs.id AND
				csd.deleted_at IS NOT NULL AND
				csd.locked_at IS NULL AND
				csd.period_id = cs.period_id AND
				cs.deleted_at IS NULL AND
				cs.locked_at IS NULL AND
				ce.manually_adjusted IS NOT NULL AND
				ce.deleted_at IS NULL AND
				cs.period_id = :comm_period", array('comm_period' => $comm_period));
				
			$manadj_sr = $this->db->executeQuery("UPDATE
				commission_statements AS cs,
				commission_statements AS csd,
				commission_entry AS ce
			SET
				ce.salesrep_statement_id = cs.id
			WHERE
				ce.salesrep_statement_id = csd.id AND
				cs.employee_id = ce.salesrep_id AND
				csd.employee_id = ce.salesrep_id AND
				csd.id != cs.id AND
				csd.deleted_at IS NOT NULL AND
				csd.locked_at IS NULL AND
				csd.period_id = cs.period_id AND
				cs.deleted_at IS NULL AND
				cs.locked_at IS NULL AND
				ce.manually_adjusted IS NOT NULL AND
				ce.deleted_at IS NULL AND
				cs.period_id = :comm_period", array('comm_period' => $comm_period));
				
        	$this->db->commit();
        	return array('statements' => ($salesreps_statements + $publishers_statements), 'entries' => $commission_entries);
    	} catch (Exception $e){
    		$this->db->rollback();
    		return array('error' => array('An unexpected database error was ecountered'));
    	}
    }
	
	public function validate(&$app, &$params)
    {
    	$error = array();
		// clear params we don't need
				
		// set the creator, updator, owner
		$ownerid = null;
		$token = $app['security']->getToken();
		if (null !== $token) {
			$user = $token->getUser();
			$ownerid = $user->getId();
		} else {
			$app['monolog']->addInfo('unable to get security token');
		}
		$params['insert_user_id'] = $params['update_user_id'] = $ownerid;
		return $error;
    }
    
    public function create($params)
    {
    	unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        /*
        $this->db->insert('commission_cycle',$params);
        $id = $this->db->lastInsertId();
        $res = $this->getById($id);
        return $res;
        */
    }
    
    public function update($id, $params)
    {
    	unset($params['owner_id'], $params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        /*
        $rows = $this->db->update('commission_cycle',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
        */
    }
    
    public function delete($id)
    {
    	$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
		/*
        $rows = $this->db->update('commission_cycle',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
        */
    }
}