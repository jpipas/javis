Ext.define('JavisERP.view.ContentCards', {
    extend: 'Ext.container.Container',
    alias: 'widget.contentCards',

    requires: [
        'JavisERP.view.Activities',
        'JavisERP.view.ClientGrid',
        'JavisERP.view.TerritoryGrid',
        'JavisERP.view.ClientRecord',
        'JavisERP.view.PublicationGrid',
        'JavisERP.view.AdvertisementGrid',
        'JavisERP.view.ContractGrid',
        'JavisERP.view.UserGrid'
    ],

    layout: {
        type: 'card'
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
                    xtype: 'clientgrid',
                    itemId: 'ClientGrid'
                },
                {
                    xtype: 'territorygrid',
                    itemId: 'TerritoryGrid'
                },
                {
                    xtype: 'clientrecord',
                    itemId: 'ClientRecord'
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
                    xtype: 'advertisementgrid',
                    itemId: 'AdvertisementGrid'
                },
                {
                    xtype: 'usergrid',
                    itemId: 'UserGrid'
                }
            ]
        });

        me.callParent(arguments);
    }

});