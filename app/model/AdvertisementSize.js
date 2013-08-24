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
        }
    ],

    proxy: {
        type: 'srest',
        url: '/advertisement/size/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'adSize',
            totalProperty: 'totalCount'
        }
    }
});