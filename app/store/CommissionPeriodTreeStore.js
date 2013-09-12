Ext.define('JavisERP.store.CommissionPeriodTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.commissionperiodtreestore',
    
    requires: [
        'JavisERP.model.CommissionPeriod'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'CommissionPeriodTreeStore',
            model: 'JavisERP.model.CommissionPeriod',
            root: {
            	text: 'Periods',
            	expanded: true
            }
        }, cfg)]);
    }
});