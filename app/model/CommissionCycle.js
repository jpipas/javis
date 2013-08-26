Ext.define('JavisERP.model.CommissionCycle', {
    extend: 'Ext.data.Model',

	idProperty: 'id',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'title'
        },
        {
        	name: 'paymentcutoffday'
        },
        {
        	name: 'applyperiodmonths'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/commission/cycle/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'cycle',
            totalProperty: 'totalCount'
        }
    }
});