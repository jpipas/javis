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
        me.contractWindow = new JavisERP.view.ContractWindow();
        var contractForm = this.getContractForm();
        this.getContractModel().load(record.data.id,{
            success: function(model){
                contractForm.loadRecord(model);
                contractForm.getForm().findField('payment_term_id').setValue(new JavisERP.model.PaymentTerm(model.raw.payment_term));
                me.durfield = contractForm.getForm().findField('durations');
                var valArray = [];
                Ext.each(model.raw.durations, function(arr,index,durationItself){
                    valArray.push(parseInt(arr.id,10));
                });
                me.durfield.setValue(valArray);
                me.contractWindow.runCalculations();
            }
        });
        var myMask = new Ext.LoadMask(this.getClientRecord(),{msg:"Loading..."});
        myMask.show();
        setTimeout(function() {
            myMask.hide();
            me.contractWindow.show();
        },2500);
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
