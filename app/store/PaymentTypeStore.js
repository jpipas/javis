Ext.define('JavisERP.store.PaymentTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.paymenttypestore',

    requires: [
        'JavisERP.model.PaymentType'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PaymentTypeStore',
            model: 'JavisERP.model.PaymentType'
        }, cfg)]);
    }
});