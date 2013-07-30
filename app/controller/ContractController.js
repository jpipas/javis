Ext.define('JavisERP.controller.ContractController', {
    extend: 'Ext.app.Controller',
    
	client: {
		id: '',
		name: ''
	},
	
	isLoadingEdit: false,

    views: [
        'ContractGrid',
        'ContractWindow'
    ],

    stores: [
        'Duration'
    ],
    
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
            ref: 'durationList',
            selector: 'combobox[cls=durationlist]'
        },
        {
            ref: 'contractGrid',
            selector: 'contractgrid'
        },
        {
            ref: 'contractForm',
            selector: 'form[cls=contractForm]'
        },
        {
            ref: 'contractWindow',
            selector: '#contractWindow'
        },
        {
            ref: 'clientForm',
            selector: 'form[cls=clientform]'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
        		ref: 'adWindow',
        		selector: '#adwindow'
        },
        {
            ref: 'adForm',
            selector: 'adwindow form[cls=adForm]'
        }
    ],
    onContractActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editContract(record);
                break;
            case 'delete_action':
                this.deleteContract(record,grid);
                break;
        }
    },

    runCalcs: function(target) {
        this.paymentCalculations();
    },

    onSaveButtonClick: function(button, e, options) {
        var fields = this.getContractForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var contract = new JavisERP.model.Contract({id: fields['id']});
        for(var key in fields){
            contract.set(key,fields[key]);
        }

        var durations = [];
        var recs = this.getDurationList().getValue();
        for(var key1 in recs){
            var duration = new JavisERP.model.Duration();
            duration.set("id",recs[key1]);
            durations.push(duration);
        }

        contract.setAssociatedData("durations",durations);
        //contract.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));
        var cWindow = this.getContractWindow();
        var cGrid = this.getContractGrid();
        var cc = this.getContentCards();
        //console.log(me.contract);
        contract.save({
           	success: function(record, operation){
				cGrid.getStore().reload();
				cWindow.close();
				Ext.Msg.alert('Success','Contract saved successfully!');
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

    onWindowClose: function(button,opts) {
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
                        this.getContractGrid().getStore().reload();
                    }
                 }
            });
            this.getContractWindow().close();
        } else {
            this.getContractWindow().close();
        }
    },

    init: function(application) {
        var me = this;
        me.application.on({
            setClientFields: me.setClientFields,
            onAdvertisementSaved: me.onAdvertisementSaved,
            scope: me
        });

        this.client.id = null;
        this.client.name = null;
        me.control({
            "contractgrid rowactions": {
                action: me.onContractActionClick
            },
            "contractgrid toolbar button[cls=newcontract]": {
                click: me.onNewContractClick
            },
            "#contractdurations": {
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
            "#contractads":{
            	ontrigger2click: function(){
            		this.onNewAdvertisementClick();
            	},
            	beforequery: function(){
            		this.filterContractAdsCombo(this);
            	}
            }
        });

    },
    
    onNewAdvertisementClick: function(){
    	var cForm = this.getContractForm().getForm();
    	var client = cForm.findField('client_id');
    	var terr = cForm.findField('territory_id');
    	if (!client.getValue() || !terr.getValue()){
    		Ext.Msg.alert('Alert','Please select a client and territory before creating a new advertisement for this contract.');
    	} else {
    		var adWin = new JavisERP.view.AdvertisementWindow();
    		adWin.show();
      		var adForm = this.getAdForm().getForm();
      		adForm.findField('client_id').setValue(new JavisERP.model.Client({ id: client.getValue(), company_name: client.getRawValue() })).setReadOnly(true);
      		
      		// filter publications based on the territory for the contract
      		adForm.findField('publications').getStore().clearFilter(true);
      		adForm.findField('publications').getStore().filter('territory_id', terr.getValue());
      }
    },
    
    filterContractAdsCombo: function(){
    	var cForm = this.getContractForm().getForm();
    	var combo = cForm.findField('advertisements');
    	combo.getStore().clearFilter(true);
    	combo.getStore().filter("client_id", cForm.findField('client_id').getValue());
    },
    
    onAdvertisementSaved: function(ad){
    	if (this.getContractForm()){
    		var cForm = this.getContractForm().getForm().findField('advertisements').addValue(new JavisERP.model.Advertisement(ad));
    	}
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

    onNewContractClick: function() {
        contractWindow = new JavisERP.view.ContractWindow();
        contractWindow.show();
        var cForm = this.getContractForm().getForm();
        cForm.reset(true);
        // if we are on a client record, pre-fill the client and set the field as read-only
        if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
        	cForm.findField('client_id').setValue(new JavisERP.model.Client({ id: this.getClientId(), company_name: this.getClientName() })).setReadOnly(true);
        }
        
        /*
        var contract_id = null;
        me.contract = new JavisERP.model.Contract({
            client_id: me.client_id
        });
        me.durationStore = this.getDurationStore();
        me.contract.save({
            scope: this,
            callback: function(record,operation){
                if(operation.success){
                    contract_id = record.data.id;
                    client = record.data.client_id;

                    this.getContractWindow().show();
                    this.getContractForm().getForm().reset(true);
                    this.getContractForm().loadRecord(record);
                    this.getContractForm().getForm().setValues({client_name: operation.resultSet.records[0].raw.client[0].company_name, is_new:1});
                    me.durationStore.clearFilter(true);
                    this.getAdvertisementGrid().getStore().clearFilter(true);
                    this.getAdvertisementGrid().getStore().filter("contract_id",contract_id);
                }
            }
        });
        */
    },

    editContract: function(record){
		var contractWindow = new JavisERP.view.ContractWindow();
        var contractForm = this.getContractForm();
        var cc = this.getContentCards();
        var me = this;
        this.getContractModel().load(record.data.id,{
        	success: function(record,operation){
        		me.isLoadingEdit = true;
				contractForm.getForm().loadRecord(record);
				var durations = [];
				for (i in record.data.durations){
					durations.push(new JavisERP.model.Publication(record.data.durations[i]));
				}
				contractForm.getForm().findField('durations').setValue(durations);
				
				var ads = [];
				for (i in record.data.advertisements){
					ads.push(new JavisERP.model.Advertisement(record.data.advertisements[i]));
				}
				contractForm.getForm().findField('advertisements').setValue(ads);
				contractForm.getForm().findField('client_id').setValue(new JavisERP.model.Client({id : record.data.client_id, company_name : record.data.client_company_name}));
				contractForm.getForm().findField('payment_term_id').setValue(new JavisERP.model.PaymentTerm({id : record.data.payment_term_id, description: record.data.payment_term_description}));
				if (cc.getLayout().getActiveItem().getXType() == 'clientrecord'){
					contractForm.getForm().findField('client_id').setReadOnly(true);
				}
				me.isLoadingEdit = false;
          }
        });

        contractWindow.show();
    },
    
    deleteContract: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Contract?',
            msg: 'You are about to delete this contract.  Would you like to proceed?',
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
                                alert("Could not delete contract!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    },
    
    runCalculations: function() {
    	if (!this.isLoadingEdit){
	        var form = this.getContractForm().getForm();
	
	        var total_sales_amt = form.findField("total_sales").getValue();
	        var discount = form.findField("discount").getValue();
	        var subtotal = form.findField("subtotal").getValue();
	        var design_fee = form.findField("design_fee").getValue();
	
	        var sub_total_calc = (total_sales_amt*(1-discount)).toFixed(2);
	        form.findField("subtotal").setValue(sub_total_calc);
	
	        var total_calc = parseFloat(sub_total_calc) + design_fee;
	        form.findField("total_amount").setValue(total_calc.toFixed(2));
	
	        this.paymentCalculations();
		}
    },

    paymentCalculations: function() {
    	if (!this.isLoadingEdit){
	        var form = this.getContractForm().getForm();
	
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
    }

});
