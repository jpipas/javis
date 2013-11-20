Ext.define('JavisERP.view.TerritoryWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.territorywindow',

	requires: [
        'JavisERP.view.ComboView',
        'JavisERP.view.ComboFieldBox'
    ],
		
	id: 'territoryWindow',
	cls: 'territoryWindow',
	itemId: 'territoryWindow',
	width: 400,
	autoDestroy: true,
    layout: {
        type: 'fit'
    },
    title: 'Location',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'territoryForm',
                    itemId: 'territoryForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'territorywindowtoolbar',
                            items: [
                            		{
                            				xtype: 'tbspacer',
                            				flex: 1
                            		},
                                {
                                    xtype: 'button',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    cls: 'saveTerritoryButton',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'cancelbutton',
                                    itemId: 'cancelbutton',
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ],
                    defaults: {
                        padding: '5px 0px',
                        anchor: '95%',
                        labelAlign: 'right'
                    },
                    items: [
                		{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                        {
                            xtype: 'textfield',
                            anchor: '95%',
                            cls: 'namefield',
                            name: 'name',
                            itemId: 'name',
                            fieldLabel: 'Name',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'state',
                            name: 'state_id',
                            fieldLabel: 'State',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'remote',
                            minChars: 3,
                            displayField: 'name',
                            store: 'State',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'combobox',
                            name: 'manager_id',
                            fieldLabel: 'Publisher',
                            displayField: 'fullname',
                            store: {type: 'userstore'},
                            hideTrigger: true,
                            triggerAction: 'query',
                            pageSize: true,
                            minChars: 3,
                            valueField: 'id',
                            labelAlign: 'right',
                        },
                        {
                            xtype: 'combobox',
                            name: 'region_id',
                            fieldLabel: 'Region',
                            displayField: 'title',
                            store: {type: 'regionstore'},
                            valueField: 'id',
                            labelAlign: 'right',
                        },
                        {
                            xtype: 'combobox',
                            name: 'cycle_id',
                            fieldLabel: 'Revenue Cycle',
                            displayField: 'title',
                            store: {type: 'commissioncyclestore'},
                            valueField: 'id',
                            labelAlign: 'right',
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});