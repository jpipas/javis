Ext.define('JavisERP.store.AdList', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.AdList'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        		remoteFilter: true,
            remoteSort: true,
            autoLoad: false,
            pageSize: 100,
            storeId: 'AdList',
            model: 'JavisERP.model.AdList'
        }, cfg)]);
    }
});