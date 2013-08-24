Ext.define('JavisERP.store.AdTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.adtypestore',

    requires: [
        'JavisERP.model.AdvertisementType'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	remoteFilter: true,
            remoteSort: true,
            autoLoad: true,
            storeId: 'AdType',
            model: 'JavisERP.model.AdvertisementType'
        }, cfg)]);
    }
});