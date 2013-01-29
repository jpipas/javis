Ext.define('JavisERP.model.User', {
    extend: 'Ext.data.Model',
    alias: 'model.user',

    uses: [
        'JavisERP.model.Territory'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'email'
        },
        {
            name: 'username'
        },
        {
            name: 'password'
        },
        {
            name: 'first_name'
        },
        {
            name: 'last_name'
        },
        {
            name: 'roles'
        },
        {
            name: 'manager_user_id'
        },
        {
            name: 'territory_id'
        },
        {
            name: 'created_at'
        },
        {
            name: 'deleted_at'
        }
    ],

    proxy: {
        type: 'rest',
        api: {
            create: 'server/web/index.php/user/new',
            read: 'server/web/index.php/user/',
            update: 'server/web/index.php/user/update',
            destroy: 'server/web/index.php/user/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            messageProperty: 'message',
            root: 'user',
            totalProperty: 'totalCount'
        }
    },

    hasOne: {
        associationKey: 'territory_id',
        model: 'JavisERP.model.Territory'
    }
});