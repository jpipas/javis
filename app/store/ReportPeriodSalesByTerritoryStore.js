Ext.define('JavisERP.store.ReportPeriodSalesByTerritoryStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.reportperiodsalesbyterritorystore',
    
    requires: [
        'JavisERP.model.ReportPeriodSalesByTerritoryTree'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'ReportPeriodSalesByTerritoryStore',
            model: 'JavisERP.model.ReportPeriodSalesByTerritoryTree',
            root: {
            	text: 'Locations',
            	expanded: true
            }
        }, cfg)]);
    }
});