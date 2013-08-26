Ext.define('JavisERP.controller.CommissionController', {
    extend: 'Ext.app.Controller',

    views: [
        'CommissionCycleGrid',
        'CommissionCycleWindow'
    ],

    models: [
        'CommissionCycle'
    ],

    stores: [
        'CommissionCycleStore'
    ],

    refs: [
        {
            ref: 'commissionCycleGrid',
            selector: 'commissioncyclegrid'
        },
        {
            ref: 'commissionCycleForm',
            selector: 'commissioncyclewindow form[cls=commissionCycleForm]'
        },
        {
            ref: 'commissionCycleWindow',
            selector: '#commissioncyclewindow'
        },
    ],
    
    /*****
    Commission Cycles
    *****/
    onNewCommCycleClick: function(act_type) {
        var win = new JavisERP.view.CommissionCycleWindow();
        win.show();
        var frm = this.getCommissionCycleForm().getForm();
        frm.findField('title').focus('', 10);
    },
    
    onCommCycleSaveButtonClick: function(button, options, e){
    	var fields = this.getCommissionCycleForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var req = new JavisERP.model.CommissionCycle();
        for(var key in fields){
            req.set(key,fields[key]);
        }

        var win = this.getCommissionCycleWindow();
        var grid = this.getCommissionCycleGrid();
        var me = this;
        //console.log(me.contract);
        req.save({
        	success: function(record, operation){
                grid.getStore().reload();
                win.close();
                Ext.Msg.alert('Success','Commission cycle saved successfully!');
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
    
    editCommCycle: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = new JavisERP.view.CommissionCycleWindow();
        var frm = this.getCommissionCycleForm();
        this.getCommissionCycleModel().load(record.data.id, {
            success: function(record,operation){
                frm.getForm().loadRecord(record);
        		frm.getForm().findField('title').focus('', 10);
            }
        });
        var myMask = new Ext.LoadMask(this.getCommissionCycleWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            win.show();
        },500);
    },

    deleteCommCycle: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.show({
            title: 'Delete Commission Cycle?',
            msg: 'You are about to delete this commission cycle. ALL territories that use this cycle will be affected!!!  Would you like to proceed?',
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
                                alert("Could not delete commission cycle!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    },

	/*****
    Commission Init
    *****/
    init: function(application) {
        var me = this;
        
        me.control({
            "commissioncyclegrid #commissioncycle_edit": {
                click: me.editCommCycle
            },
            "commissioncyclegrid #commissioncycle_delete": {
                click: me.deleteCommCycle
            },
            "commissioncyclegrid toolbar button[itemId=newcommissioncycle]": {
                click: this.onNewCommCycleClick
            },
            "#commissioncyclewindowtoolbar > #savebutton": {
                click: this.onCommCycleSaveButtonClick
            }
        });

    }    
    
});
