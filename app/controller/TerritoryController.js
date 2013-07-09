Ext.define('JavisERP.controller.TerritoryController', {
    extend: 'Ext.app.Controller',

    views: [
        'TerritoryGrid',
        'TerritoryWindow'
    ],

    models: [
        'Territory'
    ],

    stores: [
        'TerritoryStore',
        'UserDropDown',
        'State'
    ],

    refs: [
        {
            ref: 'territoryForm',
            selector: 'form[cls=territoryForm]'
        },
        {
            ref: 'territoryWindow',
            selector: 'window[cls=territoryWindow]'
        }
    ],

		onTerritoryActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editTerritory(record);
                break;
            case 'delete_action':
                this.deleteTerritory(record,grid);
                break;
        }
    },

    onNewTerritoryClick: function(button, options, e) {
        me.terWindow = new JavisERP.view.TerritoryWindow();
        //this.getUserStore().clearFilter(true);
        me.terWindow.show();
    },

    onTerritorySaveButtonClick: function(button, options, e){
        var fields = this.getTerritoryForm().getForm().getValues(false,false,false,true);
        me.ter = new JavisERP.model.Territory();
        for(var key in fields){
            me.ter.set(key,fields[key]);
        }
        var tWindow = this.getTerritoryWindow();
        var tStore = this.getTerritoryStoreStore();
        me.ter.save({
            /*
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    tWindow.close();
                    tStore.reload();
                    Ext.Msg.alert('Success','Territory saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }*/
            success: function(record, operation){
            	tWindow.close();
              tStore.reload();
              Ext.Msg.alert('Success','Territory saved successfully!');
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
        		"territorygrid rowactions": {
                action: me.onTerritoryActionClick
            },
            "territorygrid toolbar button[itemId=newterritory]": {
                click: me.onNewTerritoryClick
            },
            "button[cls=saveTerritoryButton]": {
                click: this.onTerritorySaveButtonClick
            },
            "button[cls=cancelbutton]": {
                click: function(){ 
                		if (Ext.WindowMgr.getActive()){
                			Ext.WindowMgr.getActive().close();
                		}
                	}
            }
        });
    },

		editTerritory: function(record){
        var tWindow = new JavisERP.view.TerritoryWindow();
        var tForm = this.getTerritoryForm();
        this.getUserDropDownStore().clearFilter(true);
        this.getTerritoryModel().load(record.data.id, {
            success: function(record,operation){
            		tForm.getForm().loadRecord(record);
                tForm.getForm().findField('manager_id').setValue(new JavisERP.model.User(record.data.manager));
                tWindow.show();
            }
        });        
    },

    deleteTerritory: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Territory?',
            msg: 'You are about to delete this territory. Would you like to proceed?',
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
                                alert("Could not delete territory!");
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
