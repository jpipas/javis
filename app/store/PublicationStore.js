Ext.define('JavisERP.store.PublicationStore', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.Publication'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: true,
            storeId: 'PublicationStoreStore',
            model: 'JavisERP.model.Publication'
        }, cfg)]);
    }
});