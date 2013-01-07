Ext.define('JavisERP.store.PaymentTermStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PaymentTerm',

    requires: [
        'JavisERP.model.PaymentTerm'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PaymentTermStore',
            model: 'JavisERP.model.PaymentTerm'
        }, cfg)]);
    }
});