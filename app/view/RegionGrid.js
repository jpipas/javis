Ext.define('JavisERP.view.RegionGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.regiongrid',

    itemId: 'regiongrid',
    autoScroll: true,
    title: 'Regions',
    forceFit: true,
    store: 'RegionStore',
    columnLines: true,

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
	                        iconCls: 'ui-silk ui-silk-world-add',
	                        itemId: 'newregion',
	                        text: 'New Region',
		                    resourceId: 'region_create',
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
                    itemId: 'RegionPagingToolbar',
                    displayInfo: true,
                    store: 'RegionStore'
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Region',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-world-edit',
	                itemId: 'region_edit',
                    resourceId: 'region_edit',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Region',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-world-delete',
	                itemId: 'region_delete',
                    resourceId: 'region_delete',
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
                    dataIndex: 'title',
                    text: 'Title'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'manager_name',
                    text: 'Regional Manager'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    dataIndex: 'territories',
                    text: 'Territories'
                }
            ]
        });

        me.callParent(arguments);
    }
});