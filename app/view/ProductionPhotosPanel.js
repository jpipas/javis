Ext.define('JavisERP.view.ProductionPhotosPanel', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.productionphotospanel',
    
    layout: 'border',
    
    border: 0,
    
    defaults: {
		collapsible: false,
		split: true
	},
	items: 
	[
		{
		    xtype: 'productionphotosdetailpanel',
		    region:'east',
		    margins: '0',
		    width: 200,
		    minWidth: 200,
		    maxWidth: 400
		},
		{
			xtype: 'panel',
            region: 'center',
            layout: 'fit',
            items: {
                xtype: 'productionphotosdataview',
                autoScroll: true/*,
                listeners: {
                    scope: this,
                    selectionchange: this.onIconSelect,
                    itemdblclick: this.fireImageSelected
                }*/
            },
            tbar: [
	            {
					xtype: 'tbspacer',
					flex: 1
	    		},
	    		{
	                xtype: 'button',
	                itemId: 'productionphotosadd',
	                iconCls: 'ui-silk ui-silk-picture-add',
	                text: 'Upload Photos'
	            }
	        ]
        }
	]
});