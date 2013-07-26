Ext.define('JavisERP.store.ContractStore', {
    extend: 'Ext.data.Store',
	alias: 'store.contractstore',

    requires: [
        'JavisERP.model.Contract'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'ContractStore',
            model: 'JavisERP.model.Contract'
        }, cfg)]);
    }
});