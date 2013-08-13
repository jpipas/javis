Ext.define('JavisERP.model.UserPassword', {
    extend: 'Ext.data.Model',
    alias: 'model.userpassword',
    
    idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'password'
        },
        {
            name: 'retype-password'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/user/password',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'user',
            totalProperty: 'totalCount'
        }
    }
});