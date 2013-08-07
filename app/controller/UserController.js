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
        'PermissionRoleStore'
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
    
    onUserActionClick: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
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
        var userWindow = new JavisERP.view.UserWindow();
        userWindow.show();
    },

    onUserSaveButtonClick: function(button, options, e){
        var fields = this.getUserForm().getForm().getValues(false,false,false,true);
        var user = new JavisERP.model.User();
        for(var key in fields){
            user.set(key,fields[key]);
        }
        
        var roles = [];
        var recs = this.getUserForm().getForm().findField('roles').getValue();
        for(var key1 in recs){
            var role = new JavisERP.model.PermissionRole();
            role.set("id",recs[key1]);
            roles.push(role);
        }
        user.setAssociatedData("roles",roles);
        
        var uWindow = this.getUserWindow();
        var uStore = this.getUserStore();
        user.save({
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
        var me = this;
        me.control({
            "usergrid #user_edit": {
                click: me.editUser
            },
            "usergrid #user_delete": {
                click: me.deleteUser
            },
            "usergrid toolbar button[itemId=newuser]": {
                click: me.onNewUserClick
            },
            "button[cls=usersavebutton]": {
                click: this.onUserSaveButtonClick
            },
            "#userwindowtoolbar > #cancelbutton": {
                click: function(){ 
                	me.getUserWindow().close();
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

    editUser: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var uWindow = new JavisERP.view.UserWindow();
        var uForm = this.getUserForm();
        this.getUserModel().load(record.data.id, {
            success: function(record,operation){
                uForm.getForm().loadRecord(record);
                uForm.getForm().findField('password').reset();
                var roles = [];
				for (i in record.data.roles){
					roles.push(new JavisERP.model.PermissionRole(record.data.roles[i]));
				}
				uForm.getForm().findField('roles').setValue(roles);
                uForm.getForm().findField('manager_user_id').setValue(new JavisERP.model.User(record.data.manager));
            }
        });
        uWindow.show();
    },

    deleteUser: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
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
