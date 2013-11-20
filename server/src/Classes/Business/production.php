<?php

namespace Classes\Business;

use JavisERP\System\Database\AbstractBusinessService;
use Aws\Common\Aws;

class Production extends AbstractBusinessService
{
	private $maxthumbheight = 768;
	private $maxthumbwidth = 1024;
	
	private $mimetypes = array(
		'jpg' 	=> array('type' => 'image/jpeg'),
		'gif' 	=> array('type' => 'image/gif'),
		'png' 	=> array('type' => 'image/png')		
	);
	
	private $types = array(
		'photos' => array(
				'exts' => array('jpg','gif','png','psd','tif','ai','eps')
			)
	);
	
    public function getTableName()
    {
        return 'production';
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
			$osql = 'created_at DESC';
		}
		
		// build our search criteria
		$where = array();
		$wsql = '';		
		// handle additional filters
		if (@count($filter) > 0){
			foreach ($filter as $f){
				if(array_key_exists('value',$f) && !isset($where[$f['property']]) && !empty($f['value'])){
					$qq = $this->db->quote($f['value']);
					$where[$f['property']] = $f['property']." = ".$qq;
				}
        	}
		}
		
		// search criteria was passed in
		if (isset($search['query']) && !empty($search['query'])){
			if (@count($search['fields']) >= 1){
				$or = array();
				$qq = $this->db->quote($search['query'].'%');
				$q = $search['query'];
				array_walk($search['fields'], function($field,$key) use (&$or, &$qq, &$q){
					switch ($field){
						case 'keywords':
							$words = preg_split("/[\s,]+/", $q);
							foreach ($words as $word){
								$word = trim($word);
        						if (!empty($word)){
									$or[] = "k.keyword = '".addslashes($word)."'";
								}
							}
							break;
						
						default:
							$or[] = 'production.'.$field.' LIKE '.$qq;
							break;
					}
				});
				if (@count($or) > 0){
					$where[] = "(".implode(' OR ', $or).")";
				}
			} else {
				$parts = explode(" ", $search['query']);
    			$where[] = "production.title LIKE '".addslashes($search['query'])."%'";
			}
		}
		if (@count($where) > 0){
			$wsql = " AND ".implode(" AND ", $where);
		}
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	production.*,
        	production_type.title								AS type_title,
        	production_type.storage_folder						AS type_storage_folder,
        	CONCAT(creator.first_name, ' ',creator.last_name) 	AS insert_fullname,
        	CONCAT(updator.first_name, ' ',updator.last_name) 	AS update_fullname,
        	client.company_name 								AS client_company_name,
        	publication.description								AS publication_description,
        	territory.name										AS territory_name,
        	keywords.keywords
        FROM
        	(production,
        	production_type)
        	LEFT JOIN (SELECT
        			production_id,
        			GROUP_CONCAT(DISTINCT keyword ORDER BY keyword SEPARATOR ', ') AS keywords
        		FROM
        			(production_keyword_xref,
        			production_keyword)
        		WHERE
        			production_keyword_xref.keyword_id = production_keyword.id
        		GROUP BY
        			production_keyword_xref.production_id) AS keywords ON keywords.production_id = production.id
        	LEFT JOIN production_keyword_xref AS kx ON kx.production_id = production.id
        	LEFT JOIN production_keyword AS k ON k.id = kx.keyword_id
        	LEFT JOIN employee AS creator ON creator.id = production.insert_user_id
        	LEFT JOIN employee AS updator ON updator.id = production.update_user_id
        	LEFT JOIN client ON client.id = production.client_id
        	LEFT JOIN territory ON territory.id = production.territory_id
        	LEFT JOIN publication ON publication.id = production.publication_id
        WHERE
        	production.deleted_at IS NULL AND
        	production.type_id = production_type.id
        	$wsql
        GROUP BY
        	production.id
        ORDER BY
        	$osql
        $lsql ";
        $rows = $this->db->fetchAll($sql);
        $totalCount = $this->db->fetchColumn("SELECT FOUND_ROWS()");
        return array($totalCount, $rows);
    }

    public function getById($id) {
        $sql = "SELECT SQL_CALC_FOUND_ROWS
        	production.*,
        	production_type.title								AS type_title,
        	production_type.storage_folder						AS type_storage_folder,
        	CONCAT(creator.first_name, ' ',creator.last_name) 	AS insert_fullname,
        	CONCAT(updator.first_name, ' ',updator.last_name) 	AS update_fullname,
        	client.company_name 								AS client_company_name,
        	publication.description								AS publication_description,
        	territory.name										AS territory_name,
        	keywords.keywords
        FROM
        	(production,
        	production_type)
        	LEFT JOIN (SELECT
        			production_id,
        			GROUP_CONCAT(DISTINCT keyword ORDER BY keyword SEPARATOR ', ') AS keywords
        		FROM
        			(production_keyword_xref,
        			production_keyword)
        		WHERE
        			production_keyword_xref.keyword_id = production_keyword.id
        		GROUP BY
        			production_keyword_xref.production_id) AS keywords ON keywords.production_id = production.id
        	LEFT JOIN production_keyword_xref AS kx ON kx.production_id = production.id
        	LEFT JOIN production_keyword AS k ON k.id = kx.keyword_id
        	LEFT JOIN employee AS creator ON creator.id = production.insert_user_id
        	LEFT JOIN employee AS updator ON updator.id = production.update_user_id
        	LEFT JOIN client ON client.id = production.client_id
        	LEFT JOIN territory ON territory.id = production.territory_id
        	LEFT JOIN publication ON publication.id = production.publication_id
        WHERE
        	production.deleted_at IS NULL AND
        	production.type_id = production_type.id AND
        	production.id = ?";
        return $this->db->fetchAssoc($sql,array((int) $id));
    }
    
    public function downloadById(&$app, $id)
    {
    	$image = $this->getById($id);
    	$aws = Aws::factory($app['aws.config']);
	    $s3 = $aws->get('s3');
	    
	    if (isset($this->mimetypes[$image['filetype']])){
	    	header("Content-type: ".$this->mimetypes[$image['filetype']]);
	    } else {
	    	header('Content-Type: application/octet-stream');
	    }
	    header('Content-Disposition: attachment; filename='.$image['filename']);
	    
	    if ($image['filesize']){
	    	header('Content-Length: ' . $image['filesize']);
	    }
	    
	    $img = $s3->getObject(array(
	    	'Bucket' 	=> $app['aws.bucket'],
	    	'Key'		=> $image['type_id'].'/'.$image['folder'].'/'.$image['id'].'.'.$image['filetype'],
	    	'SaveAs'	=> 'php://output'
	    ));
	    //$app['monolog']->addInfo(print_r($img, true));
	    //print_r($img);
	    exit;
    }
    
    public function generateThumbnail($id, $width = '', $height = '')
    {
    	$item = $this->getById($id);
    	$file = $_SERVER['DOCUMENT_ROOT'].'/stor/'.$item['type_id'].'/'.$item['folder'].'/'.$item['id'].'.jpg';
    	if (is_file($file)){
    		if (empty($width) || empty($height)){
    			$width = 200;
    			$height = 200;
    		}
    		$im = ImageCreateFromJpeg($file);
			$w = imagesx($im);
			$h = imagesy($im);
			if ($w < $height){
				$height = $h;
				$width = $w;
			} else {
				$height = ($width * imagesy($im))/imagesx($im);
				/*
				$height = $this->thumbheight;
				$width = ($this->thumbheight * imagesx($im))/imagesy($im);
				if ($width > $this->thumbwidth){
					$y = 0;
					$width = $this->thumbwidth;
					$neww = imagesy($im) * ($this->thumbwidth / $this->thumbheight);
					$x = floor(($w - $neww) / 2);
				} else {
					$x = 0;
					$y = 0;
					$neww = $w;
				}
				*/
			}
			$x = 0;
			$y = 0;
			$thumb = imagecreatetruecolor($width, $height);
			$white = imagecolorallocate($thumb, 255, 255, 255);
			$black = imagecolorallocate($thumb, 0, 0, 0);
			//imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $neww, $h);
			imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $w, $h);
			header("Content-type: image/jpeg");
			ImageJpeg($thumb, '', 60);
    		exit;
    	}
    }
    
    public function saveThumbnail(&$app, $ext, $incoming, $saveas)
    {
    	switch ($ext){
    		case 'jpg':
		    	$im = ImageCreateFromJpeg($incoming);
				$w = imagesx($im);
				$h = imagesy($im);
				// don't resize if we are smaller than max thumbnail size
				if ($w < $this->maxthumbwidth && $h < $this->maxthumbheight){
					ImageJpeg($im, $saveas, 60);
				
				// resize down to max thumbnail size so we don't use as much CPU generating smaller cpu later
				} else {
					$height = $this->maxthumbheight;
					$width = ($this->maxthumbheight * imagesx($im))/imagesy($im);
					if ($width > $this->maxthumbwidth){
						$y = 0;
						$width = $this->maxthumbwidth;
						$neww = imagesy($im) * ($this->maxthumbwidth / $this->maxthumbheight);
						$x = floor(($w - $neww) / 2);
					} else {
						$x = 0;
						$y = 0;
						$neww = $w;
					}
					
					$x = 0;
					$y = 0;
					$thumb = imagecreatetruecolor($width, $height);
					$white = imagecolorallocate($thumb, 255, 255, 255);
					$black = imagecolorallocate($thumb, 0, 0, 0);
					imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $neww, $h);
					//imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $w, $h);
					ImageJpeg($thumb, $saveas, 60);
				}
				break;
			
			case 'ai':
			case 'tif':
			case 'psd':
			case 'eps':
				// generate a JPG and from AI/TIFF/PSD/EPS and then resize the JPG by calling saveThumbnail again
				$app['monolog']->addInfo('convert "'.$incoming.'" -flatten "'.$saveas.'"');
				exec('convert "'.$incoming.'" -flatten "'.$saveas.'"', $output, $return);
				$app['monolog']->addInfo(print_r($output, true));
				$app['monolog']->addInfo('return: '.$return);
				$this->saveThumbnail($app, 'jpg', $saveas, $saveas);
				break;
			
			case 'gif':
				$im = ImageCreateFromGif($incoming);
				$w = imagesx($im);
				$h = imagesy($im);
				// don't resize if we are smaller than max thumbnail size
				if ($w < $this->maxthumbwidth && $h < $this->maxthumbheight){
					$thumb = imagecreatetruecolor($w, $h);
					$white = imagecolorallocate($thumb, 255, 255, 255);
					$black = imagecolorallocate($thumb, 0, 0, 0);
					imagefilledrectangle ($thumb, 0, 0, $w, $h, $white);
					imagecopyresampled($thumb, $im, 0, 0, 0, 0, $w, $h, $w, $h);
					ImageJpeg($thumb, $saveas, 80);
				
				// resize down to max thumbnail size so we don't use as much CPU generating smaller cpu later
				} else {
					$height = $this->maxthumbheight;
					$width = ($this->maxthumbheight * imagesx($im))/imagesy($im);
					if ($width > $this->maxthumbwidth){
						$y = 0;
						$width = $this->maxthumbwidth;
						$neww = imagesy($im) * ($this->maxthumbwidth / $this->maxthumbheight);
						$x = floor(($w - $neww) / 2);
					} else {
						$x = 0;
						$y = 0;
						$neww = $w;
					}
					
					$x = 0;
					$y = 0;
					$thumb = imagecreatetruecolor($width, $height);
					$white = imagecolorallocate($thumb, 255, 255, 255);
					$black = imagecolorallocate($thumb, 0, 0, 0);
					imagefilledrectangle ($thumb, 0, 0, $neww, $h, $white);
					imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $neww, $h);
					//imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $w, $h);
					ImageJpeg($thumb, $saveas, 80);
				}
				break;
			
			case 'png':
				$im = ImageCreateFromPng($incoming);
				$w = imagesx($im);
				$h = imagesy($im);
				// don't resize if we are smaller than max thumbnail size
				if ($w < $this->maxthumbwidth && $h < $this->maxthumbheight){
					$thumb = imagecreatetruecolor($w, $h);
					$black = imagecolorallocate($thumb, 0, 0, 0);
					$white = imagecolorallocate($thumb, 255, 255, 255);
					imagefilledrectangle($thumb, 0, 0, $w, $h, $white);
					imagecopyresampled($thumb, $im, 0, 0, 0, 0, $w, $h, $w, $h);
					ImageJpeg($thumb, $saveas, 80);
				
				// resize down to max thumbnail size so we don't use as much CPU generating smaller cpu later
				} else {
					$height = $this->maxthumbheight;
					$width = ($this->maxthumbheight * imagesx($im))/imagesy($im);
					if ($width > $this->maxthumbwidth){
						$y = 0;
						$width = $this->maxthumbwidth;
						$neww = imagesy($im) * ($this->maxthumbwidth / $this->maxthumbheight);
						$x = floor(($w - $neww) / 2);
					} else {
						$x = 0;
						$y = 0;
						$neww = $w;
					}
					
					$x = 0;
					$y = 0;
					$thumb = imagecreatetruecolor($width, $height);
					$black = imagecolorallocate($thumb, 0, 0, 0);
					$white = imagecolorallocate($thumb, 255, 255, 255);
					imagefilledrectangle($thumb, 0, 0, $neww, $h, $white);
					imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $neww, $h);
					//imagecopyresampled($thumb, $im, 0, 0, $x, $y, $width, $height, $w, $h);
					ImageJpeg($thumb, $saveas, 80);
				}
				break;
		}
    }
    
    public function validate(&$app, &$params, &$request)
    {
		$error = array();
		// we are editing an entry, so no image upload
		if (isset($params['id']) && !empty($params['id'])){
			// clear params we don't need
			unset($params['upload_id'], $params['file_thumb'], $params['file_full'], $params['filesize'], $params['folder'], $params['filetype']);
			unset($params['type_title'], $params['territory_name'], $params['publication_description'], $params['client_company_name']);
			unset($params['insert_uesr_id'], $params['insert_fullname'], $params['created_at'], $params['updated_at'], $params['deleted_at']);
		
		// we are creating a new entry, so the request gets sent differently
		} else {
			$fields = array('title','filename','territory_id','publication_id','keywords','client_id','upload_id');
			foreach ($fields as $field){
		    	$params[$field] = $request->get($field);
		    }
		    $params['file_full'] = $request->files->get('file_full');
		    $params['file_thumb'] = $request->files->get('file_thumb');
		}
		if (isset($params['territory_id']) && empty($params['territory_id'])){
			$params['territory_id'] = null;
		}
		if (isset($params['publication_id']) && empty($params['publication_id'])){
			$params['publication_id'] = null;
		}
		if (isset($params['client_id']) && empty($params['client_id'])){
			$params['client_id'] = null;
		}
	    
	    switch ($params['type_id']){
	    	case 'photos':
	    		if (empty($params['title'])){ $error[] = 'Title is required'; }
	    		if (empty($params['filename'])){ $error[] = 'Filename is required'; }
	    		if (empty($params['keywords'])){ $error[] = 'Keywords is required'; }
	    		if (!isset($params['id'])){
		    		if (empty($params['file_full'])){ 
		    			$error[] = 'File is required';
		    		} else {
			    		if ($params['file_full']->getError() != 0){
			    			switch ($params['file_full']->getError()){
			    				case 1:
			    				case 2:
			    					$error[] = 'File size too large';
			    					break;
			    				
			    				case 3:
			    					$error[] = 'File partially uploaded. Please try again.';
			    					break;
			    				
			    				case 4:
			    					$error[] = 'No file specified';
			    					break;
			    				
			    				default:
			    					$error[] = 'An unexpected error occurred attempting to upload your file';
			    					break;
			    			}
			    		} else {
			    			$parts = pathinfo($params['file_full']->getClientOriginalName());
						    $ext = strtolower($parts['extension']);
						    if (!in_array($ext, $this->types[$params['type_id']]['exts'])){
						    	$error[] = 'Invalid file type uploaded';
						    }
			    		}
			    	}
			    }
	    		break;
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

    public function create(&$app, $params) 
    {
    	set_time_limit(0);
        unset($params['id'], $params['update_user_id']);
        $now = new \DateTime('NOW');
        $params['created_at'] = $now->format('Y-m-d H:i:s');
        
        $basedir = $_SERVER['DOCUMENT_ROOT'].'/stor/'.$params['type_id'].'/';
        $params['folder'] = $now->format('Y/m');
        @mkdir($basedir.$params['folder'], 0777, true);
        
        $file_full = $params['file_full'];
        $keywords = $params['keywords'];
        $upload_id = $params['upload_id'];
        unset($params['keywords'], $params['file_full'], $params['file_thumb'], $params['upload_id']);
        
        $parts = pathinfo($file_full->getClientOriginalName());
	    $ext = strtolower($parts['extension']);
	    $params['filetype'] = $ext;
	    $params['filesize'] = filesize($file_full->getPathName());
        
        $this->db->beginTransaction();
        try {
	        $this->db->insert('production',$params);
	        $id = $this->db->lastInsertId();
	        
	        // insert keywords
	        $words = preg_split("/[\s,]+/", $keywords);
	        $kid = array();
	        foreach ($words as $word){
	        	$word = trim($word);
	        	if (!empty($word)){
	        		$exists = $this->db->fetchAssoc("SELECT * FROM production_keyword WHERE keyword = ?", array($word));
	        		if ($exists['id']){
	        			$kid[] = '('.$exists['id'].','.$id.')';
	        		} else {
	        			$this->db->insert('production_keyword', array('keyword' => $word));
	        			$kid[] = '('.$this->db->lastInsertId().','.$id.')';
	        		}
	        	}
	        }
	        if (@count($kid) > 0){
	        	$this->db->executeQuery("INSERT INTO production_keyword_xref (keyword_id, production_id) VALUES ".implode(", ", $kid));
	        }
	        
	        $this->saveThumbnail($app, $ext, $file_full->getPathName(), $basedir.$params['folder'].'/'.$id.'.jpg');

	        $aws = Aws::factory($app['aws.config']);
	    	$s3 = $aws->get('s3');
	    	$s3->upload($app['aws.bucket'], $params['type_id'].'/'.$params['folder'].'/'.$id.'.'.$ext, fopen($file_full->getPathName(), 'r'));
	    	
	    	$this->db->commit();
	    } catch (Exception $e){
	    	$app['monolog']->addInfo($e->getMessage());
    		$app['monolog']->addInfo($e->getTraceAsString());
    		$this->db->rollback();
	    }
        $res = $this->getById($id);
        $res['upload_id'] = $upload_id;
        return $res;
    }

	public function update($id, $params) 
	{
		unset($params['insert_user_id']);
		$now = new \DateTime('NOW');
        $params['updated_at'] = $now->format('Y-m-d H:i:s');
        $keywords = $params['keywords'];
        unset($params['keywords']);
        $rows = $this->db->update('production',$params, array('id' => $id));
        
        // update keywords
        $this->db->delete('production_keyword_xref', array('production_id' => $id));
        $words = preg_split("/[\s,]+/", $keywords);
        $kid = array();
        foreach ($words as $word){
        	$word = trim($word);
        	if (!empty($word)){
        		$exists = $this->db->fetchAssoc("SELECT * FROM production_keyword WHERE keyword = ?", array($word));
        		if ($exists['id']){
        			$kid[] = '('.$exists['id'].','.$id.')';
        		} else {
        			$this->db->insert('production_keyword', array('keyword' => $word));
        			$kid[] = '('.$this->db->lastInsertId().','.$id.')';
        		}
        	}
        }
        if (@count($kid) > 0){
        	$this->db->executeQuery("INSERT INTO production_keyword_xref (keyword_id, production_id) VALUES ".implode(", ", $kid));
        }
        
        $res = $this->getById($id);
        return $res;
    }
    
    public function delete($id) 
    {
		$now = new \DateTime('NOW');
		$params['deleted_at'] = $now->format('Y-m-d H:i:s');
        $rows = $this->db->update('production',$params, array('id' => $id));
        $res = $this->getById($id);
        return $res;
    }
}