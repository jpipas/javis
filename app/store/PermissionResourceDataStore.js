Ext.define('JavisERP.store.PermissionResourceDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.permissionresourcedatastore',
    
    requires: [
        'JavisERP.model.PermissionResource'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'PermissionResourceDataStore',
            model: 'JavisERP.model.PermissionResource'
        }, cfg)]);
    }
});