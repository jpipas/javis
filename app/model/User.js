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
            name: 'fullname'
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
        },
        {
            name: 'territory'
        },
        {
            name: 'territory_name',
            mapping: 'territory.name'
        },
        {
            name: 'territory'
        },
        {
            name: 'last_login'
        },
        {
            name: 'manager'
        },
        {
            name: 'manager_username',
            mapping: 'manager.username'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/user/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'user',
            totalProperty: 'totalCount'
        }
    }
});