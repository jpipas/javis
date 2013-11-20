Ext.define('JavisERP.view.RegionWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.regionwindow',

	requires: [
        'JavisERP.view.ComboFieldBox',
        'Ext.ux.form.field.BoxSelect'
    ],
		
	id: 'regionWindow',
	itemId: 'regionWindow',
	width: 600,
	autoDestroy: true,
    layout: {
        type: 'fit'
    },
    title: 'Region',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'regionForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'regionwindowtoolbar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    itemId: 'regionsave',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save',
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
                            name: 'title',
                            itemId: 'title',
                            fieldLabel: 'Title',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'combobox',
                            name: 'manager_id',
                            fieldLabel: 'Manager',
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
                            xtype: 'comboboxselect',
                            multiSelect:true,
                            fieldLabel: 'Location(s)',
                            displayField: 'name',
                            emptyText: 'Assign location(s)...',
                            labelAlign: 'right',
                            itemId: 'regionterritories',
                            descField: 'id',
                            valueField: 'id',
                            listConfig: {
                            	itemTpl : '{name} ({state_name})'
							},
							labelTpl: "{name} ({state_name})",
                            store: {type: 'territorystore'},
                            grow: true,
                            filterPickList: true,
                            forceSelection: false,
                            queryMode: 'remote',
                            typeAdead:true,
                            name: 'territories'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});