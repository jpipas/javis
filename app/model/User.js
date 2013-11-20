Ext.define('JavisERP.model.User', {
    extend: 'Ext.data.Model',
    alias: 'model.user',

    uses: [
        'JavisERP.model.Territory'
    ],
    
    idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'email'
        },
        {
        	name: 'phone'
        },
        {
            name: 'username'
        },
        {
            name: 'password'
        },
        {
            name: 'retype-password'
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
        	name: 'regional_user_id'
        },
        {
            name: 'created_at',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'deleted_at',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'last_login',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'manager'
        },
        {
            name: 'manager_name'
        },
        {
        	name: 'regional_name'
        },
        {
        	name: 'disabled'
        },
        {
        	name: 'newpassword'
        },
        {
        	name: 'territories'
        },
        {
        	name: 'profitshare'
        },
        {
        	name: 'salesrep_comm'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/user/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'user',
            totalProperty: 'totalCount'
        }
    }
});