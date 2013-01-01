Ext.define('JavisERP.model.override.Advertisement', {
    override: 'JavisERP.model.Advertisement',

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
        }
    ],

    hasOne: [
        {
            associationKey: 'ad_type_id',
            model: 'JavisERP.model.AdvertisementType'
        },
        {
            associationKey: 'ad_size_id',
            model: 'JavisERP.model.AdvertisementSize'
        },
        {
            model: 'JavisERP.model.Client'
        }
    ],

    hasMany: {
        model: 'JavisERP.model.Publication',
        name: 'publicationlist'
    },

    proxy: {
        type: 'rest',
        api: {
            create: '/server/web/index.php/advertisement/create',
            read: '/server/web/index.php/advertisement/',
            update: '/server/web/index.php/advertisement/update',
            destory: '/server/web/index.php/advertisement/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'advertisement',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'jsonwithassociations',
            encode: true
        }
    }
});