Ext.define('JavisERP.store.CommissionCycleStore', {
    extend: 'Ext.data.Store',
	alias: 'store.commissioncyclestore',
	
    requires: [
        'JavisERP.model.CommissionCycle'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	remoteFilter: true,
            remoteSort: true,
            autoLoad: true,
            storeId: 'CommissionCycle',
            model: 'JavisERP.model.CommissionCycle'
        }, cfg)]);
    }
});