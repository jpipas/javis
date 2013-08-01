Ext.define('JavisERP.model.Duration', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'description'
        },
        {
            name: 'date_string'
        }
    ],
    proxy: {
        type: 'srest',
        url: '/duration/',
        reader: {
            type: 'json',
            root: 'duration',
            totalProperty: 'totalCount'
        }
    }
});