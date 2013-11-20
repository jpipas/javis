Ext.define('JavisERP.model.Territory', {
    extend: 'Ext.data.Model',
    alias: 'model.territory',

    uses: [
        'JavisERP.model.State'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'state_id'
        },
        {
            name: 'state_name'
        },
        {
        	name: 'manager'
        },
        {
            name: 'manager_username',
        },
        {
            name: 'manager_id'
        },
        {
            name: 'manager_email'
        },
        {
            name: 'manager_name'
        },
        {
        	name: 'cycle_id'
        },
        {
        	name: 'cycle_title'
        },
        {
        	name: 'region_id'
        },
        {
        	name: 'region_title'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/territory/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'territory',
            totalProperty: 'totalCount'
        }
    }
});