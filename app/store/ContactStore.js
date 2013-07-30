Ext.define('JavisERP.store.ContactStore', {
    extend: 'Ext.data.Store',
	alias: 'store.contactstore',

    requires: [
        'JavisERP.model.Contact'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'ContactStore',
            model: 'JavisERP.model.Contact'
        }, cfg)]);
    }
});