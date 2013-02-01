Ext.define('JavisERP.view.UserWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.userwindow',

    requires: [
        'JavisERP.view.ComboView',
        'JavisERP.view.ComboFieldBox'
    ],

    id: 'userWindow',
    itemId: 'userWindow',
    width: 750,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Employee',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'userForm',
                    id: 'userForm',
                    itemId: 'userForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            cls: 'userWindowToolBar',
                            itemId: 'userwindowtoolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'savebutton',
                                    id: 'savebutton',
                                    itemId: 'savebutton',
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
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    id: 'user_column1',
                                    itemId: 'userwindow_col1',
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    labelAlign: 'right',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            cls: 'username',
                                            name: 'username',
                                            fieldLabel: 'Username'
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'password',
                                            name: 'password',
                                            id: 'password',
                                            fieldLabel: 'Password',
                                            inputType: 'password',
                                            listeners: {
                                                validitychange: function(field){
                                                    field.next().validate();
                                                },
                                                blur: function(field){
                                                    field.next().validate();
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'retype-password',
                                            name: 'retype-password',
                                            fieldLabel: 'Retype Password',
                                            inputType: 'password',
                                            vtype: 'password',
                                            initialPassField: 'password'
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'email',
                                            name: 'email',
                                            fieldLabel: 'Email'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px',
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    labelAlign: 'right',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            cls: 'firstname',
                                            name: 'firstname',
                                            fieldLabel: 'First Name'
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'lastname',
                                            name: 'lastname',
                                            fieldLabel: 'Last Name'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'territory',
                                            itemId: 'adtypeid',
                                            name: 'territory_id',
                                            fieldLabel: 'Territory',
                                            displayField: 'name',
                                            store: 'TerritoryStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'manager',
                                            id: 'manager_user_id',
                                            itemId: 'adsizeid',
                                            name: 'manager_user_id',
                                            fieldLabel: 'Manager',
                                            displayField: 'username',
                                            store: 'User',
                                            valueField: 'id'
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