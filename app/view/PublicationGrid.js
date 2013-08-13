Ext.define('JavisERP.view.PublicationGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.publicationgrid',

    title: 'Publication List',
    forceFit: true,
    scroll: 'vertical',
    store: 'PublicationStore',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-newspaper-add',
                            cls: 'newpublication',
                            text: 'New Publication',
		                    resourceId: 'publication_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'PublicationPagingToolbar',
                    displayInfo: true,
                    store: 'PublicationStore'
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Publication',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-newspaper-go',
	                itemId: 'publication_edit',
                    resourceId: 'publication_edit',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Publication',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-newspaper-delete',
	                itemId: 'publication_delete',
                    resourceId: 'publication_delete',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    flex: 1,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'contentcoord_name',
                    flex: 1,
                    text: 'Content Coordinator'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'publisher_name',
                    flex: 1,
                    text: 'Publisher'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 1,
                    text: 'Territory'
                }
            ]
        });

        me.callParent(arguments);
    }

});