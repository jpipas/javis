Ext.define('JavisERP.model.Client', {
    extend: 'Ext.data.Model',
    alias: 'model.client',

    uses: [
        'JavisERP.model.Territory',
        'JavisERP.model.Contact'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'company_name',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'address1',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'address2',
            type: 'string'
        },
        {
            name: 'city',
            type: 'string'
        },
        {
            name: 'state',
            type: 'string',
            mapping: 'state.name'
        },
        {
            name: 'postal_code',
            type: 'string',
            mapping: 'postal_code.iso_code'
        },
        {
            name: 'postal_code_id',
            type: 'int'
        },
        {
            name: 'phone'
        },
        {
            name: 'email_address'
        },
        {
            name: 'fax'
        },
        {
            name: 'territory_name',
            mapping: 'territory.name'
        },
        {
            name: 'territory'
        },
        {
            name: 'territory_id'
        },
        {
            name: 'state_id'
        },
        {
            name: 'balance'
        },
        {
            name: 'remaining_months',
            mapping: 'remaining_months.cnt'
        },
        {
            name: 'overdue_balance'
        },
        {
            name: 'stage'
        },
        {
            name: 'salesrep_id'
        },
        {
            name: 'salesrep'
        },
        {
            name: 'salesrep_name',
            mapping: 'salesrep.fullname'
        },
        {
            name: 'insert_user_id'
        },
        {
            name: 'created_at'
        },
        {
            name: 'updated_at'
        },
        {
            name: 'deleted_at'
        }
    ],

    proxy: {
        type: 'rest',
        api: {
            create: '/server/web/index.php/client/new',
            read: '/server/web/index.php/client/',
            update: '/server/web/index.php/client/update',
            destroy: '/server/web/index.php/client/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'client',
            totalProperty: 'totalCount'
        }
    },
    hasOne: [
        {
            model: 'JavisERP.model.User',
            name: 'salesrep'
        }
    ],

    hasMany: [
        {
            associationKey: 'territory',
            model: 'JavisERP.model.Territory',
            name: 'territory'
        },
        {
            associationKey: 'contact',
            model: 'JavisERP.model.Contact',
            name: 'contact'
        }
    ]
});