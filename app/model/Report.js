Ext.define('JavisERP.model.Report', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'criteria'
        },
        {
            name: 'file'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/report/',
        reader: {
            type: 'json',
            root: 'report',
            totalProperty: 'totalCount'
        }
    }
});