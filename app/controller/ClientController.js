/*
 * File: app/controller/ClientController.js
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

Ext.define('JavisERP.controller.ClientController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.clientController',

    id: 'clientcontroller',

    views: [
        'ClientWindow',
        'ClientRecord'
    ],

    stores: [
        'ClientStore',
        'State',
        'TerritoryStore',
        'CustomerStage',
        'PostalCode'
    ],

    models: [
        'Client'
    ],

    refs: [
        {
            ref: 'clientGrid',
            selector: 'clientgrid'
        },
        {
            ref: 'clientForm',
            selector: 'clientwindow form[cls=clientform]'
        },
        {
            ref: 'clientWindow',
            selector: 'clientwindow'
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
            ref: 'clientRecordForm',
            selector: 'clientrecord form[cls=clientform]'
        },
        {
            ref: 'contactWindow',
            selector: 'contactwindow'
        },
        {
            ref: 'contactGrid',
            selector: 'contactgrid'
        },
        {
            ref: 'publicationGrid',
            selector: 'publicationgrid'
        },
        {
            ref: 'clientPortlet',
            selector: 'clientportlet'
        },
        {
            ref: 'contractGrid',
            selector: '#clientcontractgrid'
        },
        {
            ref: 'advertisementGrid',
            selector: '#clientadgrid'
        },
        {
            ref: 'paymentGrid',
            selector: '#paymentgrid'
        },
        {
            ref: 'editButton',
            selector: 'button[cls=edit_button]'
        },
        {
            ref: 'contactForm',
            selector: 'form[cls=contactform]'
        }
    ],

    onActionColumnClick: function(grid, col, row) {
        this.application.fireEvent('clientRecordChange',grid,col,row);
    },

    onNewContractClick: function(target) {
        this.application.fireEvent("addContract",target);
    },

    onNewPaymentButtonClick: function(button, e, options) {
        var payment = new JavisERP.view.ContractPaymentWindow();
        payment.show();
    },

    onSalesTabChange: function(panel,newCard,oldCard,e){
        switch(newCard.cls){
            case 'clientadvertisements':
                this.getAdvertisementGrid().getStore().clearFilter(true);
                this.getAdvertisementGrid().getStore().filter("client_id", me.client_id);
                break;
            case 'clientcontracts':
                this.getContractGrid().getStore().clearFilter(true);
                this.getContractGrid().getStore().filter("client_id",me.client_id);
                break;
            case 'clientpublications':
                this.getPublicationGrid().getStore().clearFilter(true);
                this.getPublicationGrid().getStore().filter("client_id",me.client_id);
                break;
            case 'clientpayments':
                this.getPaymentGrid().getStore().clearFilter(true);
                this.getPaymentGrid().getStore().filter("client_id",me.client_id);
                break;
        }
    },

    onSaveContactClick: function(button, e, option){
        var fields = this.getContactForm().getForm().getValues(false,false,false,true);
        me.contact = new JavisERP.model.Contact({id: fields['id']});
        for(var key in fields){
            me.contact.set(key,fields[key]);
        }

        var cWindow = this.getContactWindow();
        me.contact.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    cWindow.close();
                    Ext.Msg.alert('Success','Contact saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    onNewButtonClick: function(button, e, options){
        me.clientWindow = new JavisERP.view.ClientWindow();
        me.client_id = null;
        me.client = new JavisERP.model.Client({stage: 'CUSTOMER'});
        var conGrid = this.getContactGrid();
        me.client.save({
            callback: function(record,operation,success){
                me.client_id = record.data.id;
                me.clientWindow.getComponent('clientForm').getForm().setValues({id: record.data.id, stage: record.data.stage});
                me.clientWindow.getComponent('clientForm').getForm().findField('territory_id').setValue(new JavisERP.model.Territory(record.data.territory));
                me.clientWindow.getComponent('clientForm').getForm().findField('salesrep_id').setValue(new JavisERP.model.User(record.data.salesrep));
                //conGrid.getStore().clearFilter(true);
                //conGrid.getStore().filter("client_id",me.client_id);
                me.clientWindow.show();
            }
        });
    },

    onEditButtonClick: function(button, e, options){
        me.clientWindow = new JavisERP.view.ClientWindow();
        var clientForm = this.getClientForm();
        this.getClientModel().load(me.client_id,{
            success: function(model){
                clientForm.loadRecord(model);
                clientForm.getForm().findField('territory_id').setValue(new JavisERP.model.Territory(model.raw.territory));
                clientForm.getForm().findField('state_id').setValue(new JavisERP.model.State(model.raw.state));
                clientForm.getForm().findField('postal_code_id').setValue(new JavisERP.model.PostalCode(model.raw.postal_code));
                clientForm.getForm().findField('salesrep_id').setValue(new JavisERP.model.User(model.raw.salesrep));
            }
        });
        var myMask = new Ext.LoadMask(this.getClientRecord(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            me.clientWindow.show();
        },500);
        this.getContactGrid().getStore().clearFilter(true);
        this.getContactGrid().getStore().filter("client_id",me.client_id);
    },

    onSaveClientButtonClick: function(button, e, options){
        var fields = this.getClientForm().getForm().getValues(false,false,false,true);
        me.client = new JavisERP.model.Client({id: fields['id']});
        for(var key in fields){
            me.client.set(key,fields[key]);
        }

        var cWindow = this.getClientWindow();
        var cRecordForm = this.getClientRecord();
        me.client.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    var refreshedClient = new JavisERP.model.Client(record.data);
                    cRecordForm.getForm().loadRecord(refreshedClient);
                    me.client_id = record.data.id;
                    me.client_name = record.data.company_name;
                    cWindow.close();
                    Ext.Msg.alert('Success','Client saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });

    },

    onListViewClick: function(button, e, options){
        this.application.fireEvent('navigationChange',button.itemId);
    },

    onNewContactButtonClick: function(button, e, options){
        me.contactWindow = new JavisERP.view.ContactWindow();
        me.contact = null;
        me.contact_id = null;
        me.contact = new JavisERP.model.Contact({
            client_id: me.client_id
        });

        me.contact.save({
            callback: function(record,operation,success){
                me.contact_id = record.data.id;
                me.contactWindow.getComponent('contactform').getForm().setValues({
                    client_name: me.client_name,
                    client_id: me.client_id,
                    id: record.data.id
                });
            }
        });

        me.contactWindow.show();
    },

    onContactWindowClose: function(panel, eOpts){
        this.getContactGrid().getStore().reload();
    },

    init: function(application) {
        me = this;
        me.contactWindow = null;
        me.contractWindow = null;
        me.adWindow = null;

        me.application.on({
            clientRecordChange: me.changeClientRecord,
            scope: me
        });

        me.application.on({
            addContract: me.addContract,
            scope:me
        });

        me.application.on({
            createClientRecord: me.onNewButtonClick,
            scope: me
        });

        this.control({
            "clientgrid #actions, clientportlet #actions": {
                click: this.onActionColumnClick
            },
            "clientrecord toolbar button[itemId=newcontract]": {
                click: this.onNewContractClick
            },
            "button[cls=newPaymentButton]": {
                click: this.onNewPaymentButtonClick
            },
            "recordnav[cls=clientrecordnav] button[cls=edit_button]": {
                click: this.onEditButtonClick
            },
            "recordnav[cls=clientrecordnav] button[cls=listview_button]": {
                click: this.onListViewClick
            },
            "recordnav[cls=clientrecordnav] button[cls=new_button]": {
                click: this.onNewButtonClick
            },
            "tabpanel[cls=salestab]": {
                tabchange: this.onSalesTabChange
            },
            "button[cls=saveContactButton]": {
                click: this.onSaveContactClick
            },
            "contactgrid toolbar button[cls=newcontact]": {
                click: this.onNewContactButtonClick
            },
            "window[cls=contactWindow]": {
                close: this.onContactWindowClose
            },
            "button[cls=clientsavebutton]": {
                click: this.onSaveClientButtonClick
            }
        });
    },

    changeClientRecord: function(grid, col, row, record) {
        this.getContentCards().getLayout().setActiveItem('ClientRecord');
        var form = this.getClientRecord().getForm();
        me.crec = this.getClientGrid().getStore().getAt(row);
        form.loadRecord(this.getClientGrid().getStore().getAt(row));

        var clientId = this.getClientGrid().getStore().getAt(row).data.id;
        var clientName = this.getClientGrid().getStore().getAt(row).data.company_name;
        me.application.fireEvent("setClientFields",clientId,clientName);

        this.getContactGrid().getStore().clearFilter(true);
        this.getContactGrid().getStore().filter("client_id", clientId);

        this.getPublicationGrid().getStore().clearFilter(true);
        this.getPublicationGrid().getStore().filter("client_id",clientId);

        this.getPaymentGrid().getStore().clearFilter(true);
        this.getPaymentGrid().getStore().filter("client_id",clientId);

        this.getContractGrid().getStore().clearFilter(true);
        this.getContractGrid().getStore().filter("client_id",clientId);

        this.getAdvertisementGrid().getStore().clearFilter(true);
        this.getAdvertisementGrid().getStore().filter("client_id", clientId);

    },

    addContract: function() {
        me.contractWindow = new JavisERP.view.ContractWindow();

        me.contract_id = null;
        me.contract = new JavisERP.model.Contract({
            client_id: me.client_id
        });

        me.contract.save({
            callback: function(record){
                me.contract_id = record.data.id;
                me.contractWindow.getComponent('contractform').getForm().setValues({id: record.data.id});
            }
        });

        this.getAdvertisementGrid().getStore().clearFilter(true);
        this.getAdvertisementGrid().getStore().filter("contract_id",me.contract_id);
        me.contractWindow.show();
    }

});
