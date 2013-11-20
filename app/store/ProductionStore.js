Ext.define('JavisERP.store.ProductionStore', {
    extend: 'Ext.data.Store',
    alias: 'store.productionstore',

    requires: [
        'JavisERP.model.Production'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'ProductionStore',
            model: 'JavisERP.model.Production'
        }, cfg)]);
    }
});