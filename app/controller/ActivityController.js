Ext.define('JavisERP.controller.ActivityController', {
    extend: 'Ext.app.Controller',

    views: [
        'ActivityGrid',
        'ActivityWindow'
    ],

    models: [
        'Activity'
    ],

    stores: [
        'ActivityStore',
        'ActivityTypeStore',
        'ActivityStatusStore',
        'ClientStore',
        'UserDropDown'
    ],

    refs: [
        {
            ref: 'activityForm',
            selector: 'form[cls=activityForm]'
        },
        {
            ref: 'activityWindow',
            selector: 'window[cls=activityWindow]'
        }
    ],
    onActivityActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        //console.log(doAction[0]);
        switch(doAction[0]){
            case 'edit_action':
                this.editActivity(record);
                break;
            case 'delete_action':
                this.deleteActivity(record,grid);
                break;
        }
    },

    onNewActivityClick: function(act_type) {
        me.activityWindow = new JavisERP.view.ActivityWindow();
        me.activityWindow.show();
        this.getActivityForm().getForm().findField('status_id').setValue('new');
        if (act_type){
        	this.getActivityForm().getForm().findField('type_id').setValue(act_type);
        }
        this.getActivityForm().getForm().findField('post_date').setValue(new Date());
        //console.log(act_type);
    },

    onActivitySaveButtonClick: function(button, options, e){
        var fields = this.getActivityForm().getForm().getValues(false,false,false,true);
        me.activity = new JavisERP.model.Activity();
        for(var key in fields){
            //console.log(key+":"+fields[key]);
            me.activity.set(key,fields[key]);
        }
        var uWindow = this.getActivityWindow();
        var uStore = this.getActivityStoreStore();
        me.activity.save({
            success: function(record, operation){
                uWindow.close();
                uStore.reload();
                Ext.Msg.alert('Success','Activity saved successfully!');
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
        		"activitygrid rowactions": {
                action: me.onActivityActionClick
            },
            "activitygrid toolbar button[itemId=newactivitytask]": {
                click: function(button, options, e){
                		this.onNewActivityClick('task');
                	}
            },
            "activitygrid toolbar button[itemId=newactivityphone]": {
                click: function(button, options, e){
                		this.onNewActivityClick('phone');
                	}
            },
            "activitygrid toolbar button[itemId=newactivityevent]": {
                click: function(button, options, e){
                		this.onNewActivityClick('event');
                	}
            },
            "button[cls=activitysavebutton]": {
                click: this.onActivitySaveButtonClick
            },
            "button[cls=cancelbutton]": {
                click: function(){
                		Ext.WindowMgr.getActive().close();
                	}
            }
        });
    },

    editActivity: function(record){
        var uWindow = new JavisERP.view.ActivityWindow();
        //console.log(this.getUserModel());
        var uForm = this.getActivityForm();
        this.getActivityModel().load(record.data.id, {
            success: function(record,operation){
            		console.log(record.data.assigned_to);
                uForm.getForm().loadRecord(record);
                //uForm.getForm().findField('client_id').setValue(new JavisERP.model.Client(record.data.client));
                uForm.getForm().findField('assigned_to_id').setValue(new JavisERP.model.User(record.data.assigned_to));
                /*
                var date_parts = record.data.post_date.split('-');
                this.getActivityForm().getForm().findField('post_date').setValue(new Date(date_parts[0], date_parts[1] - 1, date_parts[2]));
                if (record.data.post_time){
                	var time_parts = record.data.post_time.split(' ');

                }
                */
                //uForm.getForm().findField('manager_user_id').setValue(new JavisERP.model.User(record.data.manager));
            }
        });
        uWindow.show();
    },

    deleteActivity: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Activity?',
            msg: 'You are about to delete this activity.  Would you like to proceed?',
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
                                alert("Could not delete activity!");
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
