Ext.define('JavisERP.view.PublicationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.publicationwindow',

    cls: 'publicationwindow',
    itemId: 'publicationwindow',
    width: 750,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Publication',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'publicationform',
                    itemId: 'publicationform',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            cls: 'pubWindowToolBar',
                            itemId: 'pubwindowtoolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'publicationsavebutton',
                                    itemId: 'publicationsavebutton',
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
                                            name: 'description',
                                            fieldLabel: 'Name/Description'
                                        },
                                        {
                                            xtype: 'comboboxselect',
                                            fieldLabel: 'Postal Code(s)',
                                            displayField: 'iso_code',
                                            emptyText: 'select a postal code...',
                                            descField: 'id',
                                            valueField: 'id',
                                            store: 'PostalCode',
                                            queryMode: 'local',
                                            typeAdead:true,
                                            growMax:100,
                                            delimiter: ',',
                                            filterPickList:true,
                                            name: 'postal_codes',
                                            cls:'postalCodeList'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%'
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
                                            itemId: 'territory_id',
                                            name: 'territory_id',
                                            fieldLabel: 'Territory',
                                            displayField: 'name',
                                            store: 'TerritoryStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'contact_email',
                                            fieldLabel: 'Contact Email'
                                        },
                                        {
                                            xtype: 'hiddenfield',
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