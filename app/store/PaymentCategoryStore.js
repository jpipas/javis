Ext.define('JavisERP.store.PaymentCategoryStore', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentcategorystore',

    requires: [
        'JavisERP.model.PaymentCategory'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PaymentCategoryStore',
            model: 'JavisERP.model.PaymentCategory'
        }, cfg)]);
    }
});