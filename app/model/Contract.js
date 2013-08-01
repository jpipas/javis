Ext.define('JavisERP.model.Contract', {
    extend: 'Ext.data.Model',
    alias: 'model.contract',

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
            name: 'payment_term_description'
        },
        {
            name: 'payment_term_id'
        },
        {
            name: 'payment_type_description'
        },
        {
            name: 'payment_type_id'
        },
        {
        	name: 'soldby_id'
        },
        {
        	name: 'soldby_name'
        },
        {
            name: 'sale_date',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'client_id',
            type: 'int'
        },
        {
        		name: 'client_company_name'
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
        		name: 'territory_name'
        },
        {
            name: 'durations'
        },
        {
        		name: 'advertisements'
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