Ext.define('JavisERP.model.ReportPeriodSalesBySalesRepTree', {
    extend: 'Ext.data.Model',
    alias: 'model.reportperiodsalesbysalesreptree',
    fields: [
        {
            name: 'id'
        },
        {
            name: 'text',
            type: 'string'
        },
        {
        	name: 'territory_name'
        },
        {
        	name: 'leaf'
        },
        {
        	name: 'loaded',
        	defaultValue: false
        },
        {
        	name: 'expanded',
        	defaultValue: false
        },
        {
            name: 'state_name'
        },
        {
        	name: 'state_abbr'
        },
        {
            name: 'manager_name'
        },
        {
        	name: 'company_name'
        },
        {
        	type: 'int',
        	name: 'total_contracts'
        },
        {
        	type: 'int',
        	name: 'active_contracts'
        },
        {
        	type: 'int',
        	name: 'inactive_contracts'
        },
        {
        	type: 'int',
        	name: 'design_contracts'
        },
        {
        	type: 'float',
        	name: 'subtotal'
        },
        {
        	type: 'float',
        	name: 'monthly_payment'
        },
        {
        	type: 'float',
        	name: 'design_fee'
        },
        {
        	type: 'float',
        	name: 'avg_discount'
        },
        {
        	type: 'float',
        	name: 'avg_duration'
        },
        {
        	type: 'int',
        	name: 'avg_cc'
        },
        {
        	type: 'int',
        	name: 'avg_ck'
        },
        {
        	type: 'int',
        	name: 'avg_ach'
        },
        {
        	type: 'int',
        	name: 'avg_trade'
        },
        {
        	type: 'int',
        	name: 'revenue_affecting'
        }
    ],
    
    proxy: {
        type: 'srest',
        url: '/report/periodsalesbysalesrep/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'children',
            remoteFilter: true,
            totalProperty: 'totalCount'
        }
    }
});