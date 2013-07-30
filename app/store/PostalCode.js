Ext.define('JavisERP.store.PostalCode', {
    extend: 'Ext.data.Store',
    alias: 'store.postalcodestore',

    requires: [
        'JavisERP.model.PostalCode'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'PostalCode',
            model: 'JavisERP.model.PostalCode'
        }, cfg)]);
    }
});