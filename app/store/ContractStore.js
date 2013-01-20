Ext.define('JavisERP.store.ContractStore', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.Contract'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            storeId: 'contractStore',
            model: 'JavisERP.model.Contract',
            pageSize: 45
        }, cfg)]);
    }
});