Ext.define('JavisERP.store.CommissionStatementViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commissionstatementviewstore',
    
    requires: [
        'JavisERP.model.CommissionStatementView'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'CommissionStatementViewStore',
            model: 'JavisERP.model.CommissionStatementView',
	        sorters : {
	        	property: 'date_string',
	        	direction: 'DESC'
	        }
        }, cfg)]);
    }
});