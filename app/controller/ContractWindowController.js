Ext.define('JavisERP.controller.ContractWindowController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.contractwindowcontroller',

    models: [
        'Contract',
        'Advertisement',
        'Client'
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
            selector: 'combobox[cls=durationlist]'
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
        },
        {
            ref: 'advertisementGrid',
            selector: 'advertisementgrid'
        },
        {
            ref: 'clientForm',
            selector: 'form[cls=clientform]'
        },
        {
            ref: 'clientNameField',
            selector: 'displayfield[cls=clientnamefield]',
            xtype: 'displayfield'
        }
    ],

    onWindowAfterRender: function(abstractcomponent, options) {

    },

    runCalcs: function(target) {
        this.paymentCalculations();
    },

    onSaveButtonClick: function(button, e, options) {
        var fields = this.getContractForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        me.contract = new JavisERP.model.Contract({id: fields['id']});
        for(var key in fields){
            me.contract.set(key,fields[key]);
        }

        var durations = [];
        var recs = this.getDurationList().getValue();
        for(var key1 in recs){
            var duration = new JavisERP.model.Duration();
            duration.set("id",recs[key1]);
            durations.push(duration);
        }

        me.contract.setAssociatedData("durations",durations);
        me.contract.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));
        var cWindow = this.getContractWindow();
        var cGrid = this.getContractGrid();
        //console.log(me.contract);
        me.contract.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    cGrid.getStore().reload();
                    cWindow.close();
                    //cWindow.destroy(true);
                    Ext.Msg.alert('Success','Contract saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    onCancelButtonClick: function(button,e,opts){
        button.up('window').close();
    },

    onWindowClose: function(button,opts) {
        me.contractWindow = null;
        if(this.getContractForm().getForm().isDirty()){
            Ext.Msg.show({
                 title:'Save Changes?',
                 msg: 'You are closing a window that has unsaved changes. Would you like to save your changes?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 scope: this,
                 fn: function(button,text,opts) {
                    if(button == "yes"){
                        this.onSaveButtonClick();
                    } else {
                        //console.log(this.obj.getContractForm().getForm().findField('is_new').originalValue);
                        if(this.getContractForm().getForm().findField('is_new').originalValue == "1" || this.getContractForm().getForm().findField('is_new').getValue() == "1"){
                            //console.log(me.contract);
                            me.contract.destroy();
                        }
                        this.getContractGrid().getStore().reload();
                    }
                 }
            });
            button.up('window').hide();
        } else {
            //this.getAdvertisementGrid().hide();
            button.up('window').hide();
        }
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
                //beforehide: this.onWindowClose
            },
            "combobox[cls=durationlist]": {
                change: this.runCalcs
            },
            "button[cls=contractsave]": {
                click: this.onSaveButtonClick
            },
            "form numberfield[name=discount]":{
                change: this.runCalculations
            },
            "form numberfield[name=total_sales]":{
                change: this.runCalculations
            },
            "form numberfield[name=design_fee]":{
                change: this.runCalculations
            },
            "form numberfield[name=first_months_payment]":{
                change: this.paymentCalculations
            },
            "button[cls=cancelContract]": {
                click: this.onWindowClose
            }

        });
    },

    setClientFields: function(clientId, clientName) {
        me.client_id = clientId;
        me.client_name = clientName;
    },

    getClientId: function() {
        return this.getClientForm().getForm().findField('id').getValue();
    },

    getClientName: function() {
        return this.getClientForm().getForm().findField('company_name').getValue();
    },

    runCalculations: function() {
        var form = Ext.ComponentQuery.query('#contractform')[0].getForm();

        var total_sales_amt = form.findField("total_sales").getValue();
        var discount = form.findField("discount").getValue();
        var subtotal = form.findField("subtotal").getValue();
        var design_fee = form.findField("design_fee").getValue();

        var sub_total_calc = (total_sales_amt*(1-discount)).toFixed(2);
        form.findField("subtotal").setValue(sub_total_calc);

        var total_calc = parseFloat(sub_total_calc) + design_fee;
        form.findField("total_amount").setValue(total_calc.toFixed(2));

        this.paymentCalculations();
    },

    paymentCalculations: function() {
        var form = Ext.ComponentQuery.query('#contractform')[0].getForm();

        var subtotal = form.findField("subtotal").getValue();
        var design_fee = form.findField("design_fee").getValue();
        var durations = form.findField("durations").getRawValue();

        var duration = durations.split(",").length;
        if(duration===0){
            duration=1;
        }
        //console.log(duration);
        var first_month_calc = (subtotal/duration)+design_fee;
        var month_payment = (subtotal/duration);
        form.findField("first_months_payment").setValue(first_month_calc.toFixed(2));
        form.findField("monthly_payment").setValue(month_payment.toFixed(2));
    }

});
