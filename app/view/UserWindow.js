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
                                        padding: '5px 0px 0px 0px'
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
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    labelAlign: 'right',
                                    items: [
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
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            itemId: 'ad_client_id',
                                            name: 'client_id'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'contract_id',
                                            fieldLabel: 'Label'
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