Ext.define('JavisERP.controller.ProductionPhotosController', {
    extend: 'Ext.app.Controller',

    views: [
        'ProductionPhotosPanel',
        'ProductionPhotosDataView',
        'ProductionPhotosDetailPanel'
    ],

    models: [
        
    ],

    stores: [
        
    ],

    refs: [
        
    ],
    
    openUploadWindow: function(){
    	
    },

	/*****
    Init
    *****/
    init: function(application) {
        var me = this;
        
        me.control({
            "productionphotospanel #productionphotosadd": {
                click: me.openUploadWindow
            }
        });

    }    
    
});
