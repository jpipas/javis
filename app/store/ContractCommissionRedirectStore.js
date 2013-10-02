Ext.define('JavisERP.store.ContractCommissionRedirectStore', {
    extend: 'Ext.data.Store',
    alias: 'store.contractcommissionredirectstore',
    fields: [
        {
            name: 'id'
        },
        {
        	name: 'title'
        }
    ],
    autoLoad: true,
    data: [
        {id:'pub', title: 'Publisher - Personal Account'},
        {id:'pubae', title: 'Publisher - AE Override'}
    ]
});