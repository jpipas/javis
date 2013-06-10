Ext.define('JavisERP.store.ActivityStatusStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'activityStatusStore',
            proxy: {
                type: 'ajax',
                url: '/server/web/index.php/activitystatus/',
                reader: {
                    type: 'json',
                    idProperty: 'id',
                    root: 'activitystatus',
                    totalProperty: 'totalCount'
                }
            },
            fields: [
                {
                    name: 'id'
                },
                {
                    name: 'description'
                }
            ]
        }, cfg)]);
    }
});