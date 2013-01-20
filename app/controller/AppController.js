/*
 * File: app/controller/AppController.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('JavisERP.controller.AppController', {
    extend: 'Ext.app.Controller',

    stores: [
        'ActivityStore'
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
        me = this;
        //Listen for application wide event(s)
        this.application.on({
            navigationChange: me.navigationClick,
            scope: me
        });

        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

        //this.getAdFormColumn1().add(pubComboField);
    },

    navigationClick: function(itemId) {
        this.getContentCards().getLayout().setActiveItem(itemId);

        var xtype = this.getContentCards().getLayout().getActiveItem().getXType();

        if(xtype.indexOf("grid") != -1){
            this.getContentCards().getLayout().getActiveItem().getStore().clearFilter(true);
            this.getContentCards().getLayout().getActiveItem().getStore().load();
        }
    }

});
