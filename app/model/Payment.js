Ext.define('JavisERP.model.Payment', {
    extend: 'Ext.data.Model',
	alias: 'model.payment',
	
    uses: [
        'JavisERP.model.Client',
        'JavisERP.model.Contract',
        'JavisERP.model.PaymentType',
        'JavisERP.model.PaymentCategory',
        'JavisERP.model.Duration'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'type'
        },
        {
            name: 'payment_type_description'
        },
        {
        	name: 'payment_type_id',
        },
        {
            name: 'created_at',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'updated_at',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'insert_user_id'
        },
        {
            name: 'update_user_id'
        },
        {
            name: 'payment_amount'
        },
        {
            name: 'client_company_name'
        },
        {
            name: 'client_id'
        },
        {
            name: 'client'
        },
        {
        	name: 'contract'
        },
        {
        	name: 'contract_number'
        },
        {
            name: 'contract_id'
        },
        {
            name: 'durations'
        },
        {
            name: 'payment_category_description'
        },
        {
            name: 'payment_category_id'
        },
        {
            name: 'payment_category_abbrev'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/payment/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment',
            totalProperty: 'totalCount'
        }
    }
});