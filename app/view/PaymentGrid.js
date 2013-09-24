Ext.define('JavisERP.view.PaymentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paymentgrid',

    scroll: 'vertical',
    title: 'Payments',
    itemId: 'PaymentGird',
    store: 'PaymentStore',
    forceFit: true,
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
                            cls: 'newPaymentButton',
                            itemId: 'newPaymentButton',
                            iconCls: 'ui-silk ui-silk-money-add',
                            text: 'New Payment',
		                    resourceId: 'payment_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        },
                        {
		                    xtype: 'gridsearchingbar',
		                    inputWidth: 200,
		                    grid: this,
		                    border: 0,
		                    showSelectAll: true,
		                    menuIconCls: 'ui-silk ui-silk-magnifier',
		                    disableIndexes: ['id'],
		                    items: ['->']
		                }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'paymentPageToolBar',
                    displayInfo: true,
                    store: 'PaymentStore'
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Payment',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-money',
	                itemId: 'payment_edit',
                    resourceId: 'payment_edit',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Payment',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-money-delete',
	                itemId: 'payment_delete',
                    resourceId: 'payment_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
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
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    text: 'Territory'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_type_description',
                    text: 'Payment Type'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_amount',
                    renderer: 'usMoney',
                    text: 'Period Amount'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_total',
                    renderer: 'usMoney',
                    text: 'Payment Total'
                },
                {
                	flex: 1,
                    xtype: 'datecolumn',
                    dataIndex: 'postdate',
                    text: 'Received',
                    format: 'm/d/Y'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'durations',
                    text: 'Applied To'
                },
                {
                	flex: 1,
                    xtype: 'datecolumn',
                    dataIndex: 'created_at',
                    text: 'Created On',
                    format: 'm/d/Y g:ia'
                }
            ]
        });

        me.callParent(arguments);
    }

});