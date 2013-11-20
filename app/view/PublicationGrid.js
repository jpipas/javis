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
                        },
                        {
		                    xtype: 'gridsearchingbar',
		                    inputWidth: 200,
		                    grid: this,
		                    border: 0,
		                    showSelectAll: true,
		                    disableIndexes: ['baselines'],
		                    menuIconCls: 'ui-silk ui-silk-magnifier',
		                    items: ['->']
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
	                hidden: true,
                    resourceId: ['publication_edit','publication_edit_basic'],
                    hidden: true,
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
	                hidden: true,
                    resourceId: 'publication_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    flex: 2,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 1,
                    text: 'Location'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'publisher_name',
                    flex: 2,
                    text: 'Publisher'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'contentcoord_name',
                    flex: 1,
                    text: 'Content Coordinator'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'baselines',
                    flex: 2,
                    text: 'Baselines',
                    hidden: true,
                    resourceId: 'publication_view_baseline',
                    resourceType: 'hide',
                    plugins: ['permission']
                }
            ]
        });

        me.callParent(arguments);
    }

});