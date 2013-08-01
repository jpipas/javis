Ext.define('JavisERP.model.State', {
    extend: 'Ext.data.Model',
    alias: 'model.state',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'name'
        },
        {
            name: 'abbr'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/state/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'state',
            totalProperty: 'totalCount'
        }
    }
});