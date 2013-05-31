Ext.define('JavisERP.controller.ContractGridController', {
    extend: 'Ext.app.Controller',

    views: [
        'ContractGrid',
        'ContractWindow'
    ],

    models: [
        'Contract'
    ],

    stores: [
        'Duration'
    ],

    refs: [
        {
            ref: 'advertisementGrid',
            selector: 'advertisementgrid'
        },
        {
            ref: 'contractForm',
            selector: 'contractwindow form[cls=contractform]'
        },
        {
            ref: 'contractWindow',
            selector: 'window[cls=contractWindow]'
        },
        {
            ref: 'clientRecord',
            selector: 'clientrecord'
        },
        {
            ref: 'durationCombo',
            selector: 'contractform combobox[cls=durationlist]'
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

    init: function(application) {
        me = this;
        me.control({
            "contractgrid rowactions": {
                action: me.onContractActionClick
            },
            "contractgrid toolbar button[cls=newcontract]": {
                click: me.onNewContractClick
            }
        });

    },

    onNewContractClick: function() {
        me.contractWindow = new JavisERP.view.ContractWindow();
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
    },

    editContract: function(record){
        var contractForm = null;
        if(!this.getContractWindow()){
            me.contractWindow = new JavisERP.view.ContractWindow();
            contractForm = this.getContractForm();
        } else {
            me.contractWindow = this.getContractWindow();
            contractForm = me.contractWindow.getComponent('contractform');
        }
        this.getContractModel().load(record.data.id,{
            scope: this,
            success: function(model){
                contractForm.loadRecord(model);
                contractForm.getForm().findField('payment_term_id').setValue(new JavisERP.model.PaymentTerm(model.raw.payment_term));
                contractForm.getForm().findField('client_name').setValue(model.raw.client[0].company_name);
                me.durfield = contractForm.getForm().findField('durations');
                this.getDurationStore().clearFilter(true);
                me.durfield.setValue(model.raw.durations);
            }
        });

        me.contractWindow.show();
        this.getAdvertisementGrid().getStore().clearFilter(true);
        this.getAdvertisementGrid().getStore().filter("contract_id",record.data.id);
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
    }

});
