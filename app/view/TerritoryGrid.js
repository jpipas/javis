Ext.define('JavisERP.view.TerritoryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.territorygrid',

    itemId: 'territorygrid',
    autoScroll: true,
    title: 'Locations',
    forceFit: true,
    store: 'TerritoryStore',
    columnLines: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                itemId: 'TerritoryGridView',
                maintainFlex: true
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
	                    {
	                        xtype: 'button',
	                        iconCls: 'ui-silk ui-silk-map-add',
	                        itemId: 'newterritory',
	                        text: 'New Location',
		                    resourceId: 'territory_create',
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
                    itemId: 'TerritoryPagingToolbar',
                    displayInfo: true,
                    store: 'TerritoryStore'
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Location',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-map-edit',
	                itemId: 'territory_edit',
                    resourceId: 'territory_edit',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Location',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-map-delete',
	                itemId: 'territory_delete',
                    resourceId: 'territory_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'id',
                    hidden: true,
                    text: 'ID',
                    format: '0'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'state_name',
                    text: 'State'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'manager_name',
                    text: 'Publisher'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'region_title',
                    text: 'Region'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    dataIndex: 'cycle_title',
                    text: 'Revenue Cycle'
                }
            ]
        });

        me.callParent(arguments);
    }
});