Ext.define('JavisERP.view.AdvertisementWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.adwindow',

    requires: [
        'JavisERP.view.ComboFieldBox'
    ],

    id: 'adWindow',
    itemId: 'adwindow',
    width: 750,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Advertisement',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'adForm',
                    id: 'adform',
                    itemId: 'adform',
                    bodyPadding: 10,
                    url: '/server/web/index.php/advertisement/new',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            cls: 'adWindowToolBar',
                            itemId: 'adwindowtoolbar',
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
                                    id: 'adform_column1',
                                    itemId: 'adwindow_col1',
                                    defaults: {
                                        padding: '5px 0px 0px 0px'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    labelAlign: 'right',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            cls: 'clientnamefield',
                                            name: 'client',
                                            fieldLabel: 'Client'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Publication(s)',
                                            displayField: 'description',
                                            emptyText: 'select a publication...',
                                            descField: 'id',
                                            valueField: 'id',
                                            store: 'PublicationStore',
                                            queryMode: 'local',
                                            growMax: 150,
                                            anchor:'95%',
                                            typeAdead:true,
                                            //editable: false,
                                            multiSelect:true,
                                            name: 'publicationlist'
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
                                            cls: 'adType',
                                            itemId: 'adtypeid',
                                            name: 'ad_type_id',
                                            fieldLabel: 'Ad Type',
                                            displayField: 'description',
                                            store: 'AdTypeStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'adSize',
                                            id: 'ad_size_id',
                                            itemId: 'adsizeid',
                                            name: 'ad_size_id',
                                            fieldLabel: 'Ad Size',
                                            displayField: 'description',
                                            store: 'AdSizeStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'checkboxgroup',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    name: 'email_designer',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
                                                    boxLabel: 'Notify Designer',
                                                    inputValue: '1'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    margin: '0 10',
                                                    name: 'email_client',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
                                                    boxLabel: 'Notify Client',
                                                    inputValue: '1'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'exp_date',
                                            fieldLabel: 'Expiration Date'
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