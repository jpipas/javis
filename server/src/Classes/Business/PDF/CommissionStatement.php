<?php

namespace Classes\Business\PDF;

use TCPDF;

class CommissionStatement extends TCPDF
{
	private $logo = 'images/bvm_logo.png';
	private $comm;
	private $lineheight = 9;
	private $fontsize = 9;
	private $publisher_fields = array(
		'client_company_name'	=> array('width' => .3, 'title' => 'Customer'),
		'contract_number'		=> array('width' => .1, 'title' => 'Contract', 'align' => 'C'),
		'paytype_description'	=> array('width' => .1, 'title' => 'Pay Type', 'align' => 'C'),
		'postdate'				=> array('width' => .1, 'title' => 'TX Date', 'align' => 'C', 'modifier' => 'date'),
		'paycat_abbrev'			=> array('width' => .1, 'title' => 'Status', 'align' => 'C'),
		'amount'				=> array('width' => .1, 'title' => 'Amount', 'align' => 'R', 'modifier' => 'dollar'),
		'comm_percent'			=> array('width' => .1, 'title' => 'Comm %', 'align' => 'C', 'modifier' => 'percent'),
		'cpo_amount'			=> array('width' => 0, 'title' => 'CPO Amt', 'align' => 'R', 'modifier' => 'dollar')
	);
	
	private $salesrep_fields = array(
		'client_company_name'	=> array('width' => .26, 'title' => 'Customer'),
		'contract_number'		=> array('width' => .07, 'title' => 'Contract', 'align' => 'C'),
		'paytype_description'	=> array('width' => .06, 'title' => 'Pay Type', 'align' => 'C'),
		'salesrep_name'			=> array('width' => .17, 'title' => 'Account Exec', 'align' => 'C'),
		'postdate'				=> array('width' => .08, 'title' => 'TX Date', 'align' => 'C', 'modifier' => 'date'),
		'date_string'			=> array('width' => .07, 'title' => 'Edition', 'align' => 'C', 'modifier' => 'edition'),
		'paycat_abbrev'			=> array('width' => .07, 'title' => 'Status', 'align' => 'C', 'modifier' => 'paycatbonus'),
		'amount'				=> array('width' => .07, 'title' => 'Amount', 'align' => 'R', 'modifier' => 'dollar'),
		'comm_percent'			=> array('width' => .07, 'title' => 'Comm %', 'align' => 'C', 'modifier' => 'percent'),
		'cpo_amount'			=> array('width' => 0, 'title' => 'CPO Amt', 'align' => 'R', 'modifier' => 'dollar')
	);
	
	private $currfields;
	private $headertitles = array();
	private $linecolor = 204;
	private $my_templates;
	
	public function __construct()
	{
		parent::__construct('L', 'in', 'Letter');
		
		// set document information
		$this->SetTitle('Best Version Media Commission Statement');
		
		// set default header data
		$this->SetHeaderData('', '', 'Best Version Media', '', array(0,0,0), array(0,0,0));
		//$pdf->setFooterData(array(0,0,0), array(0,64,128));
		
		// set header and footer fonts
		$this->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
		$this->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
		
		// set default monospaced font
		$this->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		
		// set margins
		$this->SetMargins(.5, 1.25, .5);
		$this->SetHeaderMargin(.5);
		$this->SetFooterMargin(.5);
		
		// set auto page breaks
		$this->SetAutoPageBreak(true, 1);
		
		// set image scale factor
		$this->setImageScale(PDF_IMAGE_SCALE_RATIO);
		
		// set default font subsetting mode
		$this->setFontSubsetting(true);
		
		// Set font
		$this->SetFont('helvetica', '', $this->fontsize, '', true);
	}
	
