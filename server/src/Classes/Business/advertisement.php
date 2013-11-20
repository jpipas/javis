<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;

class Advertisement extends AbstractBusinessService
{
    public function getTableName()
    {
        return 'advertisement';
    }

    public function getAll(&$app, $page = '', $start = '', $limit = '', $sort = '', $filter = '', $query = '', $search = array())
   	{
        // limit our search results
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
			$osql = 'advertisement.created_at DESC';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';
		// handle query filter
		if ($query){
			
		
		// handle additional filters
		} elseif (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					switch ($f['property']){
              			case 'client_id':
              				$qq = $this->db->quote($f['value']);
            				$where[$f['property']] = 'advertisement.'.$f['property']." = ".$qq;
              				break;
              				
           				default:
							$qq = $this->db->quote($f['value']);
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
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq, &$qqq){
					switch ($field){
						case 'client_company_name':
							$or[] = 'client.company_name LIKE '.$qq;
							break;
						
						case 'publication_names':
							$or[] = 'publication_names LIKE '.$qqq;
							break;
						
						case 'designer_name':
							$or[] = 'CONCAT(designer.first_name, \' \', designer.last_name) LIKE '.$qq;
							break;
						
						case 'salesrep_name':
							$or[] = 'CONCAT(salesrep.first_name, \' \', salesrep.last_name) LIKE '.$qq;
							break;
							
						case 'ad_type_description':
							$or[] = 'ad_type.description LIKE '.$qqq;
							break;
						
						case 'ad_size_description':
							$or[] = 'ad_size.description LIKE '.$qqq;
							break;
						
						case 'contracts':
							$or[] = 'c.contract_number LIKE '.$qq;
							break;
						
						default:
							$or[] = 'advertisement.'.$field.' LIKE '.$qq;
							break;
					}
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				
			}
		}
		
		// see if we need to limit what they can see
		if ($app['business.user']->hasPermission($app, 'advertisement_view_limit')){
    		$tids = $app['business.user']->getUserVisibleTerritories($app);
    		$eids = $app['business.user']->getUserVisibleDirectReports($app);
    		$where[] = "(c.soldby_id IN ('".implode("', '", $eids)."') OR c.territory_id IN ('".implode("', '", $tids)."'))";
    	}
		
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	advertisement.*,
        	client.company_name AS client_company_name,
        	app.publication_names,
        	ad_type.description AS ad_type_description,
        	ad_size.description AS ad_size_description,
        	CONCAT(designer.first_name, ' ', designer.last_name) AS designer_name,
        	CONCAT(salesrep.first_name, ' ', salesrep.last_name) AS salesrep_name,
        	GROUP_CONCAT(DISTINCT c2.contract_number ORDER BY CAST(REPLACE(c2.contract_number,'-','.') AS DECIMAL(10,2)) SEPARATOR ', ') AS contracts
        FROM
        	(advertisement,
        	client,
        	ad_type,
        	ad_size,
        	(SELECT 
	        		ap.advertisement_id, 
	        		GROUP_CONCAT(publication.description ORDER BY publication.description SEPARATOR ', ') AS publication_names 
	        	FROM 
	        		advertisement_publication AS ap,
	        		publication
	        	WHERE
	        		publication.deleted_at IS NULL AND
	        		publication.id = ap.publication_id
	        	GROUP BY
	        		ap.advertisement_id) AS app)
	        LEFT JOIN contract_advertisement AS ca ON ca.advertisement_id = advertisement.id
	        LEFT JOIN contract AS c ON c.id = ca.contract_id AND c.deleted_at IS NULL
	        LEFT JOIN contract_advertisement AS ca2 ON ca2.advertisement_id = advertisement.id
	        LEFT JOIN contract AS c2 ON c2.id = ca2.contract_id AND c2.deleted_at IS NULL
	        LEFT JOIN employee AS designer ON designer.id = advertisement.designer_id AND designer.deleted_at IS NULL
	        LEFT JOIN employee AS salesrep ON salesrep.id = advertisement.salesrep_id AND salesrep.deleted_at IS NULL
        WHERE
        	advertisement.deleted_at IS NULL AND
        	client.deleted_at IS NULL AND
        	advertisement.client_id = client.id AND
        	advertisement.id = app.advertisement_id AND
        	advertisement.ad_type_id = ad_type.id AND
        	advertisement.ad_size_id = ad_size.id
        $wsql
        GROUP BY
        	advertisement.id
        ORDER BY
        	$osql
        $lsql";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id){
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	advertisement.*,
        	client.company_name AS client_company_name,
        	app.publication_names,
        	ad_type.description AS ad_type_description,
        	ad_size.description AS ad_size_description,
        	CONCAT(designer.first_name, ' ', designer.last_name) AS designer_name,
        	CONCAT(salesrep.first_name, ' ', salesrep.last_name) AS salesrep_name
        FROM
        	(advertisement,
        	client,
        	ad_type,
        	ad_size,
        	(SELECT 
	        		ap.advertisement_id, 
	        		GROUP_CONCAT(publication.description ORDER BY publication.description SEPARATOR ', ') AS publication_names 
	        	FROM 
	        		advertisement_publication AS ap,
	        		publication
	        	WHERE
	        		publication.deleted_at IS NULL AND
	        		publication.id = ap.publication_id
	        	GROUP BY
	        		ap.advertisement_id) AS app)
	        LEFT JOIN employee AS designer ON designer.id = advertisement.designer_id AND designer.deleted_at IS NULL
	        LEFT JOIN employee AS salesrep ON salesrep.id = advertisement.salesrep_id AND salesrep.deleted_at IS NULL
        WHERE
        	advertisement.deleted_at IS NULL AND
        	client.deleted_at IS NULL AND
        	advertisement.client_id = client.id AND
        	advertisement.id = app.advertisement_id AND
        	advertisement.ad_type_id = ad_type.id AND
        	advertisement.ad_size_id = ad_size.id AND
        	advertisement.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    /* do validation here */
    public function validate(&$app, &$params)
    {
    	$error = array();
    	// clear params we don't need
  		unset($params['ad_type'], $params['ad_type_description'], $params['ad_size'], $params['ad_size_description'], $params['created_at'], 
  			$params['deleted_at'], $params['updated_at'], $params['insert_user_id'], $params['update_user_id'], $params['client_company_name'], 
  			$params['publication_names'], $params['salesrep_name'], $params['designer_name'], $params['designer'], $params['salesrep'],
  			$params['client'], $params['contracts']);
  			
  		
  		$app['monolog']->addInfo(print_r($params, true));
  		
  		$params['email_client'] = ($params['email_client']?1:0);
  		$params['email_designer'] = ($params['email_designer']?1:0);
  		
  		// client	
  		if (empty($params['client_id'])){
  			$error[] = 'Client is a required field';
  		} else {
  			$client = $app['business.client']->getById($params['client_id']);
  			if (!$client['id']){
  				$error[] = 'Invalid client specified';
  			}
  		}
  		
  		// ad type
  		if (empty($params['ad_type_id'])){
  			$error[] = 'Ad type is a required field';
  		} else {
  			$adtype = $app['business.adtype']->getById($params['ad_type_id']);
  			if (empty($adtype['id'])){
  				$error[] = 'Invalid ad type specified';
  			}
  		}
  		
  		// ad size
  		if (empty($params['ad_size_id'])){
  			$error[] = 'Ad size is a required field';
  		} else {
  			$adsize = $app['business.adsize']->getById($params['ad_size_id']);
  			if (empty($adsize['id'])){
  				$error[] = 'Invalid ad size specified';
  			}
  		}
  		
  		// publication
  		if (empty($params['publications']) || @count($params['publications']) < 1){
  			$error[] = 'Publication is a required field';
  		} else {
  			foreach ($params['publications'] as $pub){
  				$p = $app['business.publication']->getById($pub);
  				if (!$p['id']){
  					$error[] = 'Invalid publication selected';
  				}
  			}
  		}
  		
  		// designer
  		if (!empty($params['designer_id'])){
  			$user = $app['business.user']->getById($params['designer_id']);
  			if (!$user['id']){
  				$error[] = 'Invalid designer specified';
  			}
  		}
  		
  		// sales rep
  		if (!empty($params['salesrep_id'])){
  			$user = $app['business.user']->getById($params['salesrep_id']);
  			if (!$user['id']){
  				$error[] = 'Invalid sales rep specified';
  			}
  		}
  		
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

		/* create new ad */
    public function create($params)
    {
        unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        $pubs = array();
        $pubs = $params['publications'];
        unset($params['publications']);
        $this->db->insert('advertisement',$params);
        $ad_id = $this->db->lastInsertId();
        foreach ($pubs as $pub_id){
        	$this->db->insert('advertisement_publication', array('advertisement_id' => $ad_id, 'publication_id' => $pub_id));
        }
        $res = $this->getById($ad_id);
        return $res;
    }
    
    /* update */
    public function update($id, $params) 
    {
				unset($params['insert_user_id']);
				$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $pubs = array();
        $pubs = $params['publications'];
        unset($params['publications']);
        $rows = $this->db->update('advertisement',$params, array('id' => $id));
        $this->db->delete('advertisement_publication', array('advertisement_id' => $id));
        foreach ($pubs as $pub_id){
        	$this->db->insert('advertisement_publication', array('advertisement_id' => $id, 'publication_id' => $pub_id));
        }
        $res = $this->getById($id);
        return $res;
    }
    
    /* delete */
    public function delete($id) 
    {
    		$now = new \DateTime('NOW');
				$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('advertisement',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }


    public function getByContractId($contract_id) {
    		$sql = "SELECT
        	advertisement.*,
        	client.company_name AS client_company_name,
        	app.publication_names,
        	ad_type.description AS ad_type_description,
        	ad_size.description AS ad_size_description
        FROM
        	advertisement,
        	client,
        	contract_advertisement,
        	ad_type,
        	ad_size,
        	(SELECT 
	        		ap.advertisement_id, 
	        		GROUP_CONCAT(publication.description ORDER BY publication.description SEPARATOR ', ') AS publication_names 
	        	FROM 
	        		advertisement_publication AS ap,
	        		publication
	        	WHERE
	        		publication.deleted_at IS NULL AND
	        		publication.id = ap.publication_id
	        	GROUP BY
	        		ap.advertisement_id) AS app
        WHERE
        	advertisement.deleted_at IS NULL AND
        	client.deleted_at IS NULL AND
        	advertisement.client_id = client.id AND
        	advertisement.id = app.advertisement_id AND
        	advertisement.ad_type_id = ad_type.id AND
        	advertisement.ad_size_id = ad_size.id AND
        	advertisement.id = contract_advertisement.advertisement_id AND
        	contract_advertisement.contract_id = ?";
        return $this->db->fetchAll($sql,array((int) $contract_id));
    }

    public function deleteByContractId($contract_id) {
        $sql = "UPDATE advertisement a SET a.deleted_at = NOW() WHERE a.id IN (SELECT advertisement_id FROM contract_advertisement WHERE contract_id = ?)";
        return $this->db->executeQuery($sql,array((int) $contract_id));
        //$this->db->update('advertisement',array("deleted_at"=>"now"),array("contract_id"=>$contract_id));
    }

    public function deleteById($id) {
        return $this->db->update('advertisement',array("deleted_at" => "now()"), array("id" => $id));
    }
}