Ext.define('JavisERP.view.ReportPeriodSalesByTerritoryWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportperiodsalesbyterritorywindow',

    id: 'reportPeriodSalesByTerritoryWindow',
    itemId: 'reportPeriodSalesByTerritoryWindow',
    
    width: 350,
    autoDestroy: true,
    layout: {
        type: 'fit'
    },
    modal: true,
    title: 'Period Sales by Territory',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'form',
                    itemId: 'reportPeriodSalesByTerritoryForm',
                    border: 0,
                    items: [
		                {
		                	bodyPadding: 10,
		                    dockedItems: [
		                        {
		                            xtype: 'toolbar',
		                            dock: 'bottom',
		                            items: [
		                        		{
	                        				xtype: 'tbspacer',
	                        				flex: 1
		                        		},
		                                {
		                                    xtype: 'button',
		                                    itemId: 'submitbutton',
		                                    iconCls: 'ui-silk ui-silk-page-white-excel',
		                                    text: 'Generate Spreadsheet'
		                                },
		                                {
		                                    xtype: 'button',
		                                    text: 'Cancel',
		                                    scope: this,
		                                    handler: function(){ this.close(); }
		                                }
		                            ]
		                        }
		                    ],
		                    defaults: {
				                padding: '5px 0px 0px 0px',
				                anchor: '95%',
				                labelAlign: 'right',
				            },
				            layout: {
				                type: 'anchor'
				            },
		                    items: [
		                    	{
		                            xtype: 'combobox',
		                            displayField: 'description',
		                            valueField: 'id',
		                            fieldLabel: 'Period',
		                            store: {type: 'durationstore' },
		                            itemId: 'duration',
		                            name: 'duration_id',
		                            allowBlank: false
		                        },
		                        {
		                            xtype: 'comboboxselect',
                            		multiSelect:true,
		                            cls: 'territory',
		                            itemId: 'territory_id',
		                            name: 'territory_id',
		                            fieldLabel: 'Territory',
		                            displayField: 'name',
		                            store: {type: 'territorystore' },
		                            valueField: 'id',
		                            emptyText: 'All Territories',
		                            grow: true,
		                            forceSelection: false,
		                            filterPickList: true,
		                            queryMode: 'remote',
		                            typeAdead:true
		                        }
		                    ]
		                }
					]
				}
            ]
        });

        me.callParent(arguments);
    }

});