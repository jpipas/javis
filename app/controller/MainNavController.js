Ext.define('JavisERP.controller.MainNavController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'mainNav',
            selector: 'navbar'
        }
    ],

    onNavigationClick: function(button, e, options) {
        this.application.fireEvent('navigationChange',button.itemId);
    },

    onMenuitemClick: function(item, e, options) {
        this.application.fireEvent('navigationChange',item.itemId);
    },

    init: function(application) {
        this.control({
            "navbar button": {
                click: this.onNavigationClick
            },
            "navbar menuitem": {
                click: this.onMenuitemClick
            }
        });
    }

});
