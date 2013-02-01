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
        {
            ref: 'userForm',
            selector: 'form[cls=userForm]'
        }
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

        Ext.apply(Ext.form.field.VTypes, {
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: 'Passwords do not match'
        });

    },

    editUser: function(record){
        //console.log(record);
        var uWindow = new JavisERP.view.UserWindow();
        var userForm = this.getUserForm();
        //console.log(this.getUserModel());
        this.getUserModel().load(record.data.id, {
            success: function(model){
                userForm.loadRecord(model);
                uWindow.show();
            }
        });

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
