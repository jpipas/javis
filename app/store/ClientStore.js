Ext.define('JavisERP.store.ClientStore', {
    extend: 'Ext.data.Store',
    alias: 'store.clientstore',

    requires: [
        'JavisERP.model.Client'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        		remoteFilter: true,
        		remoteSort: true,
        		pageSize: 50,
            autoLoad: false,
            storeId: 'ClientStore',
            model: 'JavisERP.model.Client'
        }, cfg)]);
    }
});