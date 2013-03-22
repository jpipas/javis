Ext.define('JavisERP.view.TerritoryWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.territorywindow',

    hidden: false,
    layout: {
        type: 'fit'
    },
    closeAction: 'hide',
    title: 'New Territory',
    modal: true,
    autoDestroy: true,
    cls: 'territoryWindow',
    width: 400,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'territoryform',
                    itemId: 'territoryform',
                    bodyPadding: 10,
                    title: '',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    cls: 'saveTerritoryButton',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ],
                    items: [
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
                            anchor: '100%',
                            itemId: 'state',
                            name: 'state_id',
                            fieldLabel: 'State',
                            valueField: 'id',
                            editable: false,
                            displayField: 'name',
                            store: 'State',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Publisher',
                            displayField: 'fullname',
                            labelAlign: 'right',
                            valueField: 'id',
                            store: 'User',
                            editable:false,
                            name: 'manager_id'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});