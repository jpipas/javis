Ext.define('JavisERP.view.ContractGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contractgrid',

    title: 'Contracts',
    forceFit: true,
    store: 'ContractStore',
    itemId: 'ContractGrid',
    scroll: 'vertical',    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'rowactions',
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
                    flex: 1,
                    text: 'Contract No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'clientcolumn',
                    dataIndex: 'client_company_name',
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
                    flex: 1,
                    text: 'Total Amt.'
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
                    flex: 1,
                    text: 'Subtotal'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total_amount',
                    renderer: 'usMoney',
                    flex: 1,
                    text: 'Total'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'first_months_payment',
                    renderer: 'usMoney',
                    flex: 1,
                    text: 'First'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'monthly_payment',
                    renderer: 'usMoney',
                    flex: 1,
                    text: 'Monthly'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'payment_term_description',
                    flex: 1,
                    text: 'Terms'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'sale_date',
                    flex: 1,
                    text: 'Sale Date',
                    format: 'm/d/Y'
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
                    itemId: 'contractPageToolBar',
                    displayInfo: true,
                    store: 'ContractStore'
                }
            ]
        });

        me.callParent(arguments);
    }

});