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
                            text: 'New Payment'
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
                    xtype: 'rowactions',
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-money',
                            tooltip: 'Edit Payment',
                            hideIndex: 'edit_action',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-money-delete',
                            tooltip: 'Delete Payment',
                            hideIndex: 'delete_action',
                            callback: Ext.emptyFn
                        }
                    ]
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
                    dataIndex: 'payment_type_description',
                    text: 'Payment Type'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_category_description',
                    text: 'Classification'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_amount',
                    renderer: 'usMoney',
                    text: 'Total Amount'
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