Ext.define('JavisERP.view.AdvertisementSizeType', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.advertisementsizetype',
    
    layout: 'border',
    
    border: 0,
    
    defaults: {
		collapsible: false,
		split: true
	},
	items: [{
	    xtype: 'adsizegrid',
	    region:'west',
	    margins: '0',
	    width: 250,
	    minWidth: 100,
	    maxWidth: 250
	},{
	    xtype: 'adtypegrid',
	    region:'center',
	    margins: '0'
	}]
});