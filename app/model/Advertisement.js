Ext.define('JavisERP.model.Advertisement', {
    extend: 'Ext.data.Model',

    uses: [
        'JavisERP.model.AdvertisementType',
        'JavisERP.model.AdvertisementSize',
        'JavisERP.model.Client',
        'JavisERP.model.Publication'
    ],
    
    idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
        	name: 'ad_type'
        },
        {
        	name: 'ad_type_description'
        },
        {
            name: 'ad_type_id'
        },
        {
        	name: 'ad_size'
        },
        {
        	name: 'ad_size_id'
        },
        {
        	name: 'ad_size_description'
        },
        {
        	type: 'date',
            name: 'created_at',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
        	type: 'date',
            name: 'updated_at',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
        	type: 'date',
            name: 'deleted_at',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'insert_user_id'
        },
        {
            name: 'email_client'
        },
        {
            name: 'email_designer'
        },
        {
        	type: 'date',
            name: 'exp_date',
            dateFormat: 'Y-m-d'
        },
        {
        	name: 'client'
        },
        {
            name: 'client_id'
        },
        {
        	name: 'client_company_name'
        },
        {
            name: 'publications'
        },
        {
        	name: 'contracts'
        },
        {
            name: 'publication_names'
        },
        {
        	name: 'salesrep'
        },
        {
        	name: 'salesrep_id'
        },
        {
        	name: 'salesrep_name'
        },
        {
        	name: 'designer'
        },
        {
        	name: 'designer_id'
        },
        {
        	name: 'designer_name'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/advertisement/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'advertisement',
            totalProperty: 'totalCount'
        }
    }
});