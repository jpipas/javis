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

        if(item.itemId == 'new_customer'){
            this.onNewCustomerClick();
        } else {
            this.application.fireEvent('navigationChange',item.itemId);
        }

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
    },

    onNewCustomerClick: function() {
        //console.log("creating a new customer from main nav");
        this.application.fireEvent('navigationChange','ClientRecord');
        this.application.fireEvent('createClientRecord');
    }

});
