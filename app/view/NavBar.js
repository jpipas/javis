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
                        /*
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
                        */
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
                                    /*{
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-application-edit',
                                        text: 'Preferences'
                                    },*/
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
                        /*
                        {
                        	itemId: 'ActivityGrid',
                            text: 'Activities',
                            resourceId: 'activity_view',
                            plugins: ['permission']
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        */
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
                                        text: 'Locations',
			                            resourceId: 'territory_view',
			                            resourceType: 'disable',
			                            plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        itemId: 'RegionGrid',
                                        iconCls: 'ui-silk ui-silk-world',
                                        text: 'Regions',
			                            resourceId: 'region_view',
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
                                hideMode: 'display',
                                //title: 'ReportsMenu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-money',
                                        text: 'Sales Report',
                                        menu: {
                                        	xtype: 'menu',
                                        	width: 170,
                                        	hideMode: 'display',
                                        	items: [
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'ReportPeriodSalesByTerritoryTree',
                                        			text: 'Period Sales by Location',
								                    resourceId: 'report_periodsalesbyterritory',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		},
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'ReportPeriodSalesBySalesRepTree',
                                        			text: 'Period Sales by Sales Rep',
								                    resourceId: 'report_periodsalesbysalesrep',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		},
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'ReportContractMetricsTree',
                                        			text: 'Contract Metrics',
								                    resourceId: 'report_contractmetrics',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		}
                                        	]	
                                        }
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
                                        text: 'Baseline Revenue Report',
                                        menu: {
                                        	xtype: 'menu',
                                        	hideMode: 'display',
                                        	items: [
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'CommissionBaselineGrid',
                                        			text: 'Baselines',
								                    resourceId: 'commission_baseline',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		},
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'CommissionStatementPanel',
                                        			text: 'Generate',
								                    resourceId: 'commission_statement',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		},
                                        		{
                                        			xtype: 'menuitem',
                                        			itemId: 'CommissionStatementViewGrid',
                                        			text: 'Statements',
								                    resourceId: 'commission_statement_view',
								                    resourceType: 'disable',
								                    plugins: ['permission']
                                        		}
                                        	]	
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            text: 'Production',
                            menu: {
                                xtype: 'menu',
                                width: 150,
                                hideMode: 'display',
                                items: [
                                	{
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-page',
                                        text: 'Documents',
                                        itemId: 'ProductionDocumentsGrid',
                                        resourceId: 'production_documents_view',
                                        resourceType: 'disable',
                                        plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-picture',
                                        text: 'Photos',
                                        itemId: 'ProductionPhotosPanel',
                                        resourceId: 'production_photos_view',
                                        resourceType: 'disable',
                                        plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-newspaper',
                                        text: 'Publications',
                                        itemId: 'ProductionPublicationsPanel',
                                        resourceId: 'production_publications_view',
                                        resourceType: 'disable',
                                        plugins: ['permission']
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'ui-silk ui-silk-layout',
                                        text: 'Advertisements',
                                        itemId: 'ProductionAdvertisementsPanel',
                                        resourceId: 'production_advertisements_view',
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
                                    },
                                    {
                                    	text: 'Revenue Cycles',
                                    	itemId: 'CommissionCycleGrid',
					                    resourceId: 'commission_cycle',
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