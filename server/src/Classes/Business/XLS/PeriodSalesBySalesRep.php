<?php

namespace Classes\Business\XLS;

use PHPExcel;

class PeriodSalesBySalesRep extends PHPExcel\Workbook {
	public function generateSpreadsheet($duration, $result)
	{
		$this->getActiveSheet()->setTitle('Sales Rep Sales - '.$duration['description']);
		$row = 1;
		$col = 0;
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Sales Rep');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Location');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Client');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Contract #');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Subtotal');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Monthly');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Design Fee');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Total Contracts');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Active');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Inactive');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Design');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Avg. Discount');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Avg. Duration');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, '# CC');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, '# Chk');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, '# ACH');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, '# Trade');
		
		for ($i = 0; $i < 17; $i++){
			$this->getActiveSheet()->getStyleByColumnAndRow($i, $row)->getFont()->setBold(true);
		}
		
		$row++;
		foreach ($result as $r){
			$col = 0;
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['soldby_name']);
			$col += 3;
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['subtotal']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['monthly_payment']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['design_fee']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['total_contracts']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['active_contracts']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['inactive_contracts']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['design_contracts']);
			
			$this->getActiveSheet()->getStyleByColumnAndRow(4, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
			$this->getActiveSheet()->getStyleByColumnAndRow(5, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
			$this->getActiveSheet()->getStyleByColumnAndRow(6, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
			
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['avg_discount']);
			$this->getActiveSheet()->getStyleByColumnAndRow(($col - 1), $row)->getNumberFormat()->setFormatCode('0.00%');
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['avg_duration']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['avg_cc']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['avg_ck']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['avg_ach']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['avg_trade']);
			$row++;
			foreach ($r['contracts'] as $c){
				$col = 1;
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['territory_name']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['company_name']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['contract_number']);
				$this->getActiveSheet()->getStyleByColumnAndRow(($col - 1), $row)->getAlignment()->setHorizontal('left');
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['subtotal']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['monthly_payment']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['design_fee']);
				$this->getActiveSheet()->getStyleByColumnAndRow(4, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
				$this->getActiveSheet()->getStyleByColumnAndRow(5, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
				$this->getActiveSheet()->getStyleByColumnAndRow(6, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
				
				$col += 4;
				if ($c['revenue_affecting']){
					$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['avg_discount']);
					$this->getActiveSheet()->getStyleByColumnAndRow(($col - 1), $row)->getNumberFormat()->setFormatCode('0.00%');
				} else {
					$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'N/A');
				}
				$this->getActiveSheet()->getStyleByColumnAndRow(($col - 1), $row)->getNumberFormat()->setFormatCode('0.00%');
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['avg_duration']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, (isset($c['avg_cc'])?$c['avg_cc']:''));
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, (isset($c['avg_ck'])?$c['avg_ck']:''));
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, (isset($c['avg_ach'])?$c['avg_ach']:''));
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, (isset($c['avg_trade'])?$c['avg_trade']:''));
				
				$this->getActiveSheet()->getRowDimension($row)->setOutlineLevel(1);
				$this->getActiveSheet()->getRowDimension($row)->setCollapsed(true);
				$this->getActiveSheet()->getRowDimension($row)->setVisible(false);
				$row++;
			}
		}
		
		for ($i = 0; $i < 17; $i++){
			$this->getActiveSheet()->getColumnDimensionByColumn($i)->setAutoSize(true);
		}
		$this->getActiveSheet()->setShowSummaryBelow(false);
	}
}