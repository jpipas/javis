Ext.define('JavisERP.store.ReportContractMetricsStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.reportcontractmetricsstore',
    
    requires: [
        'JavisERP.model.ReportContractMetricsTree'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'ReportContractMetricsStore',
            model: 'JavisERP.model.ReportContractMetricsTree',
            root: {
            	text: 'Company',
            	expanded: true
            }
        }, cfg)]);
    }
});