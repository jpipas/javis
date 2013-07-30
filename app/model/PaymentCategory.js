Ext.define('JavisERP.model.PaymentCategory', {
    extend: 'Ext.data.Model',
    alias: 'model.paymentCategory',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'description'
        },
        {
        	name: 'abbrev'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/paymentcategory/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment_category',
            totalProperty: 'totalCount'
        }
    }
});