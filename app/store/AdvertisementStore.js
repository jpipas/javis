Ext.define('JavisERP.store.AdvertisementStore', {
    extend: 'Ext.data.Store',
    alias: 'store.advertisementstore',

    requires: [
        'JavisERP.model.Advertisement'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'AdvertisementStore',
            model: 'JavisERP.model.Advertisement'
        }, cfg)]);
    }
});