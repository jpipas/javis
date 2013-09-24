Ext.define('JavisERP.model.CommissionEntry', {
    extend: 'Ext.data.Model',

	idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
        	name: 'contract_number'
        },
        {
        	name: 'client_company_name'
        },
		{
			name: 'paycat_abbrev'
		},
		{
			name: 'territory_name'
		},
        {
        	name: 'publisher_statement_id'
        },
    	{
    		name: 'salesrep_statement_id'
    	},
    	{
    		name: 'contract_id'
    	},
    	{
    		name: 'payment_id'
    	},
    	{
    		name: 'duration_id',
    	},
    	{
    		name: 'postdate',
    		type: 'date',
            dateFormat: 'Y-m-d'
    	},
    	{
    		name: 'date_string',
    		type: 'date',
            dateFormat: 'Y-m-d'
    	},
    	{
    		name: 'amount'
    	},
    	{
    		name: 'publisher_id'
    	},
    	{
    		name: 'publisher_fullname'
    	},
    	{
    		name: 'salesrep_fullname'
    	},
    	{
    		name: 'salesrep_id'
    	},
    	{
    		name: 'bonus'
    	},
    	{
    		name: 'publisher_comm'
    	},
    	{
    		name: 'salesrep_comm'
    	},
    	{
    		name: 'paycat_id'
    	},
    	{
    		name: 'manually_adjusted'
    	}
    ],

    proxy: {
        type: 'srest',
        url: '/commission/entry/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'entry',
            totalProperty: 'totalCount'
        }
    }
});