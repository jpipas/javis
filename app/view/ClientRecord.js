Ext.define('JavisERP.view.ClientRecord', {
    extend: 'Ext.form.Panel',
    alias: 'widget.clientrecord',

    requires: [
        'JavisERP.view.RecordNavigation',
        'JavisERP.view.ContactGrid',
        'JavisERP.view.ActivityGrid',
        'JavisERP.view.UserNoteGrid',
        'JavisERP.view.ContractGrid',
        'JavisERP.view.AdvertisementGrid',
        'JavisERP.view.PublicationGrid',
        'JavisERP.view.PaymentGrid'
    ],
    cls: 'clientform',
    id: 'clientrecord',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 5,
    title: 'Client Record',
    autoScroll: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        		autoScroll: true,
            defaults: {
                anchor: '100%',
                labelAlign: 'right',
            },
            dockedItems: [
                {
                    xtype: 'recordnav',
                    itemId: 'ClientRecordNavigation',
                    cls: 'clientrecordnav',
                    dock: 'top'
                }
            ],
            items: [
                {
                    xtype: 'fieldcontainer',
                    itemId: 'RecordHeader',
                    minHeight: 200,
                    defaults: {
                        labelAlign: 'right'
                    },
                    layout: {
                        align: 'stretch',
                        padding: '0 0 25 0',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            border: false,
                            itemId: 'Column1',
                            defaultType: 'textfield',
                            defaults: {
                                labelAlign: 'right',
                                anchor: '95%'
                            },
                            layout: {
                                type: 'anchor'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    readOnly: true,
                                    name: 'company_name',
                                    fieldLabel: 'Company Name'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    name: 'stage',
                                    fieldLabel: 'Client Stage'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    name: 'territory_name',
                                    fieldLabel: 'Territory'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    name: 'email_address',
                                    readOnly: true,
                                    fieldLabel: 'Email Address'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    readOnly: true,
                                    name: 'phone',
                                    fieldLabel: 'Phone'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    readOnly: true,
                                    name: 'cell',
                                    fieldLabel: 'Mobile'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    readOnly: true,
                                    name: 'fax',
                                    fieldLabel: 'Fax'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            border: false,
                            itemId: 'Column2',
                            defaults: {
                                labelAlign: 'right',
                                anchor: '95%'
                            },
                            layout: {
                                type: 'anchor'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    readOnly: true,
                                    name: 'address1',
                                    fieldLabel: 'Address Line 1'
                                },
                                {
                                    xtype: 'displayfield',
                                    readOnly: true,
                                    name: 'address2',
                                    fieldLabel: 'Address Line 2'
                                },
                                {
                                    xtype: 'displayfield',
                                    readOnly: true,
                                    name: 'city',
                                    fieldLabel: 'City'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    name: 'state_name',
                                    fieldLabel: 'State'
                                },
                                {
                                    xtype: 'displayfield',
                                    anchor: '95%',
                                    name: 'postal_code_iso',
                                    fieldLabel: 'Zip'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 3,
                    minHeight: 350,
                    itemId: 'clienttabs',
                    defaults: {
                        labelAlign: 'right'
                    },
                    layout: {
                        type: 'fit'
                    },
                    activeTab: 0,
                    plain: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'fit'
                            },
                            minHeight: 350,
                            bodyPadding: 5,
                            title: 'General',
                            resourceId: 'client_tab_general',
                            resourceType: 'disable',
                            plugins: ['permission'],
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    itemId: 'clientgeneraltab',
                                    cls : 'generaltab',
                                    activeTab: 0,
                                    plain: true,
                                    minHeight: 280,
                                    flex: 1,
                                    layout: {
                                        type: 'fit'
                                    },
                                    items: [
                                        {
                                            title: 'Contacts',
                                            xtype: 'contactgrid',
                                            itemId: 'ContactGrid',
                                            header: false,
                                            border: 0
                                        },
                                        /*{
                                            title: 'Activities',
                                            xtype: 'activitygrid',
                                            header: false,
                                            id: 'clientactivitygrid',
                                            itemId: 'clientactivitygrid',
                                            border: 0,
                                            cls: 'clientactivitygrid'
                                        },*/
                                        {
                                            title: 'User Notes',
	                                          xtype: 'usernotegrid',
	                                          header: false
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Files'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            defaults: {
                                labelAlign: 'right'
                            },
                            layout: {
                                type: 'fit'
                            },
                            minHeight: 350,
                            bodyPadding: 5,
                            title: 'Sales',
                            resourceId: 'client_tab_sales',
                            resourceType: 'disable',
                            plugins: ['permission'],
                            items: [
                                {
                                    xtype: 'container',
                                    height: 60,
                                    maxHeight: 60,
                                    itemId: 'SalesSublistHeader',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            itemId: 'Column1',
                                            defaults: {
                                                labelAlign: 'right',
                                                anchor: '95%'
                                            },
                                            layout: {
                                                type: 'anchor'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    anchor: '95%',
                                                    fieldLabel: 'Assigned Sales Rep',
                                                    name: 'salesrep_name',
                                                    labelWidth: 150
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    anchor: '95%',
                                                    fieldLabel: 'Unsettled Months',
                                                    labelWidth: 150,
                                                    name: 'remaining_months_cnt'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            itemId: 'Column2',
                                            defaults: {
                                                labelAlign: 'right',
                                                anchor: '100%'
                                            },
                                            layout: {
                                                type: 'anchor'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    anchor: '95%',
                                                    fieldLabel: 'Overdue Balance'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    anchor: '95%',
                                                    fieldLabel: 'Balance',
                                                    name: 'balance'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tabpanel',
                                    itemId: 'clientsalestab',
                                    cls: 'salestab',
                                    activeTab: 0,
                                    plain: true,
                                    minHeight: 280,
                                    flex: 1,
                                    layout: {
                                        type: 'fit'
                                    },
                                    items: [
                                        {
                                            title: 'Contracts',
                                            xtype: 'contractgrid',
                                            border: 0,
                                            itemId: 'clientcontractgrid',
                                            header: false,
                                            listeners: {
                                                beforerender: {
                                                    fn: me.onGridpanelBeforeRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            title: 'Advertisements',
                                            xtype: 'advertisementgrid',
                                            border: 0,
                                            cls: 'clientadgrid',
                                            itemId: 'clientadgrid',
                                            header: false,
                                            listeners: {
                                                beforerender: {
                                                    fn: me.onAdvertisementGridBeforeRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            title: 'Publications',
                                            xtype: 'publicationgrid',
                                            border: 0,
                                            itemId: 'PublicationGrid',
                                            header: false,
                                            listeners: {
                                                beforerender: {
                                                    fn: me.onPublicationGridBeforeRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            title: 'Payments',
                                            xtype: 'paymentgrid',
                                            border: 0,
                                            itemId: 'paymentgrid',
                                            header: false
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
    },

    onGridpanelBeforeRender: function(abstractcomponent, options) {
        abstractcomponent.getDockedItems('toolbar[dock="bottom"]')[0].hide();
    },

    onAdvertisementGridBeforeRender: function(abstractcomponent, options) {
        //abstractcomponent.getDockedItems('toolbar[dock="top"]')[0].hide();
    },

    onPublicationGridBeforeRender: function(abstractcomponent, options) {
        //abstractcomponent.getStore().clearGrouping();
        //abstractcomponent.getStore().reload();
        //abstractcomponent.fireEvent('groupchange',abstractcomponent,null);
        abstractcomponent.getDockedItems('toolbar[dock="bottom"]')[0].hide();
        abstractcomponent.getDockedItems('toolbar[dock="top"]')[0].hide();
    }

});