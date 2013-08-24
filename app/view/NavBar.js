Ext.define('JavisERP.view.NavBar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.navbar',

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
                    dock: 'top',
                    id: 'nav-toolbar',
                    defaults : {
                    	framed: false
                    },
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
                                width: 160,
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
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'UserPasswordWindow',
                                        iconCls: 'ui-silk ui-silk-key',
                                        text: 'Change Your Password'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            itemId: 'ClientGrid',
                            text: 'Clients',
                            resourceId: 'client_view',
                            resourceType: 'disable',
                            plugins: ['permission']
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                        	itemId: 'ActivityGrid',
                            text: 'Activities',
                            resourceId: 'activity_view',
                            plugins: ['permission']
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
                                        text: 'Independent Contractors',
                                        resourceId: 'user_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'PublicationGrid',
                                        iconCls: 'ui-silk ui-silk-newspaper',
                                        text: 'Publications',
			                            resourceId: 'publication_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'AdvertisementGrid',
                                        iconCls: 'ui-silk ui-silk-layout',
                                        text: 'Advertisements',
			                            resourceId: 'advertisement_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'ContractGrid',
                                        iconCls: 'ui-silk ui-silk-folder-table',
                                        text: 'Contracts',
			                            resourceId: 'contract_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'PaymentGrid',
                                        iconCls: 'ui-silk ui-silk-money',
                                        text: 'Payments',
			                            resourceId: 'payment_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'TerritoryGrid',
                                        iconCls: 'ui-silk ui-silk-map',
                                        text: 'Territories',
			                            resourceId: 'territory_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
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
                                        text: 'Sales Report',
                                        resourceId: 'report_sales',
                                        resourceType: 'disable',
                                        plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'AdListGrid',
                                        iconCls: 'ui-silk ui-silk-application-view-list',
                                        text: 'Ad List',
                                        resourceId: 'report_adlist',
                                        resourceType: 'disable',
                                        plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-calculator',
                                        text: 'Commissions',
                                        resourceId: 'report_commissions',
                                        resourceType: 'disable',
                                        plugins: ['permission']
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            text: 'System',
                            menu: {
                                xtype: 'menu',
                                width: 150,
                                //title: 'HomeMenu',
                                hideMode: 'display',
                                items: [
                                    {
                                        text: 'Permissions',
                                        menu: {
                                        	xtype: 'menu',
                                        	width: 120,
                                        	hideMode: 'display',
                                        	items: [
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'PermissionRoleGrid',
                                        			text: 'Roles',
								                    resourceId: 'permission_role',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		},
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'PermissionResourceTree',
                                        			text: 'Resources',
								                    resourceId: 'permission_resource',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		}                                        		
                                        	]	
                                        }
                                    },
                                    {
                                    	text: 'Ad Types & Sizes',
                                    	itemId: 'AdvertisementSizeTypePanel',
					                    resourceId: 'advertisement_typesize',
					                    resourceType: 'disable',
					                    plugins: ['permission']
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: 'Log Out',
                            href: '/logout',
                            hrefTarget: '_self'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});