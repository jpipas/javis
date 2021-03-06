Ext.define('JavisERP.model.Publication', {
    extend: 'Ext.data.Model',
    alias: 'model.publication',

    uses: [
        'JavisERP.model.Territory',
        'JavisERP.model.Advertisement'
    ],
    
    idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'description'
        },
        {
            name: 'contact_email'
        },
        {
            name: 'content_email'
        },
        {
            name: 'territory_name'
        },
        {
            name: 'territory_id'
        },
        {
            name: 'publisher'
        },
        {
            name: 'publisher_id'
        },
        {
            name: 'publisher_name'
        },
        {
            name: 'publisher_email'
        },
        {
            name: 'contentcoord'
        },
        {
            name: 'contentcoord_id'
        },
        {
            name: 'contentcoord_name'
        },
        {
            name: 'contentcoord_email'
        },
        {
            name: 'created_at'
        },
        {
            name: 'deleted_at'
        },
        {
            name: 'postal_code'
        },
        {
            name: 'postal_codes'
        },
        {
            name: 'territory'
        },
        {
        	name: 'baselines'
        },
        {
        	name: 'pages'
        },
        {
        	name: 'baseline'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/publication/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'publication',
            totalProperty: 'totalCount'
        }
    }
});