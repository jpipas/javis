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
		'client_company_name'	=> array('width' => .3, 'title' => 'Customer', 'modifier' => 'truncate'),
		'contract_number'		=> array('width' => .1, 'title' => 'Contract', 'align' => 'C'),
		'paytype_description'	=> array('width' => .1, 'title' => 'Pay Type', 'align' => 'C'),
		'postdate'				=> array('width' => .1, 'title' => 'TX Date', 'align' => 'C', 'modifier' => 'date'),
		'paycat_abbrev'			=> array('width' => .1, 'title' => 'Status', 'align' => 'C'),
		'amount'				=> array('width' => .1, 'title' => 'Amount', 'align' => 'R', 'modifier' => 'dollar'),
		'comm_percent'			=> array('width' => .1, 'title' => '% Applied', 'align' => 'C', 'modifier' => 'percent'),
		'cpo_amount'			=> array('width' => 0, 'title' => 'Revenue', 'align' => 'R', 'modifier' => 'dollar')
	);
	
	private $publisher_past_fields = array(
		'client_company_name'	=> array('width' => .3, 'title' => 'Customer', 'modifier' => 'truncate'),
		'contract_number'		=> array('width' => .08, 'title' => 'Contract', 'align' => 'C'),
		'paytype_description'	=> array('width' => .08, 'title' => 'Pay Type', 'align' => 'C'),
		'postdate'				=> array('width' => .09, 'title' => 'TX Date', 'align' => 'C', 'modifier' => 'date'),
		'date_string'			=> array('width' => .09, 'title' => 'Edition', 'align' => 'C', 'modifier' => 'edition'),
		'paycat_abbrev'			=> array('width' => .08, 'title' => 'Status', 'align' => 'C', 'modifier' => 'paycatbonus'),
		'amount'				=> array('width' => .08, 'title' => 'Amount', 'align' => 'R', 'modifier' => 'dollar'),
		'comm_percent'			=> array('width' => .08, 'title' => '% Applied', 'align' => 'C', 'modifier' => 'percent'),
		'cpo_amount'			=> array('width' => 0, 'title' => 'Revenue', 'align' => 'R', 'modifier' => 'dollar')
	);
	
	private $salesrep_fields = array(
		'client_company_name'	=> array('width' => .26, 'title' => 'Customer', 'modifier' => 'truncate'),
		'contract_number'		=> array('width' => .07, 'title' => 'Contract', 'align' => 'C'),
		'paytype_description'	=> array('width' => .06, 'title' => 'Pay Type', 'align' => 'C'),
		'salesrep_name'			=> array('width' => .17, 'title' => 'Account Exec', 'align' => 'C', 'modifier' => 'truncate'),
		'postdate'				=> array('width' => .08, 'title' => 'TX Date', 'align' => 'C', 'modifier' => 'date'),
		'date_string'			=> array('width' => .07, 'title' => 'Edition', 'align' => 'C', 'modifier' => 'edition'),
		'paycat_abbrev'			=> array('width' => .07, 'title' => 'Status', 'align' => 'C', 'modifier' => 'paycatbonus'),
		'amount'				=> array('width' => .07, 'title' => 'Amount', 'align' => 'R', 'modifier' => 'dollar'),
		'comm_percent'			=> array('width' => .07, 'title' => 'Comm %', 'align' => 'C', 'modifier' => 'percent'),
		'cpo_amount'			=> array('width' => 0, 'title' => 'CPO Amt', 'align' => 'R', 'modifier' => 'dollar')
	);
	
	private $personalcross_fields = array(
		'client_company_name'	=> array('width' => .26, 'title' => 'Customer', 'modifier' => 'truncate'),
		'contract_number'		=> array('width' => .07, 'title' => 'Contract', 'align' => 'C'),
		'paytype_description'	=> array('width' => .06, 'title' => 'Pay Type', 'align' => 'C'),
		'territory_name'		=> array('width' => .17, 'title' => 'Location', 'align' => 'C', 'modifier' => 'truncate'),
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
		$this->SetTitle('Best Version Media Independent Contractor Income & Expense Statement');
		
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
	
	function sortByTerritoryName($a, $b){
		return ($a['name'] < $b['name']) ? -1 : 1;
	}
	
	public function Header()
	{
		$this->SetTopMargin(1.25);
		$this->SetY($this->getHeaderMargin());
		$margins = $this->getMargins();
		if (!$this->my_templates['logo']){
			$this->my_templates['logo'] = $this->startTemplate();
				$this->SetFont('helvetica', 'B', 13);
				$this->image(dirname(__FILE__).'/'.$this->logo, 0, 0, '', .35);
				$this->SetY(.35);
				$this->Cell(0, (14/72), 'Independent Contractor Income & Expense Statement', 0, 1, 'L');
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
			$this->SetY(.5);
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
		
		// PUBLISHER SALES INTO OWN TERRITORY
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
					$this->headertitles['left'] = 'Publisher Personal Accounts - '.$territory['territory_name'];
					if ($date_string != $comm['date_string']){
						$previous = true;
						$this->currfields = $this->publisher_past_fields;
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
						foreach ($this->currfields as $key => $val){
							$this->Cell(($width * $val['width']), ($this->lineheight/72), $val['title'], array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
						}
						$this->SetFont('helvetica', '', $this->fontsize);
						$this->Ln();
					}
					$total = 0;
					$totalamount = 0;
					foreach ($territory['entries'] as $entry){
						foreach ($this->currfields as $key => $val){
							if (isset($val['modifier'])){
								$func = 'modifier_'.$val['modifier'];
								$value = $this->$func($entry[$key], $entry, $width, $val);
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
		
		// ACCOUNT EXECUTIVE OVERRIDES
		$ae_totals = array();
		if (isset($comm['entries']['salesrep'])){
			uasort($comm['entries']['salesrep'], array('\Classes\Business\PDF\CommissionStatement', 'sortByTerritoryName'));
			foreach ($comm['entries']['salesrep'] as $tid => $territory){
				krsort($territory['periods']);
				$prevtotal = 0;
				$prevtotalamount = 0;
				foreach ($territory['periods'] as $date_string => $entries){
					$cellpaddings = $this->GetCellPaddings();
					$y = $this->GetY() + ((($this->lineheight/72) * 2) + $cellpaddings['T'] + $cellpaddings['B']);
					//echo 'Y: '.$y;
					//$pagebreak = $this->checkPageBreak(, '', true);
					//echo 'Page break: '.($pagebreak?'yes':'no');
					//exit;
					
					$this->headertitles['left'] = 'Account Executive Overrides - '.$territory['name'];
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
								$value = $this->$func($entry[$key], $entry, $width, $val);
							} else {
								$value = $entry[$key];
							}
							$this->Cell(($width * $val['width']), ($this->lineheight/72), $value, array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
						}
						$total += $entry['cpo_amount'];
						$totalamount += $entry['amount'];
						$ae_totals[$tid]['territory_name'] = $entry['territory_name'];
						if (!isset($ae_totals[$tid]['total'])){ $ae_totals[$tid]['total'] = 0; }
						$ae_totals[$tid]['total'] += $entry['cpo_amount'];
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
		}
		$this->currfields = array();
		$this->headertitles = array();
		
		// CROSS-SALES INTO OTHER'S TERRITORIES
		$pcs_total = 0;
		if (isset($comm['entries']['personalcross'])){
			krsort($comm['entries']['personalcross']);
			$prevtotal = 0;
			$prevtotalamount = 0;
			foreach ($comm['entries']['personalcross'] as $date_string => $entries){
				$cellpaddings = $this->GetCellPaddings();
				$y = $this->GetY() + ((($this->lineheight/72) * 2) + $cellpaddings['T'] + $cellpaddings['B']);
				//echo 'Y: '.$y;
				//$pagebreak = $this->checkPageBreak(, '', true);
				//echo 'Page break: '.($pagebreak?'yes':'no');
				//exit;
				
				$this->headertitles['left'] = 'Personal Cross Sales';
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
					foreach ($this->personalcross_fields as $key => $val){
						$this->Cell(($width * $val['width']), ($this->lineheight/72), $val['title'], array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
					}
					$this->SetFont('helvetica', '', $this->fontsize);
					$this->Ln();
				}
				$this->currfields = $this->personalcross_fields;
				$total = 0;
				$totalamount = 0;
				foreach ($entries as $entry){
					foreach ($this->personalcross_fields as $key => $val){
						if (isset($val['modifier'])){
							$func = 'modifier_'.$val['modifier'];
							$value = $this->$func($entry[$key], $entry, $width, $val);
						} else {
							$value = $entry[$key];
						}
						$this->Cell(($width * $val['width']), ($this->lineheight/72), $value, array('B' => array('color' => array($this->linecolor))), 0, (isset($val['align'])?$val['align']:'L'));
					}
					$total += $entry['cpo_amount'];
					$totalamount += $entry['amount'];
					$pcs_total += $entry['cpo_amount'];
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
			$this->Cell(3, ($this->lineheight/72), 'Location', array('B' => array('color' => array($this->linecolor))), 0, 'L');
			$this->Cell(1.5, ($this->lineheight/72), 'Total Revenue', array('B' => array('color' => array($this->linecolor))), 0, 'C');
			$this->Cell(1.5, ($this->lineheight/72), 'Baseline Expense', array('B' => array('color' => array($this->linecolor))), 0, 'C');
			$this->Cell(1.5, ($this->lineheight/72), 'Gross Profit', array('B' => array('color' => array($this->linecolor))), 0, 'C');
			$this->Cell(1.5, ($this->lineheight/72), 'BVM Charge', array('B' => array('color' => array($this->linecolor))), 0, 'C');
			$this->Cell(0, ($this->lineheight/72), 'Net Income', array('B' => array('color' => array($this->linecolor))), 1, 'R');
			$this->SetFont('helvetica', '', $this->fontsize);
			foreach ($baseline_totals as $tid => $base){
				$this->Cell(3, ($this->lineheight/72), $this->_truncate('Publisher Personal Accounts - '.$base['territory_name'], 3), array('B' => array('color' => array($this->linecolor))), 0, 'L');
				$baseline = (isset($comm['baselines'][$tid])?$comm['baselines'][$tid]:0);
				$total = (($base['total'] - $baseline)* $comm['profitshare']);
				$profitshare = $base['total'] - $baseline - $total;
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar($base['total']), array('B' => array('color' => array($this->linecolor))), 0, 'C');
				if ($baseline == 0){
					$this->SetTextColor(255,0,0);
				}
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar($baseline), array('B' => array('color' => array($this->linecolor))), 0, 'C');
				$this->SetTextColor(0);
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar(($base['total'] - $baseline)), array('B' => array('color' => array($this->linecolor))), 0, 'C');
				$this->Cell(1.5, ($this->lineheight/72), $this->modifier_dollar($profitshare), array('B' => array('color' => array($this->linecolor))), 0, 'C');
				//($comm['profitshare'] * 100).'%'
				$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($total), array('B' => array('color' => array($this->linecolor))), 1, 'R');
				$gtotal += round($total,2);
			}
		}
		if ($ae_totals){
			foreach ($ae_totals as $tid => $ae){
				$this->Cell(3, ($this->lineheight/72), 'Account Executive Overrides - '.$ae['territory_name'], array('B' => array('color' => array($this->linecolor))), 0, 'L');
				$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($ae['total']), array('B' => array('color' => array($this->linecolor))), 1, 'R');
				$gtotal += round($ae['total'],2);
			}
		}
		if ($pcs_total > 0){
			$this->Cell(3, ($this->lineheight/72), 'Personal Cross Sales', array('B' => array('color' => array($this->linecolor))), 0, 'L');
			$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($pcs_total), array('B' => array('color' => array($this->linecolor))), 1, 'R');
			$gtotal += round($pcs_total,2);
		}
		$this->SetFont('helvetica', 'B', $this->fontsize);
		$this->Cell(3, ($this->lineheight/72), 'THIS CHECK: ', 0, 0, 'L');
		$this->Cell(0, ($this->lineheight/72), $this->modifier_dollar($gtotal), 0, 0, 'R');
		$this->SetFont('helvetica', '', $this->fontsize);
		$this->Ln();
		$this->Ln();
		$this->SetFont('helvetica', 'B', $this->fontsize);
		$this->Write(($this->lineheight/72), 'Abbreviations: ');
		$this->SetFont('helvetica', '', $this->fontsize);
		$this->Write(($this->lineheight/72), 'UNC = Uncollected   POT = Paid On Time   POT* = Paid On Time Bonus Qualifier    PDO = Paid on Overdue   PIA = Paid in Advance');
	}
	
	public function modifier_date($val, &$rec = array(), $pagewidth = 0, $cell = array())
	{
		if (!$val){ return ''; }
		return date('m/d/Y', strtotime($val));
	}
	
	public function modifier_edition($val, &$rec = array(), $pagewidth = 0, $cell = array())
	{
		return date('M Y', strtotime($val));
	}
	
	public function modifier_paycatbonus($val, &$rec = array(), $pagewidth = 0, $cell = array())
	{
		return $val.($rec['bonus']?'*':'');
	}
	
	public function modifier_percent($val, &$rec = array(), $pagewidth = 0, $cell = array())
	{
		return ($val * 100).'%';
	}
	
	public function modifier_truncate($val, &$rec = array(), $pagewidth = 0, $cell = array())
	{
		return $this->_truncate($val, ($pagewidth * $cell['width']));
	}
	
	public function _truncate($val, $width)
	{
		$istrimmed = false;
		while ($this->GetStringWidth($val) > $width){
			$val = substr($val,0,-1);
			$istrimmed = true;
		}
		if ($istrimmed){ $val = substr($val,0,-3); $val .= '...'; }
		return $val;
	}
	
	public function modifier_dollar($val, &$rec = array())
	{
		return '$'.number_format($val, 2);
	}
}