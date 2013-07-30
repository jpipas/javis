Ext.define('JavisERP.store.TerritoryStore', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.Territory'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'TerritoryStore',
            model: 'JavisERP.model.Territory'
        }, cfg)]);
    }
});