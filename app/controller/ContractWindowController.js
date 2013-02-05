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
        'ContractStore',
        'Duration',
        'PaymentTermStore',
        'TerritoryStore'
    ],

    refs: [
        {
            ref: 'clientNameField',
            selector: 'displayfield[cls=clientnamefield]',
            xtype: 'displayfield'
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
            selector: 'window[cls=contractWindow]'
        },
        {
            ref: 'contractGrid',
            selector: 'contractgrid'
        }
    ],

    onWindowAfterRender: function(abstractcomponent, options) {
        abstractcomponent.getComponent('contractform').getForm().setValues({
            client_name: this.getClientName(),
            client_id: this.getClientId()
        });
    },

    onWindowBeforeShow: function(abstractcomponent, options) {
        this.getDurationStore().clearFilter(true);
    },

    onWindowClose: function(panel, eOpts){
        this.getContractGrid().getStore().reload();
    },

    runCalcs: function(target) {
        this.getContractWindow().paymentCalculations();
    },

    onSaveButtonClick: function(button, e, options) {
        var fields = this.getContractForm().getForm().getValues(false,false,false,true);
        me.contract = new JavisERP.model.Contract({id: fields['id']});
        for(var key in fields){
            me.contract.set(key,fields[key]);
        }

        var durations = [];
        var recs = this.getDurationList().getValueRecords();
        for(var key1 in recs){
            var duration = new JavisERP.model.Duration();
            duration.set("id",recs[key1].data.id);
            duration.set("description",recs[key1].data.description);
            duration.set("date_string",recs[key1].data.date_string);
            durations.push(duration);
        }

        me.contract.setAssociatedData("durations",durations);
        me.contract.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));
        var cWindow = this.getContractWindow();
        me.contract.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    cWindow.close();
                    Ext.Msg.alert('Success','Contract saved successfully!');
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
                beforeshow: this.onWindowBeforeShow,
                close: this.onWindowClose
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
