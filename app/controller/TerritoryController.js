Ext.define('JavisERP.controller.TerritoryController', {
    extend: 'Ext.app.Controller',

    views: [
        'TerritoryGrid',
        'TerritoryWindow'
    ],

    models: [
        'Territory',
        'CommissionCycle',
        'Region',
        'User'
    ],

    stores: [
        'TerritoryStore',
        'UserDropDown',
        'State',
        'CommissionCycleStore'
    ],

    refs: [
        {
            ref: 'territoryForm',
            selector: 'form[cls=territoryForm]'
        },
        {
            ref: 'territoryWindow',
            selector: 'window[cls=territoryWindow]'
        },
        {
        	ref: 'territoryGrid',
        	selector: 'territorygrid'
        }
    ],

    onNewTerritoryClick: function(button, options, e) {
        var terWindow = new JavisERP.view.TerritoryWindow();
        terWindow.show();
    },

    onTerritorySaveButtonClick: function(button, options, e){
        var fields = this.getTerritoryForm().getForm().getValues(false,false,false,true);
        var ter = new JavisERP.model.Territory();
        for(var key in fields){
            ter.set(key,fields[key]);
        }
        var tWindow = this.getTerritoryWindow();
        var grid = this.getTerritoryGrid();
        ter.save({
            success: function(record, operation){
            	tWindow.close();
              	grid.getStore().reload();
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
        	"territorygrid #territory_edit": {
                click: me.editTerritory
            },
            "territorygrid #territory_delete": {
                click: me.deleteTerritory
            },
            "territorygrid toolbar button[itemId=newterritory]": {
                click: me.onNewTerritoryClick
            },
            "button[cls=saveTerritoryButton]": {
                click: this.onTerritorySaveButtonClick
            },
            "#territorywindowtoolbar > #cancelbutton": {
                click: function(){ 
                	me.getTerritoryWindow().close();
                }
            }
        });
    },

	editTerritory: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var tWindow = new JavisERP.view.TerritoryWindow();
        var tForm = this.getTerritoryForm();
        this.getUserDropDownStore().clearFilter(true);
        this.getTerritoryModel().load(record.data.id, {
            success: function(record,operation){
            	tForm.getForm().loadRecord(record);
                tForm.getForm().findField('manager_id').setValue(new JavisERP.model.User(record.data.manager));
                tForm.getForm().findField('region_id').setValue(new JavisERP.model.Region({id: record.data.region_id, title: record.data.region_title}));
                tForm.getForm().findField('cycle_id').setValue(new JavisERP.model.CommissionCycle({id : record.data.cycle_id, title : record.data.cycle_title}));
                tWindow.show();
            }
        });        
    },

    deleteTerritory: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
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
