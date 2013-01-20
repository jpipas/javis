Ext.define('JavisERP.model.PostalCode', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'iso_code',
            type: 'string'
        }
    ],

    proxy: {
        type: 'rest',
        api: {
            create: 'server/web/index.php/postalcode/new',
            read: 'server/web/index.php/postalcode/',
            update: 'server/web/index.php/postalcode/update',
            destroy: 'server/web/index.php/postalcode/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'postal_code',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true
        }
    }
});