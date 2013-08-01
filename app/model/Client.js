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
            name: 'state'
        },
        {
            name: 'state_name',
            type: 'string'
        },
        {
            name: 'postal_code_iso',
            type: 'string'
        },
        {
       		name: 'zipcode',
       		type: 'string'
        },
        {
            name: 'postal_code'
        },
        {
            name: 'postal_code_id',
            type: 'int'
        },
        {
            name: 'zip'
        },
        {
            name: 'phone'
        },
        {
            name: 'cell'
        },
        {
            name: 'email_address'
        },
        {
            name: 'fax'
        },
        {
            name: 'territory_name'
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
            name: 'remaining'
        },
        {
            name: 'remaining_months'
        },
        {
            name: 'remaining_months_cnt',
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
            name: 'salesrep_name'
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
        type: 'srest',
        url: '/client/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'client',
            totalProperty: 'totalCount'
        }
    }
});