Ext.define('JavisERP.store.PermissionResourceCheckStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.permissionresourcecheckstore',
    
    requires: [
        'JavisERP.model.PermissionResource'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'PermissionResourceCheckStore',
            model: 'JavisERP.model.PermissionResource',
            root: {
            	text: 'Resources',
            	expanded: true
            }
        }, cfg)]);
    }
});