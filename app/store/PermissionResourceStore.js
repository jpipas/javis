Ext.define('JavisERP.store.PermissionResourceStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.permissionresourcestore',
    
    requires: [
        'JavisERP.model.PermissionResource'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'PermissionResourceStore',
            model: 'JavisERP.model.PermissionResource',
            root: {
            	text: 'Resources',
            	expanded: true
            }
        }, cfg)]);
    }
});