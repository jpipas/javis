Ext.define('JavisERP.model.CommissionPeriod', {
    extend: 'Ext.data.Model',
    alias: 'model.commissionperiod',
    fields: [
        {
            name: 'id'
        },
        {
            name: 'text',
            type: 'string'
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
            name: 'duration_id'
        },
        {
        	name: 'duration_description'
        },
        {
            name: 'cycle_id'
        },
        {
        	name: 'cycle_title'
        },
        {
        	name: 'cutoff_date',
        	dateFormat: 'Y-m-d'
        },
        {
        	name: 'locked_at'
        },
        {
        	name: 'payments'
        }
    ],
    
    proxy: {
        type: 'srest',
        url: '/commission/period/current',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'children',
            totalProperty: 'totalCount'
        }
    }
});