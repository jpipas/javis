Ext.define('JavisERP.view.ClientWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.clientwindow',

    cls: 'clientWindow',
    id: 'clientWindow',
    itemId: 'clientwindow',
    width: 750,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Client',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'clientform',
                    id: 'clientForm',
                    itemId: 'clientForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'clientWindowToolBar',
                            itemId: 'clientWindowToolBar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    cls: 'clientsavebutton',
                                    id: 'clientsavebutton',
                                    itemId: 'clientsavebutton',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'cancelbutton',
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            padding: '0px 0px 10px 0px',
                            defaults: {
                                anchor: '95%'
                            },
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    id: 'clientform_column1',
                                    itemId: 'column1',
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'company_name',
                                            fieldLabel: 'Company Name'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Client Stage',
                                            displayField: 'id',
                                            emptyText: 'Select a stage...',
                                            valueField: 'id',
                                            store: 'CustomerStage',
                                            queryMode: 'local',
                                            typeAdead:true,
                                            name: 'stage'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Territory',
                                            tpl: '<tpl for="."><div class="x-boundlist-item">{name} ({state_name})</div></tpl>',
                            				displayTpl: '<tpl for=".">{name} ({state_name})</tpl>',
                                            displayField: 'name',
                                            valueField: 'id',
                                            store: {type: 'territorystore'},
                                            queryMode: 'remote',
                                            minChars: 3,
                                            typeAdead:true,
                                            name: 'territory_id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'email_address',
                                            vtype: 'email',
                                            fieldLabel: 'Email Address'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'phone',
                                            vtype: 'phone',
                                            fieldLabel: 'Phone'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'cell',
                                            vtype: 'phone',
                                            fieldLabel: 'Mobile Phone'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'fax',
                                            fieldLabel: 'Fax'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right',
                                        labelWidth: 125
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'address1',
                                            fieldLabel: 'Address Line 1'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'address2',
                                            fieldLabel: 'Address Line 2'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'city',
                                            fieldLabel: 'City'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'State',
                                            displayField: 'name',
                                            valueField: 'id',
                                            store: {type: 'statestore'},
                                            queryMode: 'local',
                                            forceSelection: true,
                                            name: 'state_id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Zip',
                                            displayField: 'iso_code',
                                            valueField: 'iso_code',
                                            store: {type: 'postalcodestore'},
                                            queryMode: 'local',
                                            name: 'postal_code_iso'
                                        },
                                        {
                                        	xtype: 'combobox',
                                            name: 'salesrep_id',
                                            fieldLabel: 'Assigned Sales Rep',
                                            displayField: 'fullname',
                                            store: {type: 'userstore'},
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            minChars: 3,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            cls: 'id',
                                            itemId: 'id',
                                            name: 'id'
                                        }
                                    ]
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