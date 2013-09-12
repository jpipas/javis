Ext.define('JavisERP.controller.CommissionController', {
    extend: 'Ext.app.Controller',

    views: [
        'CommissionCycleGrid',
        'CommissionCycleWindow',
        'CommissionStatementPanel',
        'CommissionPeriodTree',
        'CommissionPeriodWindow',
        'CommissionStatementGrid',
        'CommissionBaselineGrid',
    ],

    models: [
        'CommissionCycle',
        'CommissionPeriod',
        'CommissionStatement',
        'CommissionBaseline'
    ],

    stores: [
        'CommissionCycleStore',
        'CommissionPeriodTreeStore',
        'CommissionPeriodStore',
        'CommissionStatementStore',
        'CommissionBaselineStore'
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
        {
            ref: 'commissionPeriodForm',
            selector: 'commissionperiodwindow form[cls=commissionPeriodForm]'
        },
        {
            ref: 'commissionPeriodWindow',
            selector: '#commissionperiodwindow'
        },
        {
            ref: 'commissionPeriodTree',
            selector: 'commissionperiodtree'
        },
        {
            ref: 'commissionStatementGrid',
            selector: 'commissionstatementgrid'
        },
        {
        	ref: 'commissionStatementPanel',
        	selector: 'commissionstatementpanel'
        },
        {
        	ref: 'commissionStatementPrintSelected',
        	selector: 'commissionstatementgrid #commissionstatement_printselected'
        },
        {
        	ref: 'commissionBaselineGrid',
        	selector: 'commissionbaselinegrid'
        },
        {
        	ref: 'commissionBaselinePeriod',
        	selector: 'commissionbaselinegrid #commissionperiod'
        }
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
    Commission Periods
    *****/
    onNewCommPeriodClick: function(act_type) {
        var win = new JavisERP.view.CommissionPeriodWindow();
        win.show();
        var frm = this.getCommissionPeriodForm().getForm();
        frm.findField('duration_id').focus('', 10);
    },
    
    refreshCommPeriodClick: function() {
        this.getCommissionPeriodTree().getStore().load();
    },

	onCommPeriodSaveButtonClick: function(button, options, e){
    	var fields = this.getCommissionPeriodForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var req = new JavisERP.model.CommissionPeriod({id: fields['id']});
        for(var key in fields){
            req.set(key,fields[key]);
        }

        var win = this.getCommissionPeriodWindow();
        var tree = this.getCommissionPeriodTree();
        var me = this;
        //console.log(me.contract);
        req.save({
        	success: function(record, operation){
        		if (fields['id']){
	                var node = tree.getStore().getNodeById(record.data.id);
			        if (node){
			            tree.getStore().load({node:node.parentNode});
			        }
			    } else {
			    	tree.getStore().reload();
			    }
                win.close();
                Ext.Msg.alert('Success','Commission period saved successfully!');
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
    
    editCommPeriod: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = new JavisERP.view.CommissionPeriodWindow();
        var frm = this.getCommissionPeriodForm();
        this.getCommissionPeriodModel().load(record.data.id, {
            success: function(record,operation){
                frm.getForm().loadRecord(record);
                frm.getForm().findField('duration_id').setValue(new JavisERP.model.Duration({id: record.data.duration_id, description: record.data.duration_description}));
                frm.getForm().findField('cycle_id').setValue(new JavisERP.model.CommissionCycle({id : record.data.cycle_id, title : record.data.cycle_title}));
        		frm.getForm().findField('duration_id').focus('', 10);
            }
        });
        var myMask = new Ext.LoadMask(this.getCommissionPeriodWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            win.show();
        },500);
    },
    
    viewCommPeriod: function(tree, record, actionItem, colIndex, event) {
    	if (record.data.leaf == true){
			this.viewCommissionStatements(record.data.id);
        }
    },
    
    viewCommissionStatements: function(period_id){
    	var grid = this.getCommissionStatementGrid();
		grid.getStore().getProxy().url = '/commission/statement/';
		grid.getStore().clearFilter(true);
    	grid.getStore().filter("period_id",period_id);
    	grid.getStore().load();
    },
    
    onCommStatementSelectChange: function(selected, event){
    	if (selected.selected.length > 0){
    		this.getCommissionStatementPrintSelected().enable();
    	} else {
    		this.getCommissionStatementPrintSelected().disable();
    	}
    },
    
    viewCommStatementPdfSelected: function() {
    	var me = this;
    	var grid = this.getCommissionStatementGrid();
    	var selected = grid.getSelectionModel().getSelection();
    	selected_ids = [];
		Ext.each(selected, function (item) {
		  selected_ids.push(item.data.id);
		});
    	var myMask = new Ext.LoadMask(me.getCommissionStatementPanel(),{msg:"Generating PDF..."});
		myMask.show();
    	var req = this.getCommissionStatementModel();
    	req.getProxy().url = '/commission/statement/pdf/';
    	req.getProxy().timeout = 0;
    	req.load(selected_ids, {
        	success: function(record, operation){
                myMask.hide();
				req.getProxy().url = '/commission/statement/';
				req.getProxy().timeout = 30000;
				window.open('/download/'+record.data.pdf);
            },
            failure: function(record, operation){
            	myMask.hide();
            	req.getProxy().url = '/commission/statement/';
            	req.getProxy().timeout = 30000;
            	Ext.MessageBox.show({
			           title: 'Failure',
			           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
            }
        });
    },
    
    viewCommStatementPdf: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	var me = this;
    	var myMask = new Ext.LoadMask(me.getCommissionStatementPanel(),{msg:"Generating PDF..."});
		myMask.show();
    	var req = this.getCommissionStatementModel();
    	req.getProxy().url = '/commission/statement/pdf/';
    	req.load(record.data.id, {
        	success: function(record, operation){
                myMask.hide();
				req.getProxy().url = '/commission/statement/';
				window.open('/download/'+record.data.pdf);
            },
            failure: function(record, operation){
            	myMask.hide();
            	req.getProxy().url = '/commission/statement/';
            	Ext.MessageBox.show({
			           title: 'Failure',
			           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
            }
        });
    },
    
    runCommPeriod: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	var me = this;
        Ext.Msg.show({
            title: 'Generate Commission Statements?',
            msg: 'You are about to generate commission entries for the specified period. Would you like to proceed?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId,text,opt){
                switch(buttonId){
                    case 'ok':
                     	var myMask = new Ext.LoadMask(me.getCommissionStatementPanel(),{msg:"Running Commissions..."});
        				myMask.show();
                    	var req = new JavisERP.model.CommissionStatement({
                    		id: record.data.id
                    	});
                    	var tree_record = record;
                    	req.getProxy().url = '/commission/statement/run/';
                    	req.getProxy().timeout = 0;
                    	req.save({
				        	success: function(record, operation){
				                myMask.hide();
								req.getProxy().url = '/commission/statement/';
								req.getProxy().timeout = 30000;
								var tree = me.getCommissionPeriodTree();
								var node = tree.getStore().getNodeById(tree_record.data.id);
						        if (node){
						            tree.getStore().load({node:node.parentNode});
						        }
								me.getCommissionPeriodTree().getSelectionModel().select(tree_record)
								me.viewCommissionStatements(tree_record.data.id);
				            },
				            failure: function(record, operation){
				            	myMask.hide();
				            	req.getProxy().url = '/commission/statement/';
				            	req.getProxy().timeout = 30000;
				            	Ext.MessageBox.show({
							           title: 'Failure',
							           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
							           buttons: Ext.MessageBox.OK,
							           icon: Ext.MessageBox.ERROR
							       });
				            }
				        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
        return false;
    },
    
    lockCommPeriod: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	var me = this;
        Ext.Msg.show({
            title: 'Lock Commission Period?',
            msg: 'You are about to lock the specified commission period. YOU WILL NO LONGER BE ABLE TO EDIT THIS PERIOD. Would you like to proceed?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId,text,opt){
                switch(buttonId){
                    case 'ok':
                     	var myMask = new Ext.LoadMask(me.getCommissionStatementPanel(),{msg:"Locking Period..."});
        				myMask.show();
                    	var req = new JavisERP.model.CommissionStatement({
                    		id: record.data.id
                    	});
                    	var tree_record = record;
                    	req.getProxy().url = '/commission/statement/lock/';
                    	req.save({
				        	success: function(record, operation){
				                myMask.hide();
								req.getProxy().url = '/commission/statement/';
								var tree = me.getCommissionPeriodTree();
								var node = tree.getStore().getNodeById(tree_record.data.id);
						        if (node){
						            tree.getStore().load({node:node.parentNode});
						        }
								me.getCommissionPeriodTree().getSelectionModel().select(tree_record)
								me.viewCommissionStatements(tree_record.data.id);
				            },
				            failure: function(record, operation){
				            	myMask.hide();
				            	req.getProxy().url = '/commission/statement/';
				            	Ext.MessageBox.show({
							           title: 'Failure',
							           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
							           buttons: Ext.MessageBox.OK,
							           icon: Ext.MessageBox.ERROR
							       });
				            }
				        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
        return false;
    },
    
    resetCommPeriod: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	if (this.disabled){ return false; }
    	var me = this;
        Ext.Msg.show({
            title: 'Reset Commission Period?',
            msg: 'You are about to RESET commission entries for the specified period. ALL EXISTING COMMISSION STATEMENTS FOR THIS PERIOD WILL BE DELETED AND NEED TO BE RE-RUN. Would you like to proceed?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId,text,opt){
                switch(buttonId){
                    case 'ok':
                     	var myMask = new Ext.LoadMask(me.getCommissionStatementPanel(),{msg:"Resetting Commission Period..."});
        				myMask.show();
                    	var req = new JavisERP.model.CommissionStatement({
                    		id: record.data.id
                    	});
                    	var tree_record = record;
                    	req.getProxy().url = '/commission/statement/reset/';
                    	req.save({
				        	success: function(record, operation){
				                myMask.hide();
								req.getProxy().url = '/commission/statement/';
								var tree = me.getCommissionPeriodTree();
								var node = tree.getStore().getNodeById(tree_record.data.id);
						        if (node){
						            tree.getStore().load({node:node.parentNode});
						        }
								me.getCommissionPeriodTree().getSelectionModel().select(tree_record)
								me.viewCommissionStatements(tree_record.data.id);
				            },
				            failure: function(record, operation){
				            	myMask.hide();
				            	req.getProxy().url = '/commission/statement/';
				            	Ext.MessageBox.show({
							           title: 'Failure',
							           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
							           buttons: Ext.MessageBox.OK,
							           icon: Ext.MessageBox.ERROR
							       });
				            }
				        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
        return false;
    },
    
    listCommissionBaselines: function(){
    	var grid = this.getCommissionBaselineGrid();
        if (this.getCommissionBaselinePeriod().getValue()){
        	grid.getStore().clearFilter(true);
        	grid.getStore().filter([{property:'period_id', value: parseInt(this.getCommissionBaselinePeriod().getValue(),10)}]);
        } else {
        	grid.getStore().clearFilter(false);
        }
    },
    
    baselineEdited: function(editor,e){
    	switch (e.field){
    		case 'pages':
    			console.log(e);
    			if (parseInt(e.originalValue) != parseInt(e.value) && e.record.data.baselines && e.record.data.baselines[e.value]){
    				e.record.data.baseline = e.record.data.baselines[e.value];
    			}
    		
    		default:
    			var fields = e.record.data
		        //console.log(fields);
		        var req = new JavisERP.model.CommissionBaseline({id: fields['id']});
		        for(var key in fields){
		            req.set(key,fields[key]);
		        }
		        var me = this;
		        //console.log(me.contract);
		        req.save({
		        	success: function(record, operation){
		        		e.record.data.id = record.data.id;
		        		e.record.commit();
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
    			break;
    	}
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
            },
            "#commissionperiodtoolbar > #commissionperiod_add": {
                click: this.onNewCommPeriodClick
            },
            "#commissionperiodtoolbar > #commissionperiod_refresh": {
                click: this.refreshCommPeriodClick
            },
            "#commissionperiodwindowtoolbar > #savebutton": {
                click: this.onCommPeriodSaveButtonClick
            },
            "commissionperiodtree": {
                itemclick: me.viewCommPeriod
            },
            "commissionperiodtree #period_edit": {
                itemclick: me.editCommPeriod
            },
            "commissionperiodtree #period_run": {
                itemclick: me.runCommPeriod
            },
            "commissionperiodtree #period_reset": {
                itemclick: me.resetCommPeriod
            },
            "commissionperiodtree #period_lock": {
                itemclick: me.lockCommPeriod
            },
            "commissionstatementgrid #commissionstatement_view": {
            	click: me.viewCommStatementPdf
            },
            "commissionstatementgrid #commissionstatement_printselected": {
            	click: me.viewCommStatementPdfSelected
            },
            "commissionstatementgrid": {
            	selectionchange: me.onCommStatementSelectChange
            },
            "commissionbaselinegrid #commission_baseline_get":{
            	click: me.listCommissionBaselines
            },
            "commissionbaselinegrid":{
            	edit: me.baselineEdited
            }
        });

    }    
    
});
