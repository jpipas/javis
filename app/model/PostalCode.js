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
        type: 'srest',
        url: '/server/web/index.php/postalcode/',
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