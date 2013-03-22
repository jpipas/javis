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
        api: {
            create: '/server/web/index.php/state/new',
            read: '/server/web/index.php/state/',
            update: '/server/web/index.php/state/update',
            destroy: '/server/web/index.php/state/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'state',
            totalProperty: 'totalCount'
        }
    }
});