Ext.define('JavisERP.store.State', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.State'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'State',
            model: 'JavisERP.model.State'
        }, cfg)]);
    }
});