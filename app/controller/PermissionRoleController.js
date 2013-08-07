Ext.define('JavisERP.controller.PermissionRoleController', {
    extend: 'Ext.app.Controller',
		
    views: [
        'PermissionRoleGrid',
        'PermissionResourceCheckTree'
    ],

    models: [
        'PermissionRole'
    ],

    stores: [
        'PermissionResourceCheckStore',
        'PermissionRoleStore'
    ],

    refs: [
    	{
    		ref: 'roleGrid',
    		selector: '#permissionrolegrid'
    	},
        {
            ref: 'resourceTree',
            selector: '#resourcetree'
        },
        {
        	ref: 'permissionRoleForm',
        	selector: '#permissionroleform'
        }
    ],

	onNewRoleClick: function(isFolder){
		var grid = this.getRoleGrid();
    	grid.getSelectionModel().deselectAll();
    	
    	var frm = this.getPermissionRoleForm();
    	frm.getForm().reset();
    	
    	var tree = this.getResourceTree();
    	tree.getRootNode().cascadeBy(function(n) {
			// folders won't have a checkbox
			if (n.data.leaf == true){
				n.set('checked', false);
			}
    	});
		frm.getForm().findField('title').focus('', 10);
	},
	
	onSaveButtonClick: function(button, e, options) {
		var frm = this.getPermissionRoleForm();
        var fields = frm.getForm().getValues(false,false,false,true);
        var role = new JavisERP.model.PermissionRole({id: fields['id']});
        for(var key in fields){
            role.set(key,fields[key]);
        }
        
        var grid = this.getRoleGrid();
        var tree = this.getResourceTree();
        var records = tree.getView().getChecked();
        var resources = [];
		Ext.Array.each(records, function(rec){
			resources.push(rec.get('id'));
		});
		role.set("resources",resources);
        
        role.save({
           	success: function(record, operation){
				grid.getStore().reload();
				Ext.Msg.alert('Success','Role saved successfully!');
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
    
    deleteRole: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
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
        	"permissionroles #permissionroleform button[itemId=savebutton]": {
                click: this.onSaveButtonClick
            },
        	"permissionroles #permissionrolegrid": {
                selectionchange: me.onSelectionChange
            },
            "permissionroles #new_role": {
                click: me.onNewRoleClick
            }
        });
    },
    
    onSelectionChange: function(model, records) {
        var rec = records[0];
        var tree = this.getResourceTree();
        if (rec) {
        	var frm = this.getPermissionRoleForm();
        	var myMask = new Ext.LoadMask(frm, {msg:"Please wait..."});
			myMask.show();
        	this.getPermissionRoleModel().load(rec.data.id,{
	        	success: function(record,operation){
					frm.getForm().loadRecord(record);
					tree.getRootNode().cascadeBy(function(n) {
						// folders won't have a checkbox
						if (n.data.leaf == true){
							n.set('checked', false);
							if (record.data.resources){
								for (i in record.data.resources){
									if (n.data.id == record.data.resources[i].id){
										n.set('checked', true);
										continue;
									}
								}
							}
						}
			    	});
			    	myMask.hide();
	          	}
	        });
        }
    }
});
