Ext.define('JavisERP.model.AdvertisementSize', {
    extend: 'Ext.data.Model',

    uses: [
        'JavisERP.model.AdvertisementType'
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
            name: 'type_id'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/advertisement/size/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'adSize',
            totalProperty: 'totalCount'
        }
    }
});