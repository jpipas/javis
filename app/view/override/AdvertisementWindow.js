Ext.define('JavisERP.view.override.AdvertisementWindow', {
    override: 'JavisERP.view.AdvertisementWindow',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                    xtype: 'form',
                    itemId: 'AdvertisementForm',
                    bodyPadding: 10,
                    dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                    xtype: 'button',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancel'
                                }
                            ]
                    }],
                    items: [{
                        xtype: 'fieldcontainer',
                        padding: '0px 0px 10px 0px',
                        layout: {
                            type: 'hbox',
                            align:'stretch'
                        },
                        items: [{
                            xtype: 'fieldcontainer',
                            id: 'adform_column1',
                            itemId: 'adwindow_col1',
                            flex:1,
                            defaults: {
                                padding: '5px 0px 0px 0px'
                            },
                            layout: {
                                type: 'anchor'
                            },
                            labelAlign: 'right',
                            items: [{
                                xtype: 'displayfield',
                                name: 'client',
                                fieldLabel: 'Client'
                            },comboFieldBox]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex:1,
                            defaults: {
                                padding: '5px 0px'
                            },
                            layout: {
                                type: 'anchor'
                            },
                            combineLabels: false,
                            labelAlign: 'right',
                            items: [{
                                xtype: 'combobox',
                                name: 'ad_type_id',
                                fieldLabel: 'Ad Type',
                                store: 'AdvertisementStore'
                            },
                            {
                                xtype: 'combobox',
                                name: 'ad_size_id',
                                fieldLabel: 'Ad Size',
                                store: 'ActivityTypeStore'
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'emailDesigner',
                                fieldLabel: 'Label',
                                hideLabel: true,
                                boxLabel: 'Send Email to Designer'
                            },
                            {
                                xtype: 'checkboxfield',
                                margin: '0 10',
                                name: 'emailClient',
                                fieldLabel: 'Label',
                                hideLabel: true,
                                boxLabel: 'Send Email to Client'
                            },
                            {
                                xtype: 'datefield',
                                name: 'exp_date',
                                fieldLabel: 'Expiration Date'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'client_id'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'contract_id',
                                fieldLabel: 'Label'
                            }]
                        }]
                    }]
             }]
        });
       me.callParent(arguments);
    }
});