Ext.define('JavisERP.model.Production', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
        },
        {
        	name: 'upload_id'
        },
        {
        	name: 'file_thumb'
        },
        {
        	name: 'file_full'
        },
        {
            name: 'title'
        },
        {
            name: 'filename'
        },
        {
        	name: 'filesize'
        },
        {
            name: 'folder'
        },
        {
            name: 'filetype'
        },
        {
            name: 'type_id'
        },
        {
        	name: 'type_title'
        },
        {
            name: 'territory_id'
        },
        {
            name: 'territory_name'
        },
        {
            name: 'publication_id'
        },
        {
            name: 'publication_description'
        },
        {
            name: 'keywords'
        },
        {
            name: 'client_id'
        },
        {
            name: 'client_company_name'
        },
        {
            name: 'insert_user_id'
        },
        {
            name: 'insert_fullname'
        },
        {
            name: 'created_at',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/production/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'production',
            totalProperty: 'totalCount'
        }
    }
});