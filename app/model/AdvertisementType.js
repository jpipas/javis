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
        url: '/server/web/index.php/advertisement/type/',
        reader: {
            type: 'json',
            root: 'adType',
            totalProperty: 'totalCount'
        }
    }
});