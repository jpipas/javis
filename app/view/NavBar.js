Ext.define('JavisERP.view.NavBar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.navbar',

    maxHeight: 28,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    id: 'nav-toolbar',
                    items: [
                        {
                            xtype: 'splitbutton',
                            iconCls: 'ui-silk ui-silk-clock',
                            tooltip: 'Recent Records'
                        },
                        {
                            xtype: 'splitbutton',
                            iconCls: 'ui-silk ui-silk-star',
                            tooltip: 'Favorite Records'
                        },
                        {
                            xtype: 'splitbutton',
                            itemId: 'Dashboard',
                            text: 'Home',
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                //title: 'HomeMenu',
                                hideMode: 'display',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'Dashboard',
                                        iconCls: 'ui-silk ui-silk-application-home',
                                        text: 'Dashboard'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-application-edit',
                                        text: 'Preferences'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                        		itemId: 'ActivityGrid',
                            text: 'Activities'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            text: 'Lists',
                            menu: {
                                xtype: 'menu',
                                width: 220,
                                //title: 'ListMenu',
                                hideMode: 'display',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'UserGrid',
                                        iconCls: 'ui-silk ui-silk-user-gray',
                                        text: 'Independent Contractors'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'ClientGrid',
                                        iconCls: 'ui-silk ui-silk-group',
                                        text: 'Clients',
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            hideMode: 'display',
                                            items: [
                                                {
                                                    xtype: 'menuitem',
                                                    iconCls: 'ui-silk ui-silk-group-add',
                                                    itemId: 'new_customer',
                                                    text: 'New Customer'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'PublicationGrid',
                                        iconCls: 'ui-silk ui-silk-newspaper',
                                        text: 'Publications'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'AdvertisementGrid',
                                        iconCls: 'ui-silk ui-silk-layout',
                                        text: 'Advertisements'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'ContractGrid',
                                        iconCls: 'ui-silk ui-silk-folder-table',
                                        text: 'Contracts'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'TerritoryGrid',
                                        iconCls: 'ui-silk ui-silk-map',
                                        text: 'Territories'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            text: 'Reports',
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                hideMode: 'display',
                                //title: 'ReportsMenu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-money',
                                        text: 'Sales Report'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'AdListGrid',
                                        iconCls: 'ui-silk ui-silk-application-view-list',
                                        text: 'Ad List'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-calculator',
                                        text: 'Commissions'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: 'Support'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});