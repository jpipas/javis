<?php

namespace Classes\Business\XLS;

use PHPExcel;

class PeriodSalesByTerritory extends PHPExcel\Workbook {
	public function generateSpreadsheet($duration, $result)
	{
		$this->getActiveSheet()->setTitle('Territory Sales');
		$row = 1;
		$col = 0;
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Territory');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Publisher/Sales Rep');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Client');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Contract #');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Subtotal');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Monthly');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Design Fee');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Total Contracts');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Active');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Inactive');
		$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, 'Design');
		
		for ($i = 0; $i < 9; $i++){
			$this->getActiveSheet()->getStyleByColumnAndRow($i, $row)->getFont()->setBold(true);
		}
		
		$row++;
		foreach ($result as $r){
			$col = 0;
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['territory_name']);
			$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $r['publisher_name']);
			$col += 2;
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
			$row++;
			foreach ($r['contracts'] as $c){
				$col = 1;
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['salesrep_name']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['company_name']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['contract_number']);
				$this->getActiveSheet()->getStyleByColumnAndRow(($col - 1), $row)->getAlignment()->setHorizontal('left');
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['subtotal']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['monthly_payment']);
				$this->getActiveSheet()->setCellValueByColumnAndRow($col++, $row, $c['design_fee']);
				$this->getActiveSheet()->getStyleByColumnAndRow(4, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
				$this->getActiveSheet()->getStyleByColumnAndRow(5, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
				$this->getActiveSheet()->getStyleByColumnAndRow(6, $row)->getNumberFormat()->setFormatCode('$#,##0.00');
				$this->getActiveSheet()->getRowDimension($row)->setOutlineLevel(1);
				$this->getActiveSheet()->getRowDimension($row)->setCollapsed(true);
				$this->getActiveSheet()->getRowDimension($row)->setVisible(false);
				$row++;
			}
		}
		
		for ($i = 0; $i < 9; $i++){
			$this->getActiveSheet()->getColumnDimensionByColumn($i)->setAutoSize(true);
		}
		$this->getActiveSheet()->setShowSummaryBelow(false);
	}
}