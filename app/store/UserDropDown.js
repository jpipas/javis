Ext.define('JavisERP.store.UserDropDown', {
    extend: 'Ext.data.Store',

    requires: [
        'JavisERP.model.User'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,
            autoLoad: false,
            storeId: 'UserDropDownStore',
            model: 'JavisERP.model.User'
        }, cfg)]);
    }
});