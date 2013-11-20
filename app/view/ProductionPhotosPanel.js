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
            	autoScroll: true
        	},
        	dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    	{
				            text    : 'Search'
            			},
                    	{
	                        xtype: 'triggerfield',
	                        width           : 150,
	                        itemId			: 'productionphotosdataview_search',
				            trigger1Cls     : 'x-form-clear-trigger',
				            trigger2Cls     : 'x-form-search-trigger',
				            onTrigger1Click: function(e) {
				              	this.fireEvent("ontrigger1click", this, e);
					        },
				            onTrigger2Click: function(e) {
				              	this.fireEvent("ontrigger2click", this, e);
					        },
					        enableKeyEvents:  true,
					        listeners: {
					        	keypress: function (comboBox, e) {
									if (e.getCharCode() == e.ENTER) {
										this.fireEvent("ontrigger2click", this, e);
									}
								}
					        }
	                    },
                    	/*{
		                    xtype: 'gridsearchingbar',
		                    inputWidth: 200,
		                    grid: Ext.getCmp('productionphotosdataview'),
		                    border: 0,
		                    showSelectAll: true,
		                    menuIconCls: 'ui-silk ui-silk-magnifier',
		                    disableIndexes: ['id'],
		                    checkIndexes: ['keywords'],
            				items: ['->']
		                },*/
                    	{
							xtype: 'tbspacer',
							flex: 1
			    		},
                        {
			                xtype: 'button',
			                itemId: 'productionphotosadd',
			                iconCls: 'ui-silk ui-silk-picture-add',
			                text: 'Upload Photo',
			                resourceId: 'production_photos_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
			            }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'productionPhotosPageToolBar',
                    displayInfo: true,
                    store: 'ProductionStore'
                }
            ]
        },
        {
        	xtype: 'productionphotosuploadgrid',
        	region: 'south',
        	height: 150,
        	minHeight: 150,
        	collapsed: true,
        	collapsible: true
        }
	]
});