Ext.define('JavisERP.view.ReportPeriodSalesByTerritoryTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.reportperiodsalesbyterritorytree',

    height: 200,
    itemId: 'ReportPeriodSalesByTerritoryTree',
    minHeight: 200,
    autoScroll: false,
    title: 'Period Sales by Location',
    forceFit: false,
    scroll: 'vertical',
    rootVisible: false,
    rowLines: true,
    store: 'ReportPeriodSalesByTerritoryStore',
    emptyText : 'Please select a month/year',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
	                xtype: 'treecolumn', //this is so we know which column will show the tree
	                text: 'Market',
	                flex: 2,
	                dataIndex: 'text'
	            },
	            {
	                text: 'Publisher/Sales Rep',
	                flex: 2,
	                dataIndex: 'manager_name'
	            },
	            {
	                text: 'Client',
	                flex: 2,
	                dataIndex: 'company_name'
	            },
				{
	                text: 'Subtotal',
	                flex: 1,
	                dataIndex: 'subtotal',
	                renderer: 'usMoney'
	            },
	            {
	                text: 'Monthly',
	                flex: 1,
	                dataIndex: 'monthly_payment',
	                renderer: 'usMoney'
	            },
	            {
	                text: 'Design Fee',
	                flex: 1,
	                dataIndex: 'design_fee',
	                renderer: 'usMoney'
	            },
	            {
	                text: 'Total Contracts',
	                flex: 1,
	                dataIndex: 'total_contracts'
	            },
	            {
	                text: 'Active',
	                flex: 1,
	                dataIndex: 'active_contracts'
	            },
	            {
	                text: 'Inactive',
	                flex: 1,
	                dataIndex: 'inactive_contracts'
	            },
	            {
	                text: 'Design',
	                flex: 1,
	                dataIndex: 'design_contracts'
	            },
	            {
	            	text: 'Avg. Disc',
	            	flex: 1,
	            	dataIndex: 'avg_discount',
	            	renderer: function(value, md, rec){
	            		if (rec.data.revenue_affecting == 1 || !rec.data.leaf){
	            			return Math.round(100 * (100 * value))/100 + '%';
	            		} else {
	            			return 'N/A';
	            		}
	            	}
	            },
	            {
	            	text: 'Avg. Duration',
	            	flex: 1,
	            	dataIndex: 'avg_duration'
	            },
	            {
	            	text: '# CC',
	            	flex: 1,
	            	dataIndex: 'avg_cc'
	            },
	            {
	            	text: '# Chk',
	            	flex: 1,
	            	dataIndex: 'avg_ck'
	            },
	            {
	            	text: '# ACH',
	            	flex: 1,
	            	dataIndex: 'avg_ach'
	            },
	            {
	            	text: '# Trade',
	            	flex: 1,
	            	dataIndex: 'avg_trade'
	            }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    	{
                            xtype: 'combobox',
                            displayField: 'description',
                            valueField: 'id',
                            fieldLabel: 'Period',
                            labelAlign: 'right',
                            labelWidth: 45,
                            emptyText: 'Select Month/Year',
                            store: {type: 'durationstore' },
                            itemId: 'duration',
                            name: 'duration_id',
                            allowBlank: false
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'id',
                            emptyText: 'All Locations',
                            fieldLabel: 'Location',
                            labelAlign: 'right',
                            labelWidth: 45,
                        	store: { type: 'territorystore' },
                            name: 'territory_id',
                            itemId: 'territory'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-application-go',
                            itemId: 'submitbutton',
                            text: 'View Sales'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-page-white-excel',
                            itemId: 'exportbutton',
                            text: 'Export'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});