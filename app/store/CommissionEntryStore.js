Ext.define('JavisERP.store.CommissionEntryStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commissionentrystore',
    
    requires: [
        'JavisERP.model.CommissionEntry'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'CommissionEntryStore',
            model: 'JavisERP.model.CommissionEntry'
        }, cfg)]);
    }
});