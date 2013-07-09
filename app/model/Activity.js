Ext.define('JavisERP.model.Activity', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'title'
        },
        {
            name: 'post_date',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'post_time',
            type: 'date',
            dateFormat: 'H:i:s'
        },
        {
        		name: 'client'
        },
        {
            name: 'client_id'
        },
        {
            name: 'client_name'
        },
        {
        		name: 'owner'
        },
        {
            name: 'owner_id'
        },
        {
            name: 'owner_name'
        },
        {
            name: 'status_id'
        },
        {
            name: 'status_cls',
            mapping: 'status.cls'
        },
        {
            name: 'status_cls_edit',
            mapping: 'status.clsEdit'
        },
        {
            name: 'status_cls_add',
            mapping: 'status.clsAdd'
        },
        {
            name: 'status_cls_delete',
            mapping: 'status.clsDelete'
        },
        {
        		name: 'assigned_to'
        },
        {
            name: 'assigned_to_id'
        },
        {
            name: 'assigned_to_name'
        },
        {
            name: 'type_id'
        },
        {
            name: 'type_cls',
            mapping: 'type.cls'
        },
        {
            name: 'type_cls_edit',
            mapping: 'type.clsEdit'
        },
        {
            name: 'type_cls_add',
            mapping: 'type.clsAdd'
        },
        {
            name: 'type_cls_delete',
            mapping: 'type.clsDelete'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/activity/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'activity',
            totalProperty: 'totalCount'
        }
    }
});