	public function Header()
	{
		$this->SetTopMargin(1.25);
		$this->SetY($this->getHeaderMargin());
		$margins = $this->getMargins();
		if (!$this->my_templates['logo']){
			$this->my_templates['logo'] = $this->startTemplate();
				$this->image(dirname(__FILE__).'/'.$this->logo, 0, 0, '', .45);
			$this->endTemplate();
		}
		$this->printTemplate($this->my_templates['logo']);
		$this->SetFont('helvetica', 'B', 16);
		$this->Cell(0, (16/72), $this->comm['fullname'], 0, 1, 'R');
		$this->SetFont('helvetica', '', 14);
		$this->Cell(0, (14/72), date('F j, Y', strtotime($this->comm['date_string'])), 0, 1, 'R');
		$this->SetFont('helvetica', '',$this->fontsize);
		
		if (!$this->comm['locked_at']){
			$this->SetFont('helvetica', 'B', 14);
			$this->SetTextColor(255,0,0);
			$this->SetY(.7);
			$this->Cell(0, (14/72), 'PRELIMINARY', 0, 1, 'C');
			$this->SetFont('helvetica', '',$this->fontsize);
			$this->SetTextColor(0);
		}
		
		if (@count($this->currfields) > 0){
			/*
			$this->SetCellPadding(.02);
			$width = $this->getPageWidth() - $margins['left'] - $margins['right'];
			$this->SetY($margins['top']);
			$this->SetTextColor(255);
			$this->Cell(5, ($this->lineheight/72), $this->headertitles['left'], 0, 0, 'L', true);
			$this->Cell(0, ($this->lineheight/72), $this->headertitles['right'], 0, 1, 'R', true);
			$this->SetTextColor(0);
			$this->SetFont('helvetica', 'B');
			foreach ($this->currfields as $key => $val){
				$this->Cell(($width * $val['width']), ($this->lineheight/72), $val['title'], 0, 0, (isset($val['align'])?$val['align']:'L'));
			}
			$this->SetFont('helvetica', '');
			$this->Ln();
			$this->SetTopMargin($this->GetY());
			*/
		}
	}
	
