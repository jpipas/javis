Ext.define('JavisERP.controller.ContractGridController', {
    extend: 'Ext.app.Controller',

    views: [
        'ContractGrid',
        'ContractWindow'
    ],

    models: [
        'Contract'
    ],

    refs: [
        {
            ref: 'advertisementGrid',
            selector: '#clientadgrid'
        },
        {
            ref: 'contractForm',
            selector: 'contractwindow form[cls=contractform]'
        },
        {
            ref: 'contractWindow',
            selector: 'contractwindow'
        },
        {
            ref: 'clientRecord',
            selector: 'clientrecord'
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
            success: function(model){
                contractForm.loadRecord(model);
                contractForm.getForm().findField('payment_term_id').setValue(new JavisERP.model.PaymentTerm(model.raw.payment_term));
                contractForm.getForm().findField('client_name').setValue(model.raw.client[0].company_name);

                me.durfield = contractForm.getForm().findField('durations');
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
