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
                    dataIndex: 'contract_number',
                    flex: 2,
                    text: 'Contract No.'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    defaultWidth: 160,
                    dataIndex: 'client_name',
                    flex: 3,
                    text: 'Client Name'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'territory_name',
                    text: 'Territory'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total_sales',
                    renderer: 'usMoney',
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
                    renderer: 'usMoney',
                    flex: 2,
                    text: 'Subtotal'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total_amount',
                    renderer: 'usMoney',
                    flex: 2,
                    text: 'Total'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'first_months_payment',
                    renderer: 'usMoney',
                    flex: 2,
                    text: 'First Payment'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'monthly_payment',
                    renderer: 'usMoney',
                    flex: 2,
                    text: 'Monthly Payment'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_term_description',
                    flex: 2,
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
                            cls: 'newcontract',
                            iconCls: 'ui-silk ui-silk-table-add',
                            text: 'New Contract'
                        }
                    ]
                },
                {
                    xtype: 'gridsearchingbar',
                    inputWidth: 200,
                    grid: this,
                    showSelectAll: true,
                    menuIconCls: 'ui-silk ui-silk-magnifier',
                    disableIndexes: ['id'],
                    items: ['->']
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