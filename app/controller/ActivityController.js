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
        },
        {
            ref: 'activityGrid',
            selector: '#clientactivitygrid'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
            ref: 'clientForm',
            selector: 'form[cls=clientform]'
        }
    ],
    onActivityActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
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
        var uForm = this.getActivityForm().getForm();
        if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
        	uForm.findField('client_id').setValue(this.getClientId()).setReadOnly(true);
        }
        uForm.findField('status_id').setValue('new');
        if (act_type){
        	uForm.findField('type_id').setValue(act_type);
        }
        uForm.findField('post_date').setValue(new Date());
    },

    onActivitySaveButtonClick: function(button, options, e){
        var fields = this.getActivityForm().getForm().getValues(false,false,false,true);
        me.activity = new JavisERP.model.Activity();
        for(var key in fields){
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
        me.application.on({
            setClientFields: me.setClientFields,
            scope: me
        });

        me.client_id = null;
        me.client_name = null;
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
            "activitygrid toolbar filtercombo[itemId=activtyTypeFilter]": {
            		beforefilter: function(itm, filtervalue, filterfield){
            			var store = this.getActivityGrid().getStore();
                	if (filtervalue){
                  	store.clearFilter(true);
                  	if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
                  		store.filter([
                  		{
	                  			property: filterfield,
	                  			value: filtervalue
									    },
									    {
	                  			property: 'client_id',
	                  			value: this.getClientId()
									    }
									    ]);
                  	} else {
	                  	store.filter(filterfield, filtervalue);
									  }
								  } else {
							  		store.clearFilter(true);
								  }
            		},
                clear: function(itm){
                	var store = this.getActivityGrid().getStore();
                  if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
                  	store.clearFilter(true);
        						store.filter("client_id", this.getClientId());
					        } else {
					        	store.clearFilter(false);
					        }
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
    
    activityFilterClear: function(store) {
    },
    
    setClientFields: function(clientId, clientName) {
        me.client_id = clientId;
        me.client_name = clientName;
    },

    getClientId: function() {
        return this.getClientForm().getForm().findField('id').getValue();
    },

    getClientName: function() {
        return this.getClientForm().getForm().findField('company_name').getValue();
    },

    editActivity: function(record){
        var uWindow = new JavisERP.view.ActivityWindow();
        var uForm = this.getActivityForm();
        this.getActivityModel().load(record.data.id, {
            success: function(record,operation){
                uForm.getForm().loadRecord(record);
                uForm.getForm().findField('client_id').setValue(new JavisERP.model.Client(record.data.client));
                uForm.getForm().findField('assigned_to_id').setValue(new JavisERP.model.User(record.data.assigned_to));
            }
        });
        var myMask = new Ext.LoadMask(this.getActivityWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            uWindow.show();
        },500);
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
