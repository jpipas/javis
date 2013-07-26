Ext.define('JavisERP.store.Duration', {
    extend: 'Ext.data.Store',
    alias: 'store.durationstore',

    requires: [
        'JavisERP.model.Duration'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            remoteFilter: true,
            storeId: 'DurationStore',
            model: 'JavisERP.model.Duration'
        }, cfg)]);
    }
});