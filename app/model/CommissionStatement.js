Ext.define('JavisERP.model.CommissionStatement', {
    extend: 'Ext.data.Model',

	idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'employee_id'
        },
        {
        	name: 'fullname'
        },
        {
        	name: 'territories'
        },
        {
        	name: 'amount_publisher'
        },
        {
        	name: 'amount_salesrep'
        },
        {
        	name: 'date_string',
        	type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
        	name: 'period_id'
        },
        {
        	name: 'locked_at'
        },
        {
        	name: 'pdf'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/commission/statement/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'statement',
            totalProperty: 'totalCount'
        }
    }
});