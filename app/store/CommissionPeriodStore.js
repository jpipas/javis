Ext.define('JavisERP.store.CommissionPeriodStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.commissionperiodstore',
    
    requires: [
        'JavisERP.model.CommissionPeriod'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'CommissionPeriodStore',
            model: 'JavisERP.model.CommissionPeriod',
            root: {
            	text: 'Periods',
            	expanded: true
            }
        }, cfg)]);
    }
});