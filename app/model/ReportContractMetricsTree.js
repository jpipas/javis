Ext.define('JavisERP.model.ReportContractMetricsTree', {
    extend: 'Ext.data.Model',
    alias: 'model.reportcontractmetricstree',
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
        	name: 'avg_discount_1'
        },
        {
        	type: 'float',
        	name: 'avg_discount_2'
        },
        {
        	type: 'float',
        	name: 'avg_discount_3'
        },
        {
        	type: 'float',
        	name: 'avg_discount_4'
        },
        {
        	type: 'float',
        	name: 'avg_duration'
        },
        {
        	type: 'int',
        	name: 'duration_1'
        },
        {
        	type: 'int',
        	name: 'duration_2'
        },
        {
        	type: 'int',
        	name: 'duration_3'
        },
        {
        	type: 'int',
        	name: 'duration_4'
        },
        {
        	type: 'int',
        	name: 'paytype_cc'
        },
        {
        	type: 'int',
        	name: 'paytype_ck'
        },
        {
        	type: 'int',
        	name: 'paytype_ach'
        },
        {
        	type: 'int',
        	name: 'paytype_trade'
        },
        {
        	type: 'int',
        	name: 'revenue_affecting'
        }
    ],
    
    proxy: {
        type: 'srest',
        url: '/report/contractmetrics/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'children',
            remoteFilter: true,
            totalProperty: 'totalCount'
        }
    }
});