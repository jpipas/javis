Ext.define('JavisERP.view.CommissionStatementGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commissionstatementgrid',

    title: 'Commission Statements',
    forceFit: true,
    store: {type: 'commissionstatementstore'},
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
                    resourceType: 'hide',
                    plugins: ['permission']
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
                	text: 'Territory'
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
                	text: 'AE Commission'
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
                    dock: 'bottom'
                }
        	]
        });

        me.callParent(arguments);
    }

});