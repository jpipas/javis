Ext.define('JavisERP.view.ReportContractMetricsTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.reportcontractmetricstree',

    height: 200,
    itemId: 'ReportContractMetricsTree',
    minHeight: 200,
    autoScroll: false,
    title: 'Contract Metrics',
    forceFit: false,
    scroll: 'vertical',
    rootVisible: false,
    rowLines: true,
    store: 'ReportContractMetricsStore',
    emptyText : 'Please select a month/year',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
	                xtype: 'treecolumn', //this is so we know which column will show the tree
	                text: 'Region',
	                flex: 3,
	                dataIndex: 'text'
	            },
				{
	                text: 'Subtotal',
	                flex: 2,
	                dataIndex: 'subtotal',
	                renderer: 'usMoney'
	            },
	            {
	                text: 'Monthly',
	                flex: 2,
	                dataIndex: 'monthly_payment',
	                renderer: 'usMoney'
	            },
	            {
	                text: 'Design Fee',
	                flex: 2,
	                dataIndex: 'design_fee',
	                renderer: 'usMoney'
	            },
	            {
	                text: 'Total Contracts',
	                flex: 2,
	                dataIndex: 'total_contracts'
	            },
	            {
	                text: 'Design',
	                flex: 2,
	                dataIndex: 'design_contracts'
	            },
	            {
	            	text: 'Avg. Duration',
	            	flex: 2,
	            	dataIndex: 'avg_duration'
	            },
	            {
	            	text: '# by Duration',
	            	columns: [
	            		{
	            			text: '1-11',
	            			dataIndex: 'duration_1',
	            			flex: 1
	            		},
	            		{
	            			text: '12-23',
	            			dataIndex: 'duration_2',
	            			flex: 1
	            		},
	            		{
	            			text: '24-35',
	            			dataIndex: 'duration_3',
	            			flex: 1
	            		},
	            		{
	            			text: '36+',
	            			dataIndex: 'duration_4',
	            			flex: 1
	            		}
	            	]
	            },
	            {
	            	text: 'Avg. Disc',
	            	flex: 2,
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
	            	text: 'Avg. Discount by Duration',
	            	columns: [
	            		{
	            			text: '1-11',
	            			dataIndex: 'avg_discount_1',
	            			flex: 1,
			            	renderer: function(value, md, rec){
			            		if (rec.data.revenue_affecting == 1 || !rec.data.leaf){
			            			return Math.round(100 * (100 * value))/100 + '%';
			            		} else {
			            			return 'N/A';
			            		}
			            	}
	            		},
	            		{
	            			text: '12-23',
	            			dataIndex: 'avg_discount_2',
	            			flex: 1,
			            	renderer: function(value, md, rec){
			            		if (rec.data.revenue_affecting == 1 || !rec.data.leaf){
			            			return Math.round(100 * (100 * value))/100 + '%';
			            		} else {
			            			return 'N/A';
			            		}
			            	}
	            		},
	            		{
	            			text: '24-35',
	            			dataIndex: 'avg_discount_3',
	            			flex: 1,
			            	renderer: function(value, md, rec){
			            		if (rec.data.revenue_affecting == 1 || !rec.data.leaf){
			            			return Math.round(100 * (100 * value))/100 + '%';
			            		} else {
			            			return 'N/A';
			            		}
			            	}
	            		},
	            		{
	            			text: '36+',
	            			dataIndex: 'avg_discount_4',
	            			flex: 1,
			            	renderer: function(value, md, rec){
			            		if (rec.data.revenue_affecting == 1 || !rec.data.leaf){
			            			return Math.round(100 * (100 * value))/100 + '%';
			            		} else {
			            			return 'N/A';
			            		}
			            	}
	            		}
	            	]
	            },
	            {
	            	text: '# CC',
	            	flex: 1,
	            	dataIndex: 'paytype_cc'
	            },
	            {
	            	text: '# Chk',
	            	flex: 1,
	            	dataIndex: 'paytype_ck'
	            },
	            {
	            	text: '# ACH',
	            	flex: 1,
	            	dataIndex: 'paytype_ach'
	            },
	            {
	            	text: '# Trade',
	            	flex: 1,
	            	dataIndex: 'paytype_trade'
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
                            fieldLabel: 'Contracts Sold During',
                            labelAlign: 'right',
                            labelWidth: 115,
                            emptyText: 'Select Month/Year',
                            store: {type: 'durationstore' },
                            itemId: 'duration',
                            name: 'duration_id',
                            allowBlank: false
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-application-go',
                            itemId: 'submitbutton',
                            text: 'View Report'
                        }/*,
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-page-white-excel',
                            itemId: 'exportbutton',
                            text: 'Export'
                        }*/
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});