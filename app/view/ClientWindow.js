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
    title: 'Customer',
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
                            dock: 'top',
                            cls: 'clientWindowToolBar',
                            itemId: 'clientWindowToolBar',
                            items: [
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
                                            name: 'client_name',
                                            fieldLabel: 'Company Name'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Customer Stage',
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
                                            displayField: 'name',
                                            valueField: 'id',
                                            store: 'TerritoryStore',
                                            queryMode: 'local',
                                            typeAdead:true,
                                            name: 'territory_id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'email_address',
                                            fieldLabel: 'Email Address'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'phone',
                                            fieldLabel: 'Phone'
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
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'address_1',
                                            fieldLabel: 'Address Line 1'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'address_2',
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
                                            store: 'State',
                                            queryMode: 'local',
                                            typeAdead:true,
                                            name: 'state_id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Zip',
                                            displayField: 'iso_code',
                                            valueField: 'id',
                                            store: 'PostalCode',
                                            queryMode: 'local',
                                            typeAdead:true,
                                            name: 'postal_code_id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Assigned Sales Rep',
                                            displayField: 'username',
                                            valueField: 'id',
                                            store: 'User',
                                            queryMode: 'local',
                                            typeAdead:true,
                                            name: 'salesrep_id'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            cls: 'payment_client_id',
                                            itemId: 'client_id',
                                            name: 'client_id'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'contactgrid',
                            cls: 'contactgrid',
                            height: 150,
                            id: 'contactgrid',
                            title: 'Contacts',
                            itemId: 'contactgrid',
                            padding: '10px 0px'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});