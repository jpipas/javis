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
                            text: 'New Publication'
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
                    xtype: 'rowactions',
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-newspaper-go',
                            tooltip: 'Edit Publication',
                            hideIndex: 'edit_action',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-newspaper-delete',
                            tooltip: 'Delete Publication',
                            hideIndex: 'delete_action',
                            callback: Ext.emptyFn
                        }
                    ]
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