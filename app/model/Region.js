Ext.define('JavisERP.model.Region', {
    extend: 'Ext.data.Model',
    alias: 'model.region',

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'manager_id'
        },
        {
            name: 'manager_name'
        },
        {
        	name: 'territories'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/region/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'region',
            totalProperty: 'totalCount'
        }
    }
});