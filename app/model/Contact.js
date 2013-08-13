Ext.define('JavisERP.model.Contact', {
    extend: 'Ext.data.Model',
    alias: 'model.contact',

    uses: [
        'JavisERP.model.Role',
        'JavisERP.model.Client'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'full_name'
        },
        {
            name: 'email_address'
        },
        {
            name: 'phone'
        },
        {
            name: 'role_id'
        },
        {
            name: 'client_id'
        },
        {
        	name: 'client_company_name'
        },
        {
            name: 'role'
        },
        {
            name: 'role_name'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/contact/',
        reader: {
            type: 'json',
            root: 'contact',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});