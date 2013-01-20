Ext.define('JavisERP.view.ContractGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contractgrid',


    height: 200,
    itemId: 'ContractGrid',
    minHeight: 200,
    autoScroll: false,
    title: 'ContractsGrid',
    forceFit: false,
    scroll: 'vertical',
    store: 'ContractStore',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            //selModel: Ext.create('Ext.selection.CheckboxModel',{mode: 'SIMPLE'}),
            columns: [
                {
                    xtype: 'rowactions',
                    flex: 1,
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-folder-edit',
                            tooltip: 'Edit Contract',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-folder-delete',
                            tooltip: 'Delete Contract',
                            callback: Ext.emptyFn
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    flex: 2,
                    text: 'Contract No.'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    defaultWidth: 160,
                    dataIndex: 'client_name',
                    flex: 4,
                    text: 'Client Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total_sales',
                    flex: 2,
                    text: 'Total Sales Amt.'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'discount',
                    flex: 1,
                    text: 'Discount'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'subtotal',
                    flex: 2,
                    text: 'Subtotal'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total_amount',
                    flex: 2,
                    text: 'Total'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'first_months_payment',
                    flex: 2,
                    text: 'First Payment'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'monthly_payment',
                    flex: 2,
                    text: 'Monthly Payment'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_term_description',
                    flex: 3,
                    text: 'Payment Terms'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sale_date',
                    flex: 1,
                    text: 'Sale Date'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'newcontract',
                            icon: '',
                            iconCls: 'ui-silk ui-silk-table-add',
                            text: 'New Contract'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'contractPageToolBar',
                    displayInfo: true,
                    store: 'ContractStore'
                }
            ]
        });

        me.callParent(arguments);
    }

});