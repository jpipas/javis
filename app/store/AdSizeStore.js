Ext.define('JavisERP.store.AdSizeStore', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.AdvertisementSize'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'AdSize',
            model: 'JavisERP.model.AdvertisementSize'
        }, cfg)]);
    }
});