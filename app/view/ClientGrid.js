Ext.define('JavisERP.view.ClientGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientgrid',

    height: 250,
    itemId: 'clientgrid',
    width: 868,
    autoScroll: false,
    title: 'List: Customer',
    columnLines: true,
    forceFit: true,
    scroll: 'none',
    store: 'ClientStore',

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
                            icon: 'resources/icons/user_edit.png',
                            tooltip: 'Edit'
                        },
                        {
                            altText: 'View',
                            icon: 'resources/icons/user.png',
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
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'stage',
                    flex: 1,
                    text: 'Stage'
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
                    dataIndex: 'state',
                    flex: 1,
                    text: 'State'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'zip',
                    flex: 1,
                    text: 'Zip'
                },
                {
                    xtype: 'gridcolumn',
                    getter: function(record) {
                        var obj = record.get('territory');
                        return Ext.isObject( obj )  ? obj.name : obj;
                    },
                    setter: function(record, value) {
                        var obj = record.get('obj') || {};
                        record.set('territory', Ext.apply(obj,{name: value}));
                    },
                    dataIndex: 'territory',
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