Ext.define('JavisERP.store.CommissionStatementStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commissionstatementstore',
    
    requires: [
        'JavisERP.model.CommissionStatement'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'CommissionStatementStore',
            model: 'JavisERP.model.CommissionStatement'
        }, cfg)]);
    }
});