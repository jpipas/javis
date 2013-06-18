Ext.define('JavisERP.model.Contract', {
    extend: 'Ext.data.Model',
    alias: 'model.contract',

    uses: [
        'JavisERP.model.Client',
        'JavisERP.model.PaymentTerm',
        'JavisERP.model.Duration',
        'JavisERP.util.SilexRest'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'contract_number',
            type: 'string'
        },
        {
            name: 'total_sales',
            type: 'float'
        },
        {
            name: 'discount',
            type: 'float'
        },
        {
            name: 'subtotal',
            type: 'float'
        },
        {
            name: 'first_months_payment',
            type: 'float'
        },
        {
            name: 'monthly_payment',
            type: 'float'
        },
        {
            name: 'payment_term_description',
            mapping: 'payment_term.description'
        },
        {
            name: 'payment_term_id'
        },
        {
            name: 'sale_date',
            type: 'date'
        },
        {
            name: 'client_id',
            type: 'int'
        },
        {
            name: 'design_fee',
            type: 'float'
        },
        {
            name: 'total_amount',
            type: 'float'
        },
        {
            name: 'territory_id',
            type: 'int'
        },
        {
            name: 'territory_name',
            mapping: 'territory.name'
        },
        {
            name: 'durations'
        },
        {
            name: 'is_new'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/contract/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'contract',
            totalProperty: 'totalCount'
        }
    }
});