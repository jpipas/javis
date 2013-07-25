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
        type: 'srest',
        url: '/paymentterm/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment_term',
            totalProperty: 'totalCount'
        }
    }
});