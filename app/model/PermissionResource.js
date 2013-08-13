Ext.define('JavisERP.model.PermissionResource', {
    extend: 'Ext.data.Model',
    alias: 'model.permissionresource',
    fields: [
        {
            name: 'id'
        },
        {
            name: 'text',
            mapping: 'title',
            type: 'string'
        },
        {
        	name: 'title'
        },
        {
        	name: 'parent_title'
        },
        {
        	name: 'leaf'
        },
        {
        	name: 'loaded',
        	defaultValue: false
        },
        {
        	name: 'expanded',
        	defaultValue: true
        },
        {
            name: 'resourceid'
        },
        {
            name: 'parent_id'
        },
        {
        	name: 'parent_title'
        },
        {
        	name: 'is_folder'
        }
    ],
    
    proxy: {
        type: 'srest',
        url: '/permissionresource/',
        reader: {
            type: 'json',
            idProperty: 'id'
        }
    }
});