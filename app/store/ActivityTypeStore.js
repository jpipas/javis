Ext.define('JavisERP.store.ActivityTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.activitytypestore',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'activityTypeStore',
            proxy: {
                type: 'ajax',
                url: '/server/web/index.php/activitytype/',
                reader: {
                    type: 'json',
                    idProperty: 'id',
                    root: 'activitytype',
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