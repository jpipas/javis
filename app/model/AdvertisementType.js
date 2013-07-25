Ext.define('JavisERP.model.AdvertisementType', {
    extend: 'Ext.data.Model',

    uses: [
        'JavisERP.model.AdvertisementSize'
    ],
    
    idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'description'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/advertisement/type/',
        reader: {
            type: 'json',
            root: 'adType',
            totalProperty: 'totalCount'
        }
    }
});