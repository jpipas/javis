Ext.define('JavisERP.controller.PublicationController',{
    extend: 'Ext.app.Controller',
    alias: 'controller.publicationcontroller',

    models: [
        'Publication'
    ],
    stores: [
        'PublicationStore'
    ],
    views: [
        'PublicationWindow',
        'PublicationGrid'
    ],

    onPublicationActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editPublication(record);
                break;
            case 'delete_action':
                this.deletePublication(record,grid);
                break;
        }
    },

    init: function(application) {
        me = this;
        this.control({
            "window[cls=publicationwindow]": {
                afterrender: this.onWindowAfterRender,
                beforeshow: this.onWindowBeforeShow,
                close: this.onWindowClose
            },
            "publicationgrid rowactions": {
                action: me.onPublicationActionClick
            }
        });
    }
});