Ext.define('JavisERP.controller.RegionController', {
    extend: 'Ext.app.Controller',

    views: [
        'RegionGrid',
        'RegionWindow'
    ],

    models: [
        'Region',
        'Territory',
        'User'
    ],

    stores: [
        'RegionStore',
        'TerritoryStore',
        'User'
    ],

    refs: [
        {
            ref: 'territoryList',
            selector: 'regionwindow #regionForm combobox[name=territories]'
        },
        {
            ref: 'regionGrid',
            selector: 'regiongrid'
        },
        {
            ref: 'regionForm',
            selector: 'regionwindow #regionForm'
        },
        {
            ref: 'regionWindow',
            selector: '#regionWindow'
        }
    ],

    onNewRegionClick: function(button, options, e) {
        var win = new JavisERP.view.RegionWindow();
        win.show();
        var frm = this.getRegionForm().getForm();
        frm.findField('title').focus('', 10);
    },

    onRegionSaveButtonClick: function(button, options, e){
        var fields = this.getRegionForm().getForm().getValues(false,false,false,true);
        var req = new JavisERP.model.Region();
        for(var key in fields){
            req.set(key,fields[key]);
        }
        
        var terrs = [];
        var recs = this.getTerritoryList().getValue();
        for(var key1 in recs){
            var territory = new JavisERP.model.Territory();
            territory.set("id",recs[key1]);
            terrs.push(territory);
        }
        req.setAssociatedData("territories",terrs);
        
        var win = this.getRegionWindow();
        var grid = this.getRegionGrid();
        
        var myMask = new Ext.LoadMask(win, {msg:"Saving..."});
        myMask.show();
        req.save({
            success: function(record, operation){
            	win.close();
            	grid.getStore().reload();
            	myMask.hide();
            },
            failure: function(record, operation){
            	myMask.hide();
            	Ext.MessageBox.show({
			           title: 'Failure',
			           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
            }
        });
    },
    
    editRegion: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = new JavisERP.view.RegionWindow();
        var frm = this.getRegionForm();
        this.getRegionModel().load(record.data.id, {
            success: function(record,operation){
            	frm.getForm().loadRecord(record);
                frm.getForm().findField('manager_id').setValue(new JavisERP.model.User({id : record.data.manager_id, fullname: record.data.manager_name }));
                var terrs = [];
				for (i in record.data.territories){
					terrs.push(new JavisERP.model.Territory(record.data.territories[i]));
				}
				frm.getForm().findField('territories').setValue(terrs);
        		frm.getForm().findField('title').focus('', 10);
                myMask.hide();
            }
        });    
        win.show();
        var myMask = new Ext.LoadMask(win, {msg:"Loading..."});
        myMask.show();    
    },

    deleteRegion: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.show({
            title: 'Delete Region?',
            msg: 'You are about to delete this region. Would you like to proceed?',
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
                                alert("Could not delete region!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    },
    
    filterTerritoryCombo: function(){
    	var frm = this.getRegionForm().getForm();
    	var combo = frm.findField('territories');
    	var region = frm.findField('id').getValue();
    	
    	combo.getStore().clearFilter(true);
    	// filter by un-assigned territories for the selected region
    	combo.getStore().filter('region_window',(Ext.isEmpty(region)?'new':region));
    },

    init: function(application) {
        var me = this;
        me.control({
        	"regiongrid #region_edit": {
                click: me.editRegion
            },
            "regiongrid #region_delete": {
                click: me.deleteRegion
            },
            "regiongrid toolbar button[itemId=newregion]": {
                click: me.onNewRegionClick
            },
            "regionwindow #regionForm button[itemId=regionsave]": {
                click: this.onRegionSaveButtonClick
            },
            "regionwindow #regionForm combobox[name=territories]":{
            	beforequery: function(){
            		return this.filterTerritoryCombo(this);
            	}
            }
        });
    }
});
