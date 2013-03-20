Ext.define('JavisERP.view.ClientGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientgrid',
    requires: [
        'Ext.ux.grid.FiltersFeature'
    ],
    height: 250,
    itemId: 'clientgrid',
    width: 868,
    autoScroll: false,
    title: 'List: Customer',
    columnLines: true,
    forceFit: true,
    scroll: 'none',
    store: 'ClientStore',
    features: [{ftype: 'filters'}],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'actioncolumn',
                    draggable: false,
                    frame: false,
                    itemId: 'actions',
                    maxWidth: 50,
                    layout: {
                        type: 'fit'
                    },
                    defaultWidth: 50,
                    sortable: false,
                    align: 'center',
                    flex: 1,
                    hideable: false,
                    menuDisabled: true,
                    altText: 'Actions',
                    items: [
                        {
                            altText: 'Edit',
                            disabled: false,
                            icon: '/resources/icons/user_edit.png',
                            tooltip: 'Edit'
                        },
                        {
                            altText: 'View',
                            icon: '/resources/icons/user.png',
                            tooltip: 'View'
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
                    text: 'Name',
                    filterable: true
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
                    text: 'Zip',
                    filterable: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 1,
                    text: 'Territory',
                    filterable: true
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