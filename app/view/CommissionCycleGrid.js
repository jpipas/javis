Ext.define('JavisERP.view.CommissionCycleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commissioncyclegrid',

    title: 'Revenue Cycles',
    forceFit: true,
    store: {type: 'commissioncyclestore'},
    itemId: 'commissioncyclegrid',
    scroll: 'vertical',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'newcommissioncycle',
                            iconCls: 'ui-silk ui-silk-add',
                            text: 'New Cycle'
                        }
                    ]
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Cycle',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-pencil',
	                itemId: 'commissioncycle_edit'
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Cycle',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-delete',
	                itemId: 'commissioncycle_delete'
	            },
                {
                	flex: 3,
                    xtype: 'gridcolumn',
                    dataIndex: 'title',
                    text: 'Title'
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'paymentcutoffday',
                    text: 'Payment Cutoff Day'
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'applyperiodmonths',
                    text: 'Apply Ahead Months'
                }
            ]
        });

        me.callParent(arguments);
    }

});