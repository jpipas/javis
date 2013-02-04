Ext.define('JavisERP.model.PaymentTerm', {
    extend: 'Ext.data.Model',
    alias: 'model.paymentTerm',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'description'
        },
        {
            name: 'type'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: '/server/web/index.php/paymentterm/new',
            read: '/server/web/index.php/paymentterm/',
            update: '/server/web/index.php/paymentterm/update',
            destroy: '/server/web/index.php/paymentterm/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment_term',
            totalProperty: 'totalCount'
        }
    }
});