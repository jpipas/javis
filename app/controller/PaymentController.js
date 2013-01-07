Ext.define('JavisERP.controller.PaymentController', {
    extend: 'Ext.app.Controller',

    stores: [
        'AppliedPaymentStore',
        'Duration',
        'PaymentStore',
        'ContractStore'
    ],
    views: [
        'ContractWindow'
    ],

    refs: [
        {
            ref: 'paymentWindow',
            selector: 'window[cls=paymentWindow]'
        },
        {
            ref: 'paymentCombo',
            selector: 'combobox[cls=paymentCombo]',
            xtype: 'combobox'
        },
        {
            ref: 'paymentWindow',
            selector: 'window[cls=paymentWindow]',
            xtype: 'window'
        },
        {
            ref: 'paymentForm',
            selector: 'form[cls=paymentform]',
            xtype: 'form'
        }
    ],

    onPaymentWindowBeforeShow: function(abstractcomponent, options) {
        var comboFieldBox = Ext.create('Ext.ux.form.field.BoxSelect',
            {
                xtype: 'comboboxselect',
                fieldLabel: 'Apply Payment to Duration(s)',
                displayField: 'description',
                emptyText: 'select a duration...',
                descField: 'id',
                valueField: 'id',
                store: 'Duration',
                queryMode: 'local',
                typeAdead:true,
                multiSelect:false,
                filterPickList:true,
                anchor:'95%',
                name: 'duration_id',
                cls:'contractdurationlist'
            });

        //this.getpaymentStoreStore().filter('client_id',me.client_id);
        abstractcomponent.down().getForm().findField('client_name').setValue(me.client_name);
        abstractcomponent.down().getForm().findField('client_id').setValue(me.client_id);
        var container = abstractcomponent.query('fieldcontainer > #column1');

        container[0].add(comboFieldBox);
    },

    onContractComboChange: function(field, newValue, oldValue, options) {
        this.getDurationStore().clearFilter(true);
        this.getDurationStore().filter('contract_id',newValue);
        me.getPaymentWindow().getComponent('paymentForm').getForm().findField('payment_amount').setValue(me.getContractStoreStore().getById(newValue).data.monthly_payment);
    },

    onPaymentSaveButtonClick: function(button, e, options) {
        var fields = this.getPaymentForm().getForm().getValues(false,false,false,true);
        me.payment = new JavisERP.model.Payment();
        for(var key in fields){
            //console.log(key+":"+fields[key]);
            me.payment.set(key,fields[key]);
        }
        me.payment.set('type',"Customer Payment");
        me.payment.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    me.getPaymentWindow().close();
                    me.getPaymentStoreStore().reload();
                    Ext.Msg.alert('Success','Payment saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    init: function(application) {
        me = this;


        this.control({
            "#paymentWindow": {
                beforeshow: this.onPaymentWindowBeforeShow
            },
            "combobox[cls=contractCombo]": {
                change: this.onContractComboChange
            },
            "button[cls=paymentsavebutton]": {
                click: this.onPaymentSaveButtonClick
            }
        });
    }

});
