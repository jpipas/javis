/*
 * File: app/controller/ClientController.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('JavisERP.controller.ClientController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'clientGrid',
            selector: 'clientgrid'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
            ref: 'clientRecord',
            selector: 'clientrecord'
        },
        {
            ref: 'contactWindow',
            selector: 'contactwindow'
        },
        {
            ref: 'contactGrid',
            selector: 'contactgrid'
        }
    ],

    onNewContactClick: function(target) {
        this.application.fireEvent("addContact",target);
    },

    onActionColumnClick: function(grid, col, row) {
        this.application.fireEvent('clientRecordChange',grid,col,row);
    },

    init: function(application) {
        this.control({
            "clientrecord toolbar button[itemId=newcontact]": {
                click: this.onNewContactClick
            },
            "clientgrid #actions": {
                click: this.onActionColumnClick
            }
        });
        me = this;
        me.contactWindow = null;
        me.application.on({
            clientRecordChange: me.changeClientRecord,
            scope: me
        });

        me.application.on({
            addContact: me.addContact,
            scope:me
        });

    },

    addContact: function() {
        if(!me.contactWindow){
            me.contactWindow = new JavisERP.view.ContactWindow();
        }
        if(me.contactWindow.isVisible()){
            me.contactWindow.hide();
        } else {
            me.contactWindow.show();
        }
    },

    changeClientRecord: function(grid, col, row, record) {
        this.getContentCards().getLayout().setActiveItem('ClientRecord');
        var form = this.getClientRecord().getForm();
        form.loadRecord(this.getClientGrid().getStore().getAt(row));
        var contacts = this.getContactGrid().getStore().load();
    },

    onControllerClickStub: function() {

    }

});
