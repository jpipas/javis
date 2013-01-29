Ext.define('JavisERP.controller.UserController', {
    extend: 'Ext.app.Controller',

    views: [
        'UserGrid',
        'UserWindow'
    ],

    models: [
        'User'
    ],

    refs: [
        //{
        //    ref: 'advertisementGrid',
        //    selector: '#clientadgrid'
        //},
    ],
    onUserActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editUser(record);
                break;
            case 'delete_action':
                this.deleteUser(record,grid);
                break;
        }
    },

    onNewUserClick: function(button, options, e) {
        me.userWindow = new JavisERP.view.UserWindow();
        me.userWindow.show();
    },

    init: function(application) {
        me = this;
        me.control({
            "usergrid rowactions": {
                action: me.onUserActionClick
            },
            "usergrid toolbar button[itemId=newuser]": {
                click: me.onNewUserClick
            }
        });

    },

    editUser: function(record){
        me.userWindow = new JavisERP.view.UserWindow();
        //var userForm = this.getContractForm();
        me.userWindow.show();
/*
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

        me.contractWindow.show();
        this.getAdvertisementGrid().getStore().clearFilter(true);
        this.getAdvertisementGrid().getStore().filter("contract_id",record.data.id);
*/
    },

    deleteUser: function(record,grid){
        /*
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
        */
    }

});
