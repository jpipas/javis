Ext.define('JavisERP.store.AdSizeStore', {
    extend: 'Ext.data.Store',
	alias: 'store.adsizestore',
	
    requires: [
        'JavisERP.model.AdvertisementSize'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	remoteFilter: true,
            remoteSort: true,
            autoLoad: true,
            storeId: 'AdSize',
            model: 'JavisERP.model.AdvertisementSize'
        }, cfg)]);
    }
});