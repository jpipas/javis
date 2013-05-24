Ext.define('JavisERP.model.Advertisement', {
    extend: 'Ext.data.Model',

    uses: [
        'JavisERP.model.AdvertisementType',
        'JavisERP.model.AdvertisementSize',
        'JavisERP.model.Client',
        'JavisERP.model.Publication'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'ad_type_id',
            mapping: 'ad_type.description'
        },
        {
            name: 'ad_size_id',
            mapping: 'ad_size.description'
        },
        {
            name: 'created_at'
        },
        {
            name: 'updated_at'
        },
        {
            name: 'deleted_at'
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
            name: 'exp_date'
        },
        {
            name: 'client_id'
        },
        {
            name: 'contract_id'
        },
        {
            name: 'publications'
        },
        {
            name: 'edit_action'
        },
        {
            name: 'view_action'
        },
        {
            name: 'delete_action'
        },
        {
            name: 'publications'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/advertisement/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'advertisement',
            totalProperty: 'totalCount'
        }
    }
});