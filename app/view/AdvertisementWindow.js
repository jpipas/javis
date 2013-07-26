Ext.define('JavisERP.view.AdvertisementWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.adwindow',

    requires: [
        'JavisERP.view.ComboFieldBox',
        'Ext.ux.form.field.BoxSelect'
    ],

    id: 'adWindow',
    itemId: 'adwindow',
    width: 750,
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
                    itemId: 'adform',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'adWindowToolBar',
                            itemId: 'adwindowtoolbar',
                            items: [
                            		{
                            				xtype: 'tbspacer',
                            				flex: 1
                            		},
                                {
                                    xtype: 'button',
                                    cls: 'savebutton',
                                    itemId: 'savebutton',
                                    iconCls: 'ui-silk ui-silk-disk',
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
                                    itemId: 'adwindow_col1',
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            cls: 'client',
                                            itemId: 'client_id',
                                            name: 'client_id',
                                            fieldLabel: 'Client',
                                            displayField: 'company_name',
                                            store: {type: 'clientstore'},
                                            hideTrigger: true,
                                            forceSelection: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            allowOnlyWhitespace: false,
                                            allowBlank: false,
                                            minChars: 3,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'comboboxselect',
                                            multiSelect:true,
                                            fieldLabel: 'Publications(s)',
                                            displayField: 'description',
                                            descField: 'id',
                                            valueField: 'id',
                                            forceSelection: false,
                                            filterPickList: true,
                                            pinList: false,
                                            store: { type: 'publicationstore' },
                                            queryMode: 'remote',
                                            listConfig: {
                                            	itemTpl : '{description} ({territory_name})'
											},
											labelTpl: "{description} ({territory_name})",
                                            grow: true,
                                            stacked: true,
                                            name: 'publications',
                                            cls:'publicationlist'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'designer_id',
                                            name: 'designer_id',
                                            fieldLabel: 'Designer',
                                            displayField: 'fullname',
                                            store: 'UserDropDown',
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            minChars: 3,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'salesrep_id',
                                            name: 'salesrep_id',
                                            fieldLabel: 'Sales Rep',
                                            displayField: 'fullname',
                                            store: 'User',
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            minChars: 3,
                                            valueField: 'id'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px',
                                        labelAlign: 'right',
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            cls: 'adType',
                                            itemId: 'adtypeid',
                                            name: 'ad_type_id',
                                            fieldLabel: 'Ad Type',
                                            displayField: 'description',
                                            forceSelection: true,
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
                                            forceSelection: true,
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