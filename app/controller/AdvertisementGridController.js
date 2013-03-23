Ext.define('JavisERP.controller.AdvertisementGridController', {
    extend: 'Ext.app.Controller',

    views: [
        'AdvertisementGrid',
        'AdvertisementWindow'
    ],

    models: [
        'Advertisement'
    ],

    refs: [
        {
            ref: 'advertisementGrid',
            selector: '#clientadgrid'
        }
    ],
    onContractActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editAdvertisement(record);
                break;
            case 'delete_action':
                this.deleteAdvertisement(record,grid);
                break;
            case 'view_action':
                this.viewAdvertisement(record);
                break;
        }
    },

    init: function(application) {
        me = this;
        me.control({
            "contractgrid rowactions": {
                action: me.onAdvertisementActionClick
            }
        });

    },

    editAdvertisement: function(record){
        me.contractWindow = new JavisERP.view.ContractWindow();
        var contractForm = this.getContractForm();
        this.getAdvertisementModel().load(record.data.id,{
            success: function(model){
                //console.log(model);
                contractForm.loadRecord(model);
                contractForm.getForm().findField('payment_term_id').setValue(new JavisERP.model.PaymentTerm(model.raw.payment_term));
                me.durfield = contractForm.getForm().findField('durations');
                me.durfield.setValue(model.raw.durations);
                //console.log(model.raw.durations);
                me.contractWindow.runCalculations();
            }
        });
        var myMask = new Ext.LoadMask(this.getClientRecord(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            me.contractWindow.show();
        },1500);
        //this.getAdvertisementGrid().getStore().clearFilter(true);
        //this.getAdvertisementGrid().getStore().filter("contract_id",record.data.id);
    },
    deleteAdvertisement: function(record,grid){
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
    viewAdvertisement: function(record){

    }

});
