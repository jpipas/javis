Ext.define('JavisERP.controller.PaymentController', {
    extend: 'Ext.app.Controller',

	client: {
		id: '',
		name: ''
	},

    stores: [
        'AppliedPaymentStore',
        'Duration',
        'PaymentStore',
        'ContractStore',
        'ClientStore',
        'PaymentTypeStore'
    ],
    
    models: [
        'Contract',
        'Payment',
        'Client',
        'Duration',
        'PaymentType',
        'PaymentCategory'
    ],
    
    views: [
        'ContractWindow',
        'ClientRecord',
        'ContractPaymentWindow'
    ],

    refs: [
    	{
            ref: 'durationList',
            selector: '#paymentForm > #paymentdurations'
        },
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
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
            ref: 'clientForm',
            selector: 'form[cls=clientform]'
        }
    ],

	onPaymentActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editPayment(record);
                break;
            case 'delete_action':
                this.deletePayment(record,grid);
                break;
        }
    },

    onPaymentWindowBeforeShow: function(abstractcomponent, options) {
				// pre-select client here if necessary
    },

	onClientComboSelect: function(field, newValue, oldValue, options) {
		var pForm = this.getPaymentForm().getForm();
    	var contract = pForm.findField('contract_id');
    	contract.getStore().clearFilter(true);
    	contract.getStore().filter("client_id", newValue);
    	contract.clearValue();
        pForm.findField('durations').getStore().clearFilter();
        pForm.findField('durations').clearValue();
    },

    onContractComboSelect: function(field, newValue, oldValue, options) {
		var pForm = this.getPaymentForm().getForm();
		var duration = pForm.findField('durations');
        duration.getStore().clearFilter(true);
        duration.getStore().filter('contract_id',newValue);
        duration.getStore().filter('payment_window',newValue);
        duration.clearValue();
        
        var contract = pForm.findField('contract_id');
        var cd = contract.getStore().getById(contract.getValue());
        if (cd.data.id){
        	pForm.findField('payment_amount').setValue(cd.data.monthly_payment);
        	pForm.findField('payment_type_id').setValue(new JavisERP.model.PaymentType({id: cd.data.payment_type_id, description: cd.data.payment_type_description}));
        }
    },
    
    onNewPaymentButtonClick: function(button, e, options) {
        var payment = new JavisERP.view.ContractPaymentWindow();
        payment.show();
        var payForm = this.getPaymentForm().getForm();
        if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
        	payForm.findField('client_id').setValue(new JavisERP.model.Client({ id: this.getClientId(), company_name: this.getClientName() })).setReadOnly(true);
        	this.onClientComboSelect();
        	payForm.findField('contract_id').focus('', 10);
        } else {
        	payForm.findField('client_id').focus('', 10);
        }
    },

    onPaymentSaveButtonClick: function(button, e, options) {
        var fields = this.getPaymentForm().getForm().getValues(false,false,false,true);
        var payment = new JavisERP.model.Payment();
        for(var key in fields){
            payment.set(key,fields[key]);
        }
        var durations = [];
        var recs = this.getDurationList().getValue();
        for(var key1 in recs){
            var duration = new JavisERP.model.Duration();
            duration.set("id",recs[key1]);
            durations.push(duration);
        }
        payment.setAssociatedData("durations",durations);
        payment.set('type',"Customer Payment");
        
        var pWindow = this.getPaymentWindow();
        var pStore = this.getPaymentStoreStore();
        var cStore = this.getClientStoreStore();
        var me = this;
        //var cRecordForm = this.getClientRecordForm();
        payment.save({
        	success: function(record, operation){
           		pStore.reload();
           		if (payment.id != ''){
					Ext.Msg.show({
						title:'Payment Successfully Saved!',
						msg: 'Your payment entry was successfully saved.<br /><br />Would you like to add another payment?',
						buttons: Ext.Msg.YESNO,
						icon: Ext.Msg.QUESTION,
						scope: this,
						fn: function(button,text,opts) {
							pWindow.close();
							if(button == "yes"){
								me.onNewPaymentButtonClick();
							}
						}
					});
				} else {
					Ext.Msg.alert('Success','Payment saved successfully!');
				}
				/*
				cStore.reload();
                    var refreshedClient = new JavisERP.model.Client(record.data.client);
                    cRecordForm.getForm().loadRecord(refreshedClient);
                    cRecordForm.getForm().findField('remaining_months').setValue(refreshedClient.data.remaining_months.cnt);
                    cRecordForm.getForm().findField('territory').setValue(refreshedClient.data.territory.name);
                    Ext.Msg.alert('Success','Payment saved successfully!');
                */
            },
            failure: function(record, operation){
            	Ext.MessageBox.show({
			           title: 'Failure',
			           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
            }
        });
    },

    init: function(application) {
        var me = this;
        me.application.on({
            setClientFields: me.setClientFields,
            scope: me
        });

        this.client.id = null;
        this.client.name = null;
        
        this.control({
            "#paymentWindow": {
                beforeshow: this.onPaymentWindowBeforeShow
            },
            "paymentgrid rowactions": {
                action: me.onPaymentActionClick
            },
            "button[cls=paymentsavebutton]": {
                click: this.onPaymentSaveButtonClick
            },
            "#paymentclient":{
            	select: function(){
            		this.onClientComboSelect(this);
            	}
            },
            "button[cls=newPaymentButton]": {
                click: this.onNewPaymentButtonClick
            },
            "#paymentdurations":{
            	beforequery: function(){
            		return this.filterPaymentDurationCombo(this);
            	}
            },
            "#paymentcontract":{
            	select: function(){
            		this.onContractComboSelect(this);
            	},
            	beforequery: function(){
            		return this.filterPaymentContractCombo(this);
            	}
            }
        });
    },
    
    setClientFields: function(clientId, clientName) {
        this.client.id = clientId;
        this.client.name = clientName;
    },

    getClientId: function() {
        return this.getClientForm().getForm().findField('id').getValue();
    },

    getClientName: function() {
        return this.getClientForm().getForm().findField('company_name').getValue();
    },
    
    filterPaymentContractCombo: function(){
    	var pForm = this.getPaymentForm().getForm();
    	var combo = pForm.findField('contract_id');
    	var client = pForm.findField('client_id').getValue();
    	
    	// if no client, don't do the query
    	if (!client){
    		return false;
    	} else {
    		combo.getStore().clearFilter(true);
    		// only show contracts for the selected client
    		combo.getStore().filter("client_id", client);
    	}
    },
    
    filterPaymentDurationCombo: function(){
    	var pForm = this.getPaymentForm().getForm();
    	var combo = pForm.findField('durations');
    	var contract = pForm.findField('contract_id').getValue();
    	
    	// if no contract, don't do the query
    	if (!contract){
    		return false;
    	} else {
    		combo.getStore().clearFilter(true);
    		// filter by un-applied durations for the selected contract
    		combo.getStore().filter("contract_id", contract);
    		combo.getStore().filter('payment_window',contract);
    	}
    },

	editPayment: function(record){
        var payWindow = new JavisERP.view.ContractPaymentWindow();
        var pForm = this.getPaymentForm();
        var cc = this.getContentCards();
        this.getPaymentModel().load(record.data.id, {
            success: function(record,operation){
                pForm.getForm().loadRecord(record);
				var durations = [];
				for (i in record.data.durations){
					durations.push(new JavisERP.model.Duration(record.data.durations[i]));
				}
				pForm.getForm().findField('durations').setValue(durations);
                
                pForm.getForm().findField('client_id').setValue(new JavisERP.model.Client({ id : record.data.client_id, company_name: record.data.client_company_name }));
                pForm.getForm().findField('contract_id').setValue(new JavisERP.model.Contract(record.data.contract));
                pForm.getForm().findField('payment_type_id').setValue(new JavisERP.model.PaymentType({ id: record.data.payment_type_id, description: record.data.payment_type_description }));
                pForm.getForm().findField('payment_category_id').setValue(new JavisERP.model.PaymentCategory({ id: record.data.payment_category_id, description: record.data.payment_category_description }));
                if (cc.getLayout().getActiveItem().getXType() == 'clientrecord'){
		        	pForm.getForm().findField('client_id').setReadOnly(true);
			        pForm.findField('contract_id').focus('', 10);
		        } else {
		        	pForm.findField('client_id').focus('', 10);
		        }
            }
        });
        payWindow.show();
        /*
        var myMask = new Ext.LoadMask(this.getContactWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            contactWindow.show();
        },500);
        */
    },

    deletePayment: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Payment?',
            msg: 'You are about to delete this payment. Would you like to proceed?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId,text,opt){
                switch(buttonId){
                    case 'ok':
                        record.destroy({
                            success: function(){
                                grid.getStore().reload();
                            },
                            failure: function(){
                                alert("Could not delete payment!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    }
});
