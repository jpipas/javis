Ext.define('JavisERP.controller.PaymentController', {
    extend: 'Ext.app.Controller',

    stores: [
        'AppliedPaymentStore',
        'Duration',
        'PaymentStore',
        'ContractStore',
        'ClientStore',
        'PaymentTypeStore'
    ],
    views: [
        'ContractWindow',
        'ClientRecord'
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
        },
        {
            ref: 'clientRecordForm',
            selector: 'form[cls=clientform]',
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

        abstractcomponent.down().getForm().findField('client_name').setValue(this.client_name);
        abstractcomponent.down().getForm().findField('client_id').setValue(this.client_id);
        var container = abstractcomponent.query('fieldcontainer > #column1');

        container[0].add(comboFieldBox);
    },

    onContractComboChange: function(field, newValue, oldValue, options) {
        this.getDurationStore().clearFilter(true);
        this.getDurationStore().filter('contract_id',newValue);
        this.getDurationStore().filter('payment_window',newValue);
        this.getPaymentTypeStoreStore().load();
        this.getPaymentWindow().getComponent('paymentForm').getForm().findField('payment_amount').setValue(this.getContractStoreStore().getById(newValue).data.monthly_payment);
        this.getPaymentWindow().getComponent('paymentForm').getForm().findField('payment_type_id').setValue(this.getContractStoreStore().getById(newValue).raw.payment_term.payment_type_id);
    },

    onPaymentSaveButtonClick: function(button, e, options) {
        var fields = this.getPaymentForm().getForm().getValues(false,false,false,true);
        var payment = new JavisERP.model.Payment();
        for(var key in fields){
            payment.set(key,fields[key]);
        }
        payment.set('type',"Customer Payment");
        var pWindow = this.getPaymentWindow();
        var pStore = this.getPaymentStoreStore();
        var cStore = this.getClientStoreStore();
        var cRecordForm = this.getClientRecordForm();
        payment.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    pWindow.close();
                    pStore.reload();
                    cStore.reload();
                    var refreshedClient = new JavisERP.model.Client(record.data.client);
                    cRecordForm.getForm().loadRecord(refreshedClient);
                    cRecordForm.getForm().findField('remaining_months').setValue(refreshedClient.data.remaining_months.cnt);
                    cRecordForm.getForm().findField('territory').setValue(refreshedClient.data.territory.name);
                    Ext.Msg.alert('Success','Payment saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    init: function(application) {
        var me = this;
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
