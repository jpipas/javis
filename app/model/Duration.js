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
        type: 'rest',
        api: {
            create: '/server/web/index.php/duration/new',
            read: '/server/web/index.php/contract/duration/',
            update: '/server/web/index.php/duration/update',
            destory: '/server/web/index.php/duration/delete'
        },
        reader: {
            type: 'json',
            root: 'duration',
            totalProperty: 'totalCount'
        }
    }
});