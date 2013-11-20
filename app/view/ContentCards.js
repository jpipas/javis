Ext.define('JavisERP.view.ContentCards', {
    extend: 'Ext.container.Container',
    alias: 'widget.contentCards',

    requires: [
        'JavisERP.view.Activities',
        'JavisERP.view.ActivityGrid',
        'JavisERP.view.ClientGrid',
        'JavisERP.view.TerritoryGrid',
        'JavisERP.view.ClientRecord',
        'JavisERP.view.PublicationGrid',
        'JavisERP.view.AdvertisementGrid',
        'JavisERP.view.AdvertisementSizeType',
        'JavisERP.view.ContractGrid',
        'JavisERP.view.UserGrid',
        'JavisERP.view.AdListGrid',
        'JavisERP.view.PortletPanel',
        'JavisERP.view.PaymentGrid',
        'JavisERP.view.PermissionResourceTree',
        'JavisERP.view.PermissionRoleGrid'
    ],

    layout: {
        type: 'card'
    },
    
    layoutConfig: {
    	deferredRender: true
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'portletpanel',
                    id:'app-portal'
                },
                {
                    xtype: 'activities',
                    title: 'ActivityPanel'
                },
                {
                    xtype: 'activitygrid',
                    itemId: 'ActivityGrid'
                },
                {
                    xtype: 'clientgrid',
                    itemId: 'ClientGrid'
                },
                {
                    xtype: 'territorygrid',
                    itemId: 'TerritoryGrid'
                },
                {
                    xtype: 'regiongrid',
                    itemId: 'RegionGrid'
                },
                {
                    xtype: 'clientrecord',
                    itemId: 'ClientRecord',
                    layout: {
                    	type: 'anchor'
                    }
                },
                {
                    xtype: 'publicationgrid',
                    itemId: 'PublicationGrid'
                },
                {
                    xtype: 'contractgrid',
                    itemId: 'ContractGrid'
                },
                {
                    xtype: 'paymentgrid',
                    itemId: 'PaymentGrid',
                    deferredRender: true,
                },
                {
                    xtype: 'advertisementgrid',
                    itemId: 'AdvertisementGrid'
                },
                {
                    xtype: 'usergrid',
                    itemId: 'UserGrid'
                },
                {
                    xtype: 'adlistgrid',
                    itemId: 'AdListGrid'
                },
                {
                    xtype: 'permissionresourcetree',
                    itemId: 'PermissionResourceTree'
                },
                {
                    xtype: 'permissionroles',
                    itemId: 'PermissionRoleGrid'
                },
                {
                    xtype: 'advertisementsizetype',
                    itemId: 'AdvertisementSizeTypePanel'
                },
                {
                    xtype: 'commissioncyclegrid',
                    itemId: 'CommissionCycleGrid'
                },
                {
                    xtype: 'commissionstatementpanel',
                    itemId: 'CommissionStatementPanel'
                },
                {
                    xtype: 'commissionstatementviewgrid',
                    itemId: 'CommissionStatementViewGrid'
                },
                {
                    xtype: 'commissionbaselinegrid',
                    itemId: 'CommissionBaselineGrid'
                },
                {
                    xtype: 'productionphotospanel',
                    itemId: 'ProductionPhotosPanel'
                },
                {
                    xtype: 'reportperiodsalesbyterritorytree',
                    itemId: 'ReportPeriodSalesByTerritoryTree'
                },
                {
                    xtype: 'reportperiodsalesbysalesreptree',
                    itemId: 'ReportPeriodSalesBySalesRepTree'
                },
                {
                    xtype: 'reportcontractmetricstree',
                    itemId: 'ReportContractMetricsTree'
                }
            ]
        });

        me.callParent(arguments);
    }

});