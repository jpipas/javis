Ext.define('JavisERP.view.CommissionStatementGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commissionstatementgrid',

    title: 'Baseline Revenue Statements',
    forceFit: true,
    store: 'CommissionStatementStore',
    itemId: 'commissionstatementgrid',
    scroll: 'vertical',
    selType: 'checkboxmodel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'View Statement',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-page-white-acrobat',
	                itemId: 'commissionstatement_view',
                    resourceId: 'commission_statement',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
	            {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Entries',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-pencil',
	                itemId: 'commissionstatement_view_entries',
                    hidden: true
	            },
	            {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Reset Commission Statement',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-database-error',
	                itemId: 'commissionstatement_reset',
                    hidden: true
	            },
	            {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'ID'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date_string',
                    text: 'Period',
                    format: 'm/d/Y'
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'fullname',
                    text: 'Publisher/AE'
                },
                {
                	flex: 2,
                	xtype: 'gridcolumn',
                	dataIndex: 'territories',
                	text: 'Location(s)'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	renderer: 'usMoney',
                	dataIndex: 'amount_publisher',
                	text: 'Total CPO'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	renderer: 'usMoney',
                	dataIndex: 'amount_salesrep',
                	text: 'Cross Sales'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	renderer: 'usMoney',
                	dataIndex: 'amount_sellinto',
                	text: 'AE Commission'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	renderer: 'usMoney',
                	dataIndex: 'baselines',
                	text: 'Baselines'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	dataIndex: 'check_total',
                	text: 'Check',
                	renderer: 'usMoney'/*,
                	renderer: function(value, metaData, record){
                		if (record.baselines <= 0){
                			return '<span style="color:#cc0000">'+value+'</span>';
                		}
                		return value;
                	}*/
                }
            ],
            dockedItems: [
            	{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
	                    {
		                    xtype: 'gridsearchingbar',
		                    inputWidth: 200,
		                    grid: this,
		                    border: 0,
		                    showSelectAll: true,
		                    menuIconCls: 'ui-silk ui-silk-magnifier',
		                    items: ['->']
		                },
		                {
	        				xtype: 'tbspacer',
	        				flex: 1
	            		},
	            		{
	                        xtype: 'button',
	                        itemId: 'commissionstatement_printselected',
	                        iconCls: 'ui-silk ui-silk-page-white-acrobat',
	                        tooltip: 'View Selected',
	                        text: 'View Selected',
	                        disabled: true
	                    }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: 'CommissionStatementStore'
                }
        	]
        });

        me.callParent(arguments);
    }

});