Ext.define('JavisERP.store.State', {
    extend: 'Ext.data.Store',
    alias: 'store.statestore',

    requires: [
        'JavisERP.model.State'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	remoteFilter: false,
            remoteSort: false,
            autoLoad: true,
            storeId: 'State',
            model: 'JavisERP.model.State'
        }, cfg)]);
    }
});