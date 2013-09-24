Ext.define('JavisERP.controller.PermissionResourceController', {
    extend: 'Ext.app.Controller',
		
    views: [
        'PermissionResourceTree',
        'PermissionResourceWindow'
    ],

    models: [
        'PermissionResource'
    ],

    stores: [
        'PermissionResourceStore',
        'PermissionResourceDataStore'
    ],

    refs: [
        {
            ref: 'resourceTree',
            selector: 'permissionresourcetree'
        },
        {
        	ref: 'resourceWindow',
        	selector: '#permissionResourceWindow'
        },
        {
        	ref: 'resourceForm',
        	selector: '#permissionResourceWindow > #permissionResourceForm'
        }
    ],

	onNewResourceClick: function(isFolder){
		var win = new JavisERP.view.PermissionResourceWindow();
		win.show();
		var frm = this.getResourceForm();
		if (isFolder){
			frm.getForm().findField('parent_id').hide();
			frm.getForm().findField('resourceid').hide();
			frm.getForm().findField('is_folder').setValue(1);
		}
		frm.getForm().findField('title').focus('', 10);
	},
	
	onSaveButtonClick: function(button, e, options) {
        var fields = this.getResourceForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var resource = new JavisERP.model.PermissionResource({id: fields['id']});
        for(var key in fields){
            resource.set(key,fields[key]);
        }
        var win = this.getResourceWindow();
        var tree = this.getResourceTree();
        //console.log(me.contract);
        resource.save({
           	success: function(record, operation){
				tree.getStore().reload();
				win.close();
				Ext.Msg.alert('Success','Resource saved successfully!');
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
    
    editResource: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	var win = new JavisERP.view.PermissionResourceWindow();
        var frm = this.getResourceForm();
        var me = this;
        this.getPermissionResourceModel().load(record.data.id,{
        	success: function(record,operation){
				frm.getForm().loadRecord(record);
				if (record.data.parent_id){
					frm.getForm().findField('parent_id').setValue(new JavisERP.model.PermissionResource({id : record.data.parent_id, title : record.data.parent_title}));
				} else {
					frm.getForm().findField('parent_id').hide();
					frm.getForm().findField('resourceid').hide();
					frm.getForm().findField('is_folder').setValue(1);
				}
				frm.getForm().findField('title').focus('', 10);
          }
        });
        win.show();
    },
    
    deleteResource: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	Ext.Msg.show({
            title: 'Delete Resource?',
            msg: 'You are about to delete this permission resource. Would you like to proceed?',
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
                                alert("Could not delete permission resource!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    },

    init: function(application) {
        var me = this;
        me.control({
        	"permissionresourcewindow #permissionResourceForm button[itemId=savebutton]": {
                click: this.onSaveButtonClick
            },
            "permissionresourcetree #resource_edit": {
                itemclick: me.editResource
            },            
            "permissionresourcetree #resource_delete": {
                itemclick: me.deleteResource
            }, 
        	"permissionresourcetree #new_resource": {
                click: function(){
                	me.onNewResourceClick(false);
                }
            },
            "permissionresourcetree #new_resource_folder": {
                click: function(){
                	me.onNewResourceClick(true);
                }
            }
        });
    }
});
