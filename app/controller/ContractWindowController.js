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
        'PaymentTermStore'
    ],
    views: [
        'ContractWindow'
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
            selector: 'window[cls=contractWindow]',
            xtype: 'window'
        }
    ],

    onWindowAfterRender: function(abstractcomponent, options) {
        abstractcomponent.getComponent('ContractForm').getForm().setValues({
            client_name: this.getClientName(),
            client_id: this.getClientId()
        });
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
                store: 'Duration',
                queryMode: 'local',
                typeAdead:true,
                growMax:100,
                filterPickList:true,
                name: 'durations',
                cls:'durationlist'
            });
        this.getDurationStore().clearFilter(true);
        var container = abstractcomponent.query('fieldcontainer > #column1');
        container[0].add(comboFieldBox);

    },

    runCalcs: function(target) {
        this.getContractWindow().paymentCalculations();
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
            duration.set("id",recs[key1].data.id);
            duration.set("description",recs[key1].data.description);
            duration.set("date_string",recs[key1].data.date_string);
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