	public function buildStatement($comm)
	{
		$this->comm = $comm;
		
		// Add a page
		$this->AddPage();
		
		$margins = $this->getMargins();
		$width = $this->getPageWidth() - $margins['left'] - $margins['right'];
		$baseline_totals = array();
		$this->SetCellPadding(.04);
		// publisher entries
		if (isset($comm['entries']['publisher'])){
			krsort($comm['entries']['publisher']);
			$prevtotal = 0;
			$prevtotalamount = 0;
			foreach ($comm['entries']['publisher'] as $date_string => $territories){
				foreach ($territories as $tid => $territory){
					$this->currfields = $this->publisher_fields;
					$this->headertitles['left'] = 'Personal Accounts - '.$territory['territory_name'];
					if ($date_string != $comm['date_string']){
						$previous = true;
						$this->headertitles['right'] = 'Previous Edition(s)';
					} else {
						$previous = false;
						$this->headertitles['right'] = date('F',strtotime($date_string)).' Edition';
					}
					if (($previous && $prevtotal == 0) || !$previous){
						$this->SetTextColor(255);
						$this->Cell(5, ($this->lineheight/72), $this->headertitles['left'], 0, 0, 'L', true);
						$this->Cell(0, ($this->lineheight/72), $this->headertitles['right'], 0, 1, 'R', true);
						$this->SetTextColor(0);
						$this->SetFont('helvetica', 'B', $this->fontsize);
						foreach ($this->publisher_fields as $key => $val){
							$this->Cell(($width * $val['width']), ($this->lineheight/72), $val['title'], array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
						}
						$this->SetFont('helvetica', '', $this->fontsize);
						$this->Ln();
					}
					$total = 0;
					$totalamount = 0;
					foreach ($territory['entries'] as $entry){
						foreach ($this->publisher_fields as $key => $val){
							if (isset($val['modifier'])){
								$func = 'modifier_'.$val['modifier'];
								$value = $this->$func($entry[$key], $entry);
							} else {
								$value = $entry[$key];
							}
							$this->Cell(($width * $val['width']), ($this->lineheight/72), $value, array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
						}
						$total += $entry['cpo_amount'];
						$totalamount += $entry['amount'];
						if ($previous){ 
							$prevtotal += $entry['cpo_amount']; 
							$prevtotalamount += $entry['amount'];
						}
						$baseline_totals[$tid]['territory_name'] = $territory['territory_name'];
						if (!isset($baseline_totals[$tid]['total'])){ $baseline_totals[$tid]['total'] = 0; }
						$baseline_totals[$tid]['total'] += $entry['cpo_amount'];
						$this->Ln();
					}
					if (!$previous){
						$this->SetFont('helvetica', 'B', $this->fontsize);
						$this->Cell(($width * .7), ($this->lineheight/72), 'SUBTOTAL: ', 0, 0, 'R');
						$this->Cell(($width * .1), ($this->lineheight/72), $this->modifier_dollar($totalamount), 0, 0, 'R');
						$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($total), 0, 0, 'R');
						$this->SetFont('helvetica', '', $this->fontsize);
						$this->Ln();
						$this->Ln();
					}
				}
			}
			if ($previous && $prevtotal > 0){
				$this->SetFont('helvetica', 'B', $this->fontsize);
				$this->Cell(($width * .7), ($this->lineheight/72), 'SUBTOTAL: ', 0, 0, 'R');
				$this->Cell(($width * .1), ($this->lineheight/72), $this->modifier_dollar($prevtotalamount), 0, 0, 'R');
				$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($prevtotal), 0, 0, 'R');
				$this->SetFont('helvetica', '', $this->fontsize);
				$this->Ln();
				$this->Ln();
			}
		}
		$this->currfields = array();
		$this->headertitles = array();
		
		$ae_totals = 0;
		if (isset($comm['entries']['salesrep'])){
			krsort($comm['entries']['salesrep']);
			$prevtotal = 0;
			$prevtotalamount = 0;
			foreach ($comm['entries']['salesrep'] as $date_string => $entries){
				$cellpaddings = $this->GetCellPaddings();
				$y = $this->GetY() + ((($this->lineheight/72) * 2) + $cellpaddings['T'] + $cellpaddings['B']);
				//echo 'Y: '.$y;
				//$pagebreak = $this->checkPageBreak(, '', true);
				//echo 'Page break: '.($pagebreak?'yes':'no');
				//exit;
				
				$this->headertitles['left'] = 'Account Executive Overrides';
				if ($date_string != $comm['date_string']){
					$previous = true;
					$this->headertitles['right'] = 'Previous Edition(s)';
				} else {
					$previous = false;
					$this->headertitles['right'] = date('F',strtotime($date_string)).' Edition';
				}
				if (($previous && $prevtotal == 0) || !$previous){
					$this->SetTextColor(255);
					$this->Cell(5, ($this->lineheight/72), $this->headertitles['left'], 0, 0, 'L', true);
					$this->Cell(0, ($this->lineheight/72), $this->headertitles['right'], 0, 1, 'R', true);
					$this->SetTextColor(0);
					$this->SetFont('helvetica', 'B', $this->fontsize);
					foreach ($this->salesrep_fields as $key => $val){
						$this->Cell(($width * $val['width']), ($this->lineheight/72), $val['title'], array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
					}
					$this->SetFont('helvetica', '', $this->fontsize);
					$this->Ln();
				}
				$this->currfields = $this->salesrep_fields;
				$total = 0;
				$totalamount = 0;
				foreach ($entries as $entry){
					foreach ($this->salesrep_fields as $key => $val){
						if (isset($val['modifier'])){
							$func = 'modifier_'.$val['modifier'];
							$value = $this->$func($entry[$key], $entry);
						} else {
							$value = $entry[$key];
						}
						$this->Cell(($width * $val['width']), ($this->lineheight/72), $value, array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
					}
					$total += $entry['cpo_amount'];
					$totalamount += $entry['amount'];
					$ae_totals += $entry['cpo_amount'];
					if ($previous){ 
						$prevtotal += $entry['cpo_amount']; 
						$prevtotalamount += $entry['amount'];
					}
					$this->Ln();
				}
				if (!$previous){
					$this->SetFont('helvetica', 'B', $this->fontsize);
					$this->Cell(($width * .78), ($this->lineheight/72), 'SUBTOTAL: ', 0, 0, 'R');
					$this->Cell(($width * .07), ($this->lineheight/72), $this->modifier_dollar($totalamount), 0, 0, 'R');
					$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($total), 0, 0, 'R');
					$this->SetFont('helvetica', '', $this->fontsize);
					$this->Ln();
					$this->Ln();
				}
			}
			if ($previous && $prevtotal > 0){
				$this->SetFont('helvetica', 'B', $this->fontsize);
				$this->Cell(($width * .78), ($this->lineheight/72), 'SUBTOTAL: ', 0, 0, 'R');
				$this->Cell(($width * .07), ($this->lineheight/72), $this->modifier_dollar($prevtotalamount), 0, 0, 'R');
				$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($prevtotal), 0, 0, 'R');
				$this->SetFont('helvetica', '', $this->fontsize);
				$this->Ln();
				$this->Ln();
			}
		}
		$this->currfields = array();
		$this->headertitles = array();
		
		$gtotal = 0;
		if (@count($baseline_totals) > 0){
			$this->SetFont('helvetica', 'B', $this->fontsize);
			$this->Cell(3, ($this->lineheight/72), 'Territory', array('B' => array('color' => array($this->linecolor))), 0, 'L');
			$this->Cell(1.5, ($this->lineheight/72), 'Total CPO', array('B' => array('color' => array($this->linecolor))), 0, 'R');
			$this->Cell(1.5, ($this->lineheight/72), 'Baseline', array('B' => array('color' => array($this->linecolor))), 0, 'R');
			$this->Cell(1.5, ($this->lineheight/72), 'Net Profit', array('B' => array('color' => array($this->linecolor))), 0, 'R');
			$this->Cell(1.5, ($this->lineheight/72), 'Profit Share', array('B' => array('color' => array($this->linecolor))), 0, 'C');
			$this->Cell(0, ($this->lineheight/72), 'Total', array('B' => array('color' => array($this->linecolor))), 1, 'R');
			$this->SetFont('helvetica', '', $this->fontsize);
			foreach ($baseline_totals as $tid => $base){
				$this->Cell(3, ($this->lineheight/72), $base['territory_name'], array('B' => array('color' => array($this->linecolor))), 0, 'L');
				$baseline = (isset($comm['baselines'][$tid])?$comm['baselines'][$tid]:0);
				$total = (($base['total'] - $baseline)*.8);
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar($base['total']), array('B' => array('color' => array($this->linecolor))), 0, 'R');
				if ($baseline == 0){
					$this->SetTextColor(255,0,0);
				}
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar($baseline), array('B' => array('color' => array($this->linecolor))), 0, 'R');
				$this->SetTextColor(0);
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar(($base['total'] - $baseline)), array('B' => array('color' => array($this->linecolor))), 0, 'R');
				$this->Cell(1.5, ($this->lineheight/72), '80%', array('B' => array('color' => array($this->linecolor))), 0, 'C');
				$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($total), array('B' => array('color' => array($this->linecolor))), 1, 'R');
				$gtotal += round($total,2);
			}
		}
		if ($ae_totals){
			$this->Cell(3, ($this->lineheight/72), 'Account Executive Overrides', array('B' => array('color' => array($this->linecolor))), 0, 'L');
			$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($ae_totals), array('B' => array('color' => array($this->linecolor))), 1, 'R');
			$gtotal += round($ae_totals,2);
		}
		$this->SetFont('helvetica', 'B', $this->fontsize);
		$this->Cell(3, ($this->lineheight/72), 'THIS CHECK: ', 0, 0, 'L');
		$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($gtotal), 0, 0, 'R');
		$this->SetFont('helvetica', '', $this->fontsize);
	}
	
	public function modifier_date($val, &$rec = array())
	{
		if (!$val){ return ''; }
		return date('m/d/Y', strtotime($val));
	}
	
	public function modifier_edition($val, &$rec = array())
	{
		return date('M Y', strtotime($val));
	}
	
	public function modifier_paycatbonus($val, &$rec = array())
	{
		return $val.($rec['bonus']?'*':'');
	}
	
	public function modifier_percent($val, &$rec = array())
	{
		return ($val * 100).'%';
	}
	
	public function modifier_dollar($val, &$rec = array())
	{
		return '$'.number_format($val, 2);
	}
}