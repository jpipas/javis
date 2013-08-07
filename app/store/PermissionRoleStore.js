Ext.define('JavisERP.store.PermissionRoleStore', {
    extend: 'Ext.data.Store',
    alias: 'store.permissionrolestore',

    requires: [
        'JavisERP.model.PermissionRole'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'PermissionRoleStore',
            model: 'JavisERP.model.PermissionRole'
        }, cfg)]);
    }
});