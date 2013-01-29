Ext.define('JavisERP.view.PaymentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paymentgrid',

    autoScroll: true,
    bodyBorder: false,
    title: 'Payments',
    titleCollapse: true,
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
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'actioncolumn',
                    items: [
                        {

                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'Id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'client_name',
                    text: 'Client'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'contract_id',
                    text: 'Contract Id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'type',
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_type_id',
                    text: 'Payment Type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_category',
                    text: 'Classification'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_amount',
                    text: 'Total Amount'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'created_at',
                    text: 'Created On'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'updated_at',
                    text: 'Updated_at'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'insert_user_id',
                    text: 'Insert_user_id'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'update_user_id',
                    text: 'Update_user_id'
                }
            ]
        });

        me.callParent(arguments);
    }

});