Ext.define('JavisERP.store.PostalCode', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.PostalCode'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PostalCode',
            model: 'JavisERP.model.PostalCode'
        }, cfg)]);
    }
});