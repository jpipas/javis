Ext.define('JavisERP.view.ClientGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientgrid',

    height: 250,
    itemId: 'clientgrid',
    width: 868,
    autoScroll: true,
    title: 'Clients',
    columnLines: true,
    forceFit: true,
    store: 'ClientStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'View Client',
	                align: 'center',
	                iconCls: 'view_action ui-silk ui-silk-user',
	                itemId: 'client_view',
                    resourceId: 'client_view',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Client',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-user-delete',
	                itemId: 'client_delete',
                    resourceId: 'client_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'numbercolumn',
                    hidden: true,
                    dataIndex: 'id',
                    flex: 1,
                    text: 'ID',
                    format: '0'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'company_name',
                    flex: 3,
                    text: 'Business Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'stage',
                    flex: 1,
                    text: 'Stage',
                    filter: {
                        type: 'list',
                        options: ['CUSTOMER','PROSPECT','LEAD']
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'salesrep_name',
                    flex: 3,
                    text: 'Sales Rep'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'address1',
                    flex: 3,
                    text: 'Address'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'address2',
                    flex: 1,
                    text: 'Address Line 2'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'city',
                    flex: 1,
                    text: 'City'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'state_name',
                    flex: 1,
                    text: 'State'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'postal_code_iso',
                    flex: 1,
                    text: 'Zip'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 1,
                    text: 'Territory'
                }
            ],
            viewConfig: {
                itemId: 'ClientGridView'
            },
            listeners: {
                beforeshow: {
                    fn: me.onClientgridBeforeShow,
                    scope: me
                }
            },
            dockedItems: [
            	{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                         {
		                    xtype: 'button',
		                    itemId: 'newClientButton',
		                    iconCls: 'ui-silk ui-silk-user-add',
		                    text: 'New Client',
		                    resourceId: 'client_create',
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
                    itemId: 'ClientPagingToolbar',
                    displayInfo: true,
                    store: 'ClientStore'
                }
            ],
            tools: [
                {
                    xtype: 'tool',
                    itemId: 'printTool',
                    type: 'print'
                }
            ]
        });

        me.callParent(arguments);
    },

    onClientgridBeforeShow: function(abstractcomponent, options) {
        abstractcomponent.getStore().load();
    }

});