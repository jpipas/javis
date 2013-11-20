Ext.define('JavisERP.view.ProductionPhotosUploadGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.productionphotosuploadgrid',

    title: 'Upload Progress',
    forceFit: true,
    store: {type : 'productionstore'},
    itemId: 'ProductionPhotosUploadGrid',
    scroll: 'vertical',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
            	
            },
            columns: [
            	{
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Status',
	                align: 'center',
	                dataIndex: 'upload_id',
	                getClass: function(v){
	                	if (v == 'success'){
	                		return 'ui-silk ui-silk-tick';
	                	} else if (v == 'failure'){
	                		return 'ui-silk ui-silk-cross';
	                	} else {
	                		return 'ui-silk ui-silk-loading';
	                	}
	            	},
	                itemId: 'photoupload_progress'
	            },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'filename',
                    flex: 1,
                    text: 'Filename'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'title',
                    flex: 1,
                    text: 'Title'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    dataIndex: 'keywords',
                    text: 'Keywords'
                }
            ]
        });

        me.callParent(arguments);
    }

});