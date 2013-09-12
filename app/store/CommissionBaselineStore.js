Ext.define('JavisERP.store.CommissionBaselineStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commissionbaselinestore',
    
    requires: [
        'JavisERP.model.CommissionBaseline'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'CommissionBaselineStore',
            model: 'JavisERP.model.CommissionBaseline'
        }, cfg)]);
    }
});