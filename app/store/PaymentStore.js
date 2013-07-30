Ext.define('JavisERP.store.PaymentStore', {
    extend: 'Ext.data.Store',
		alias: 'store.paymentstore',
		
    requires: [
        'JavisERP.model.Payment'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'PaymentStore',
            model: 'JavisERP.model.Payment'
        }, cfg)]);
    }
});