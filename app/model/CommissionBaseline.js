Ext.define('JavisERP.model.CommissionBaseline', {
    extend: 'Ext.data.Model',
    alias: 'model.commissionbaseline',
    fields: [
        {
            name: 'id'
        },
        {
            name: 'period_id'
        },
        {
        	name: 'duration_description'
        },
        {
        	name: 'territory_id'
        },
        {
        	name: 'territory_name'
        },
        {
        	name: 'publication_id'
        },
        {
        	name: 'publication_description'
        },
        {
        	name: 'manager_id'
        },
        {
        	name: 'manager_fullname'
        },
        {
        	name: 'pages'
        },
        {
        	name: 'baseline'
        },
        {
        	name: 'baselines'
        }
    ],
    
    proxy: {
        type: 'srest',
        url: '/commission/baseline/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'baseline',
            totalProperty: 'totalCount'
        }
    }
});