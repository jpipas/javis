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
            name: 'id',
            type: 'int'
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