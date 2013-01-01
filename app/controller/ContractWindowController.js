/*
 * File: app/controller/ContractWindowController.js
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

Ext.define('JavisERP.controller.ContractWindowController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.contractwindowcontroller',

    models: [
        'Contract',
        'Advertisement'
    ],
    stores: [
        'ClientStore',
        'AdvertisementStore',
        'ContractStore'
    ],
    views: [
        'ContractWindow'
    ],

    refs: [
        {
            ref: 'clientNameField',
            selector: 'combobox[cls=clientnamefield]',
            xtype: 'combobox'
        },
        {
            ref: 'durationList',
            selector: 'comboboxselect[cls=durationlist]'
        },
        {
            ref: 'contractForm',
            selector: 'form[cls=contractform]'
        },
        {
            ref: 'contractWindow',
            selector: 'window[cls=contractWindow]',
            xtype: 'window'
        }
    ],

    onWindowAfterRender: function(abstractcomponent, options) {
        abstractcomponent.getComponent('ContractForm').getForm().setValues({
            client_name: this.getClientName(),
            client_id: this.getClientId()
        });

        //console.log(abstractcomponent.getComponent('ContractForm').getForm().findField('client_id').getValue());
        //this.getClientNameField().disable();
    },

    onWindowBeforeShow: function(abstractcomponent, options) {

        var comboFieldBox = Ext.create('Ext.ux.form.field.BoxSelect',
            {
                xtype: 'comboboxselect',
                fieldLabel: 'Duration(s)',
                displayField: 'description',
                emptyText: 'select a duration...',
                descField: 'id',
                valueField: 'id',
                store: 'StaticDurationStore',
                queryMode: 'local',
                typeAdead:true,
                growMax:100,
                filterPickList:true,
                name: 'durationlist[]',
                cls:'durationlist'
            });

        var container = abstractcomponent.query('fieldcontainer > #column1');
        container[0].add(comboFieldBox);

    },

    runCalcs: function(target) {
        me.getContractWindow().paymentCalculations();
    },

    onSaveButtonClick: function(button, e, options) {
        var fields = this.getContractForm().getForm().getValues(false,false,false,true);
        for(var key in fields){
            me.contract.set(key,fields[key]);
        }

        var durations = [];
        var recs = this.getDurationList().getValueRecords();
        for(var key1 in recs){
            var duration = new JavisERP.model.Duration();
            duration.set("id",recs[key1].id);
            duration.set("description",recs[key1].description);
            duration.set("date_string",recs[key1].date_string);
            durations.push(duration);
        }

        me.contract.setAssociatedData("durations",durations);
        me.contract.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));

        me.contract.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    me.getContractWindow().close();
                    me.getContractStoreStore().reload();
                    Ext.Msg.alert('Success','Contract created successfully!'); 
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    init: function(application) {
        me = this;
        me.application.on({
            setClientFields: me.setClientFields,
            scope: me
        });

        me.client_id = null;
        me.client_name = null;

        this.control({
            "window[cls=contractWindow]": {
                afterrender: this.onWindowAfterRender,
                beforeshow: this.onWindowBeforeShow
            },
            "comboboxselect[cls=durationlist]": {
                change: this.runCalcs
            },
            "button[cls=contractsave]": {
                click: this.onSaveButtonClick
            }
        });
    },

    setClientFields: function(clientId, clientName) {
        //console.log("setting: "+clientId);
        me.client_id = clientId;
        me.client_name = clientName;
    },

    getClientId: function() {
        return me.client_id;
    },

    getClientName: function() {
        return me.client_name;
    }

});
