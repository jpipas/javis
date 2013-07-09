Ext.define('JavisERP.controller.UserController', {
    extend: 'Ext.app.Controller',

    views: [
        'UserGrid',
        'UserWindow'
    ],

    models: [
        'User'
    ],

    stores: [
        'User',
        'UserDropDown',
        'TerritoryStore'
    ],

    refs: [
        {
            ref: 'userForm',
            selector: 'form[cls=userForm]'
        },
        {
            ref: 'userWindow',
            selector: 'window[cls=userWindow]'
        }
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

    onUserSaveButtonClick: function(button, options, e){
        var fields = this.getUserForm().getForm().getValues(false,false,false,true);
        me.user = new JavisERP.model.User();
        for(var key in fields){
            me.user.set(key,fields[key]);
        }
        var uWindow = this.getUserWindow();
        var uStore = this.getUserStore();
        me.user.save({
            success: function(record, operation){
            	uWindow.close();
              uStore.reload();
              Ext.Msg.alert('Success','Employee saved successfully!');
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
        me = this;
        me.control({
            "usergrid rowactions": {
                action: me.onUserActionClick
            },
            "usergrid toolbar button[itemId=newuser]": {
                click: me.onNewUserClick
            },
            "button[cls=usersavebutton]": {
                click: this.onUserSaveButtonClick
            },
            "button[cls=cancelbutton]": {
                click: function(){ 
                		if (Ext.WindowMgr.getActive()){
                			Ext.WindowMgr.getActive().close();
                		}
                	}
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
        var uWindow = new JavisERP.view.UserWindow();
        var uForm = this.getUserForm();
        this.getUserModel().load(record.data.id, {
            success: function(record,operation){
                uForm.getForm().loadRecord(record);
                uForm.getForm().findField('password').reset();
                uForm.getForm().findField('territory_id').setValue(new JavisERP.model.Territory(record.data.territory));
                uForm.getForm().findField('manager_user_id').setValue(new JavisERP.model.User(record.data.manager));
            }
        });
        uWindow.show();
    },

    deleteUser: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Employee?',
            msg: 'You are about to delete this user.  Would you like to proceed?',
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
                                alert("Could not delete user!");
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
