Ext.define('JavisERP.view.ContractGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contractgrid',

    title: 'Contracts',
    forceFit: true,
    store: 'ContractStore',
    itemId: 'ContractGrid',
    scroll: 'vertical',
    
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
        	'<table width="100%" border="0" cellpadding="4" cellspacing="4"><tr>',
        	'<td valign="top" width="50%">',
            '<b>Duration(s):</b><br>{durations}',
            '</td><td valign="top" width="50%">',
            '<b>Advertisement(s):</b><br>',
            '<tpl for="advertisements">',
            	'<div>{publication_names} - {ad_type_description} - {ad_size_description}</div>',
            '</tpl>',
            '</td>',
            '</tr>',
            '<tr><td colspan="2" valign="top"><strong>Notes:</strong> {notes}</td></tr></table>'
        )
        
    }],
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
				getRowClass: function(record, rowIndex, rowParams, store){
					if (record.data.cancelled_at != null){
						return 'contractCancelled';
					}
				}
            },
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Contract',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-folder',
	                itemId: 'contract_edit'
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Contract',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-folder-delete',
	                itemId: 'contract_delete',
                    resourceId: 'contract_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
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
                    flex: 2,
                    dataIndex: 'soldby_name',
                    text: 'Sold By'
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
                            text: 'New Contract',
		                    resourceId: 'contract_create',
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
                    itemId: 'contractPageToolBar',
                    displayInfo: true,
                    store: 'ContractStore'
                }
            ]
        });

        me.callParent(arguments);
    }

});