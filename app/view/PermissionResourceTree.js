Ext.define('JavisERP.view.PermissionResourceTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.permissionresourcetree',

    title: 'Permission Resources',
    forceFit: true,
    store: 'PermissionResourceStore',
	itemId: 'PermissionResourceTree',
	xtype: 'permissionresourcetree',
    scroll: 'vertical',
    border: 0,
    rootVisible: false,
    useArrows: true,
    rowLines: true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(this, {
        	viewConfig: {

            },
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Permission',
                flex: 2,
                dataIndex: 'text'
            },
            {
                text: 'Resource ID',
                flex: 1,
                dataIndex: 'resourceid'
            },
            {
                text: 'Edit',
                width: 55,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit Permission',
                align: 'center',
                iconCls: 'ui-silk ui-silk-pencil',
                itemId: 'resource_edit',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                	this.fireEvent('itemclick', grid, rowIndex, colIndex, actionItem, event, record, row);
                }
            },
            {
                text: 'Delete',
                width: 55,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Delete Permission',
                align: 'center',
                iconCls: 'ui-silk ui-silk-delete',
                itemId: 'resource_delete',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    this.fireEvent('itemclick', grid, rowIndex, colIndex, actionItem, event, record, row);
                }
            }],
            tbar: [{
                text: 'New Folder',
                iconCls: 'ui-silk ui-silk-folder-add',
                scope: this,
                itemId: 'new_resource_folder'
            },
            {
                text: 'New Resource',
                iconCls: 'ui-silk ui-silk-key-add',
                scope: this,
                itemId: 'new_resource'
            }]
        });
        //console.log(this.getStore().load());
        me.callParent(arguments);
    }
});