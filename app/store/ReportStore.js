Ext.define('JavisERP.store.ReportStore', {
    extend: 'Ext.data.Store',
    alias: 'store.reportstore',
    
    requires: [
        'JavisERP.model.Report'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'ReportStore',
            model: 'JavisERP.model.Report'
        }, cfg)]);
    }
});