Ext.define('JavisERP.view.override.ContentCards', {
    override: 'JavisERP.view.ContentCards',
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
                }
            ]
        });

        me.callParent(arguments);
    }
});