Ext.define('JavisERP.view.AdListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adlistgrid',
    require: [
        'Ext.ux.grid.Printer'
    ],

    height: 200,
    itemId: 'AdListGrid',
    minHeight: 200,
    autoScroll: false,
    title: 'Advertisement List',
    forceFit: false,
    scroll: 'vertical',
    store: 'AdList',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            //selModel: Ext.create('Ext.selection.CheckboxModel',{mode: 'SIMPLE'}),
            columns: [
                /*{
                    xtype: 'rowactions',
                    flex: 1,
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-folder-edit',
                            tooltip: 'Edit Contract',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-folder-delete',
                            tooltip: 'Delete Contract',
                            callback: Ext.emptyFn
                        }
                    ]
                },*/
                {
                    xtype: 'gridcolumn',
                    defaultWidth: 160,
                    dataIndex: 'client',
                    flex: 4,
                    text: 'Client Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'marketing_dir',
                    flex: 2,
                    text: 'Marketing Director'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ad_type',
                    flex: 1,
                    text: 'Ad Type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ad_size',
                    flex: 2,
                    text: 'Ad Size'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'designer',
                    flex: 2,
                    text: 'Designer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'salesrep',
                    flex: 2,
                    text: 'Sales Rep'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'seasonal',
                    flex: 1,
                    text: 'Seasonal'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'publication_id',
                    hidden: true,
                    text: 'Publication ID'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'duration_id',
                    hidden: true,
                    text: 'Duration ID'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_id',
                    hidden: true,
                    text: 'Territory ID'
                }

            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'printgrid',
                            icon: '',
                            iconCls: 'ui-silk ui-silk-printer',
                            text: 'Print Ad List',
                            handler : function(){
                                Ext.ux.grid.Printer.printAutomatically = false;
                                Ext.ux.grid.Printer.stylesheetPath = '/resources/css/print.css';
                                Ext.ux.grid.Printer.print(me);
                            }
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'adlistPageToolBar',
                    displayInfo: true,
                    store: 'AdList'
                }
            ]
        });

        me.callParent(arguments);
    }

});