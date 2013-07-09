Ext.define('JavisERP.store.User', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.User'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: true,
            storeId: 'UserStore',
            model: 'JavisERP.model.User'
        }, cfg)]);
    }
});