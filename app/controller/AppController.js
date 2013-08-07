Ext.define('JavisERP.controller.AppController', {
    extend: 'Ext.app.Controller',

    stores: [
        'ClientStore',
        'ActivityStore',
        'TerritoryStore'
    ],

    views: [
        'Viewport',
        'NavBar',
        'ContentCards',
        'Activities',
        'RecordNavigation',
        'ClientPortlet',
        'PortalPanel',
        'PortalColumn',
        'PortalDropZone',
        'Portlet',
        'PortletPanel'
    ],

    refs: [
        {
            ref: 'activitiesPanel',
            selector: 'activities'
        },
        {
            ref: 'clientGrid',
            selector: 'clientgrid'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        }
    ],

    init: function(application) {
        var me = this;
        //Listen for application wide event(s)
        this.application.on({
            navigationChange: me.navigationClick,
            scope: me
        });
        // Not sure this is doing anything at the moment
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    },

    navigationClick: function(itemId) {
		if (itemId){
	        this.getContentCards().getLayout().setActiveItem(itemId);

	        var xtype = this.getContentCards().getLayout().getActiveItem().getXType();

	        if(xtype.indexOf("grid") != -1){
	            // if its a grid clear the filter and reload the store
	            this.getContentCards().getLayout().getActiveItem().getStore().clearFilter(true);
	            this.getContentCards().getLayout().getActiveItem().getStore().load();
	        }
		}
    }

});
