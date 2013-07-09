Ext.define('JavisERP.store.ActivityStore', {
    extend: 'Ext.data.Store',
    alias: 'store.activitystore',

    requires: [
        'JavisERP.model.Activity'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: true,
            storeId: 'ActivityStore',
            model: 'JavisERP.model.Activity'
        }, cfg)]);
    }
});