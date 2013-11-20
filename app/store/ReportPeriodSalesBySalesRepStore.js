Ext.define('JavisERP.store.ReportPeriodSalesBySalesRepStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.reportperiodsalesbysalesrepstore',
    
    requires: [
        'JavisERP.model.ReportPeriodSalesBySalesRepTree'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'ReportPeriodSalesBySalesRepStore',
            model: 'JavisERP.model.ReportPeriodSalesBySalesRepTree',
            root: {
            	text: 'Sales Reps',
            	expanded: true
            }
        }, cfg)]);
    }
});