Ext.define('JavisERP.store.AdTypeStore', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.AdvertisementType'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'AdType',
            model: 'JavisERP.model.AdvertisementType'
        }, cfg)]);
    }
});