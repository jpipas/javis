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
        url: '/paymenttype/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment_type',
            totalProperty: 'totalCount'
        }
    }
});