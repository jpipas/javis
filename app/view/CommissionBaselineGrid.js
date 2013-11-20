Ext.define('JavisERP.view.CommissionBaselineGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commissionbaselinegrid',
    height: 200,
    itemId: 'CommissionBaselineGrid',
    minHeight: 200,
    autoScroll: false,
    title: 'Revenue Baselines',
    forceFit: false,
    scroll: 'vertical',
    store: {type: 'commissionbaselinestore'},
    emptyText : 'Please select an active period to modify baselines',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'duration_description',
                    flex: 1,
                    text: 'Edition'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 2,
                    text: 'Location'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'manager_fullname',
                    flex: 2,
                    text: 'Publisher'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'publication_description',
                    flex: 2,
                    text: 'Publication'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pages',
                    flex: 1,
                    itemId: 'baseline_pages',
                    text: 'Pages',
                    editor: {
                    	xtype: 'numberfield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'baseline',
                    flex: 1,
                    itemId: 'baseline_baseline',
                    text: 'Baseline',
                    renderer: 'usMoney',
                    editor: {
                    	xtype: 'numberfield'
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
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'combobox',
                            displayField: 'text',
                            valueField: 'id',
                            width: 300,
                            emptyText: 'Period',
                            store: {type: 'commissionperiodstore'},
                            editable: false,
                            name: 'period_id',
                            itemId: 'commissionperiod',
                            listConfig: {
                            	itemTpl : '{duration_description} Edition - Payments due by {cutoff_date:date("m/d/Y")}'
							},
							labelTpl: '{duration_description} Edition - Payments due by {cutoff_date:date("m/d/Y")}',
                            listeners: {
                            	afterrender: {
                            		fn : function(){
                            			this.store.proxy.url = '/commission/period/current';
                            			this.store.reload();
                            		}
                            	}
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-application-go',
                            itemId: 'commission_baseline_get',
                            text: 'View/Edit Baselines'
                        },
                        {
            				xtype: 'tbspacer',
            				flex: 1
                		},
		                {
		                    xtype: 'gridsearchingbar',
		                    inputWidth: 200,
		                    grid: this,
		                    border: 0,
		                    showSelectAll: true,
		                    menuIconCls: 'ui-silk ui-silk-magnifier',
		                    disableIndexes: ['duration_description'],
            				items: ['->']
		                }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'commissionBaselinePageToolBar',
                    displayInfo: true,
                    store: 'CommissionBaselineStore'
                }
            ]
        });

        me.callParent(arguments);
    }

});