Ext.define('JavisERP.model.PaymentType', {
    extend: 'Ext.data.Model',
    alias: 'model.paymentType',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'description'
        }
    ],

    proxy: {
        type: 'srest',
        api: {
            create: '/server/web/index.php/paymenttype/new',
            read: '/server/web/index.php/paymenttype/',
            update: '/server/web/index.php/paymenttype/update',
            destroy: '/server/web/index.php/paymenttype/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment_type',
            totalProperty: 'totalCount'
        }
    }
});