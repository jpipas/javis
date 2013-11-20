Ext.define('JavisERP.store.RegionStore', {
    extend: 'Ext.data.Store',
    alias: 'store.regionstore',

    requires: [
        'JavisERP.model.Region'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'RegionStore',
            model: 'JavisERP.model.Region'
        }, cfg)]);
    }
});