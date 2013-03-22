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
            name: 'modified_at'
        },
        {
            name: 'client_id'
        },
        {
            name: 'contract_id'
        },
        {
            name: 'publications'
        }
    ],

    proxy: {
        type: 'srest',
        api: {
            create: '/server/web/index.php/advertisement/new',
            read: '/server/web/index.php/advertisement/',
            update: '/server/web/index.php/advertisement/update',
            destroy: '/server/web/index.php/advertisement/delete'
        },
        writer: {
            type: 'json',
            encode: true,
            root: 'advertisement'
        },
        reader: {
            type: 'json',
            root: 'advertisement',
            totalProperty: 'totalCount'
        }
    }
});