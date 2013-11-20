<?php

namespace Classes\Business;

class Download
{
	protected $tmp_dir = '/tmp';
	private $mimetypes = array(
		'pdf' 	=> array('type' => 'application/pdf'),
		'xlsx'	=> array('type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'action' => 'download')
	);
	
	public function getTempDir()
	{
		return $this->tmp_dir;
	}
	
	public function downloadFile($file)
	{
		$dir = $_SERVER['DOCUMENT_ROOT'].$this->getTempDir();
		if (!is_file($dir.'/'.$file)){
			return array('error' => array('File not found: '.$file));
		}
		
		$path = pathinfo($file);
		$ext = strtolower($path['extension']);
		$mimetype = '';
		if (isset($this->mimetypes[$ext])){
			$mimetype = $this->mimetypes[$ext];
		}
		if ($mimetype){
			header('Content-Type: '.$mimetype['type']); // octet-stream
			if (isset($mimetype['action']) && $mimetype['action'] == 'download'){
				header('Content-Disposition: attachment; filename='.basename($file));
			} else {
				header('Content-Disposition: inline; filename='.basename($file));
			}
		} else {
			header('Content-Type: application/octet-stream'); // 
			header('Content-Disposition: attachment; filename='.basename($file));
		}
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($dir.'/'.$file));
		ob_clean();
		flush();
		readfile($dir.'/'.$file);
		exit;
	}
}