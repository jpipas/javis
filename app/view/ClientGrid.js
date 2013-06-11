Ext.define('JavisERP.view.ClientGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientgrid',

    height: 250,
    itemId: 'clientgrid',
    width: 868,
    autoScroll: true,
    title: 'List: Client',
    columnLines: true,
    forceFit: true,
    scroll: 'none',
    store: 'ClientStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rowactions',
                    maxWidth: 50,
                    defaultWidth: 50,
                    actions: [
                        {
                            altText: 'View',
                            iconCls: 'view_action ui-silk ui-silk-user',
                            hideIndex: 'view_action',
                            tooltip: 'View'
                        },
                        {
                            altText: 'Delete',
                            iconCls: 'delete_action ui-silk ui-silk-user-delete',
                            hideIndex: 'delete_action',
                            tooltip: 'Delete'
                        }

                    ]
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
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'ClientPagingToolbar',
                    displayInfo: true,
                    store: 'ClientStore'
                },
                {
                    xtype: 'gridsearchingbar',
                    inputWidth: 200,
                    grid: this,
                    showSelectAll: true,
                    menuIconCls: 'ui-silk ui-silk-magnifier',
                    disableIndexes: ['id'],
                    items: ['->']
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