Ext.define('JavisERP.view.CommissionEntryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commissionentrygrid',

    title: 'Commission Entries',
    forceFit: true,
    store: 'CommissionEntryStore',
    itemId: 'commissionentrygrid',
    scroll: 'vertical',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
            	{
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'ID'
                },
            	{
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'client_company_name',
                    text: 'Client'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'contract_number',
                    text: 'Contract'
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    text: 'Territory'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	renderer: 'usMoney',
                	dataIndex: 'amount',
                	text: 'Amount'
                },
                {
                	flex: 1,
                	xtype: 'datecolumn',
                    format: 'm/d/Y',
                    dataIndex: 'postdate',
                    text: 'Posted'
                },
                {
                	flex: 1,
                	xtype: 'datecolumn',
                    format: 'M Y',
                    dataIndex: 'date_string',
                    text: 'Edition'
                },
                {
                	flex: 2,
                	xtype: 'gridcolumn',
                	dataIndex: 'publisher_fullname',
                	text: 'Publisher'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	dataIndex: 'publisher_comm',
                	text: 'Pub. Comm.',
                	itemId: 'commissionentry_publisher_comm',
                	editor: {
                    	xtype: 'numberfield',
                    	decimalPrecision: 2,
                    	maxValue: 1,
                    	minValue: 0,
                    	step: .1
                    }
                },
                {
                	flex: 2,
                	xtype: 'gridcolumn',
                	dataIndex: 'salesrep_fullname',
                	text: 'Account Exec.',
                	editor: {
                		xtype: 'combobox',
                        name: 'salesrep_id',
                        displayField: 'fullname',
                        store: {type: 'userstore'},
                        hideTrigger: true,
                        triggerAction: 'query',
                        pageSize: true,
                        minChars: 3,
                        valueField: 'id'	
                	}
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	dataIndex: 'salesrep_comm',
                	text: 'AE Comm.',
                	itemId: 'commissionentry_salesrep_comm',
                	editor: {
                    	xtype: 'numberfield',
                    	decimalPrecision: 2,
                    	maxValue: 1,
                    	minValue: 0,
                    	step: .1
                    }
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	dataIndex: 'paycat_abbrev',
                	text: 'Status'
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	dataIndex: 'bonus',
                	text: 'Bonus',
                	renderer: function(value){
                		if (value == 1){
                			return 'Yes';
                		}
                		return '';
                	}
                },
                {
                	flex: 1,
                	xtype: 'gridcolumn',
                	dataIndex: 'manually_adjusted',
                	text: 'Man. Adj.',
                	renderer: function(value){
                		if (value){
                			return 'Yes';
                		}
                		return '';
                	}
                }
            ],
            selModel: {
	            selType: 'cellmodel'
	        },
	        plugins: [
	        	Ext.create('Ext.grid.plugin.CellEditing', {
            		clicksToEdit: 1
        		})
	        ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: 'CommissionEntryStore'
                }
        	]
        });

        me.callParent(arguments);
    }

});