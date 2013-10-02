Ext.define('JavisERP.view.AdListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adlistgrid',
    require: [
        'Ext.ux.grid.Printer'
        //'Ext.ux.grid.FiltersFeature'
    ],
    //features: [{ftype:'filters',local: false, filters:[{type:'string',dataIndex:'cl.territory_id'},{type:'string',dataIndex:'p.id'},{type:'string',dataIndex:'d.id'}]}],
    height: 200,
    itemId: 'AdListGrid',
    minHeight: 200,
    autoScroll: false,
    title: 'Advertisement List',
    forceFit: false,
    scroll: 'vertical',
    store: 'AdList',
    emptyText : 'Please select a territory, publication, and month/year',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
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
                    dataIndex: 'contract_number',
                    flex: 1,
                    text: 'Contract #'
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
                    dataIndex: 'salesrep_name',
                    flex: 2,
                    text: 'Sales Rep'
                },
                {
                	xtype: 'gridcolumn',
                	dataIndex: 'contract_notes',
                	flex: 2,
                	text: 'Notes'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'seasonal',
                    flex: 1,
                    text: 'Seasonal'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pubilication_id',
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
                                var pub = Ext.getCmp('publication_adlist');
                                var ter = Ext.getCmp('territory_adlist');
                                var dur = Ext.getCmp('duration_adlist');
                                Ext.ux.grid.Printer.mainTitle = ter.getStore().getById(ter.getValue()).data.name+' - '+pub.getStore().getById(pub.getValue()).data.description+' - '+dur.getStore().getById(dur.getValue()).data.description;
                                Ext.ux.grid.Printer.print(me);
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'id',
                            emptyText: 'Territory',
                            store: 'TerritoryStore',
                            editable: false,
                            name: 'territory_id',
                            itemId: 'territory',
                            id: 'territory_adlist',
                            listeners: {
                                change: {
                                    fn: function() {
                                        //console.log(this.getValue());
                                        Ext.getCmp('publication_adlist').setValue();
                                        Ext.getCmp('publication_adlist').store.clearFilter(true);
                                        Ext.getCmp('publication_adlist').store.filter('territory_id',this.getValue());
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'description',
                            valueField: 'id',
                            emptyText: 'Publication',
                            store: 'PublicationStore',
                            itemId: 'publication',
                            id: 'publication_adlist',
                            typeAhead: true,
                            name: 'publication_id'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'description',
                            valueField: 'id',
                            emptyText: 'Month/Year',
                            store: 'Duration',
                            queryMode: 'local',
                            itemId: 'duration',
                            id: 'duration_adlist',
                            typeAhead: true,
                            name: 'duration_id'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-application-go',
                            itemId: 'generate_ad_list',
                            text: 'Generate Ad List'
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