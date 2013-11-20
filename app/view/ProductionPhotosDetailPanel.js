Ext.define('JavisERP.view.ProductionPhotosDetailPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.productionphotosdetailpanel',
    itemId : 'productionphotosdetailpanel',
	id: 'images-detail',
    width: 200,
    minWidth: 200,
    tpl: [
        '<div class="details">',
            '<tpl for=".">',
                '<div style="text-align:center;"><img src="/thumb/{id}?w=180&h=140" /></div>',
                '<div class="details-info">',
                    '<div style="text-align:center;" class="title"><b>{title}</b><br />',
                    '{filesize:fileSize} ({filetype})</div>',
                    '<div class="keywords">Keywords: <em>{keywords}</em></div>',
                    '<div class="created">Created: {created_at:date("m/d/Y g:ia")} by {insert_fullname}</div>',
                    '<div class="action" id="production-photos-detail-action-download"></div>',
                    '<div class="action" id="production-photos-detail-action-edit"></div>',
                    '<div class="action" id="production-photos-detail-action-delete"></div>',
                '</div>',
            '</tpl>',
        '</div>'
    ],

    /**
     * Loads a given image record into the panel. Animates the newly-updated panel in from the left over 250ms.
     */
    loadRecord: function(image) {
    	var me = this;
        this.body.hide();
        this.tpl.overwrite(this.body, image.data);
        this.body.down("img").on('click', function(){ JavisERP.app.fireEvent('downloadProductionPhoto', image.data); }, this);
    	Ext.create('Ext.Button', {
		    text: 'Download',
		    iconCls: 'ui-silk ui-silk-page-white-go',
		    width: 100,
		    textAlign: 'left',
		    renderTo: 'production-photos-detail-action-download',
		    resourceId: 'production_photos_download',
            resourceType: 'disable',
            plugins: ['permission'],
		    handler: function() {
		        JavisERP.app.fireEvent('downloadProductionPhoto', image.data);
		    }
		});
		Ext.create('Ext.Button', {
		    text: 'Edit',
		    iconCls: 'ui-silk ui-silk-pencil',
		    width: 100,
		    textAlign: 'left',
		    renderTo: 'production-photos-detail-action-edit',
		    resourceId: 'production_photos_edit',
            resourceType: 'disable',
            plugins: ['permission'],
		    handler: function() {
		        JavisERP.app.fireEvent('editProductionPhoto', image.data);
		    }
		});
    	Ext.create('Ext.Button', {
		    text: 'Delete',
		    iconCls: 'ui-silk ui-silk-delete',
		    width: 100,
		    textAlign: 'left',
		    renderTo: 'production-photos-detail-action-delete',
		    resourceId: 'production_photos_delete',
            resourceType: 'disable',
            plugins: ['permission'],
		    handler: function() {
		        JavisERP.app.fireEvent('deleteProductionPhoto', image.data);
		    }
		});
        this.body.slideIn('l', {
            duration: 250
        });
    },
    
    clear: function(){
        this.body.update('');
    }
});