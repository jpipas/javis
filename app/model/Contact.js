Ext.define('JavisERP.model.Contact', {
    extend: 'Ext.data.Model',
    alias: 'model.contact',

    uses: [
        'JavisERP.model.Role',
        'JavisERP.model.Client'
    ],

    idProperty: 'id',

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
            name: 'role'
        },
        {
            name: 'role_name'
        },
        {
            name: 'revoke_view'
        },
        {
            name: 'revoke_delete'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/contact/',
        reader: {
            type: 'json',
            root: 'contact',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});