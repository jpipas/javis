Ext.define('JavisERP.view.PublicationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.publicationwindow',

    cls: 'publicationwindow',
    itemId: 'publicationwindow',
    width: 400,
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
                    defaults : {
                    	labelAlign : 'right',
                    	labelWidth : 125
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'pubWindowToolBar',
                            itemId: 'pubwindowtoolbar',
                            items: [
                            		{
                            				xtype: 'tbspacer',
                            				flex: 1
                            		},
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
                                    itemId: 'cancelbutton',
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ],
                    items: [
                    		{
                            xtype: 'hiddenfield',
                            name: 'id'
                        },
                        {
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: 'Name/Description',
                            anchor: '100%',
                        },
                        {
                            xtype: 'combobox',
                            cls: 'territory',
                            itemId: 'territory_id',
                            name: 'territory_id',
                            fieldLabel: 'Territory',
                            displayField: 'name',
                            store: 'TerritoryStore',
                            valueField: 'id',
                            anchor: '100%',
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Postal Code(s)',
                            displayField: 'iso_code',
                            emptyText: 'select a postal code...',
                            valueField: 'iso_code',
                            store: 'PostalCode',
                            queryMode: 'local',
                            typeAdead:true,
                            delimiter: ',',
                            multiSelect:true,
                            name: 'postal_codes',
                            cls:'postalCodeList',
                            anchor: '100%',
                        },
                        {
                            xtype: 'combobox',
                            cls: 'contentcoord',
                            id: 'contentcoord_id',
                            itemId: 'contentcoord_id',
                            name: 'contentcoord_id',
                            fieldLabel: 'Content Coordinator',
                            displayField: 'fullname',
                            store: 'UserDropDown',
                            hideTrigger: true,
                            triggerAction: 'query',
                            pageSize: true,
                            minChars: 3,
                            valueField: 'id',
                            anchor: '100%',
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});