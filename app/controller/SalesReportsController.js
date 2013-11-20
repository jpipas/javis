Ext.define('JavisERP.controller.SalesReportsController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.salesreportscontroller',

    views: [
        'ReportPeriodSalesByTerritoryTree',
        'ReportPeriodSalesBySalesRepTree',
        'ReportContractMetricsTree'
    ],
    
    stores: [
        'ReportStore',
        'ReportPeriodSalesByTerritoryStore',
        'ReportPeriodSalesBySalesRepStore',
        'ReportContractMetricsStore'
    ],
    
    models: [
        'Report',
        'ReportPeriodSalesByTerritoryTree',
        'ReportPeriodSalesBySalesRepTree',
        'ReportContractMetricsTree'
    ],
    
    refs:  [
    	{
            ref: 'periodSalesByTerritoryTree',
            selector: 'reportperiodsalesbyterritorytree'
        },
        {
        	ref: 'psttDuration',
        	selector: 'reportperiodsalesbyterritorytree #duration'
        },
        {
        	ref: 'psttTerritory',
        	selector: 'reportperiodsalesbyterritorytree #territory'
        },
        {
            ref: 'periodSalesBySalesRepTree',
            selector: 'reportperiodsalesbysalesreptree'
        },
        {
        	ref: 'pssrtDuration',
        	selector: 'reportperiodsalesbysalesreptree #duration'
        },
        {
        	ref: 'pssrtSoldBy',
        	selector: 'reportperiodsalesbysalesreptree #soldby'
        },
        {
            ref: 'contractMetricsTree',
            selector: 'reportcontractmetricstree'
        },
        {
        	ref: 'cmtDuration',
        	selector: 'reportcontractmetricstree #duration'
        }
    ],
    
    /*
    *	Period Sales by Territory
    */
    exportPeriodSalesByTerritoryReport: function(){
    	if (this.getPsttDuration().isValid()){
	        var req = new JavisERP.model.Report();
	        var criteria = {};
	        criteria['duration_id'] = this.getPsttDuration().getValue();
	        if (this.getPsttTerritory().getValue()){
	        	criteria['territory_id'] = this.getPsttTerritory().getValue();
	        }
	        req.set('criteria', criteria);
	    	var me = this;
	    	var myMask = new Ext.LoadMask(this.getPeriodSalesByTerritoryTree(),{msg:"Generating Spreadsheet..."});
			myMask.show();
	    	req.getProxy().url = '/report/periodsalesbyterritory/';
	    	req.save({
	    		scope: this,
	        	success: function(record, operation){
	                myMask.hide();
					req.getProxy().url = '/report/';
					document.location = '/download/'+record.data.file;
	            },
	            failure: function(record, operation){
	            	myMask.hide();
	            	req.getProxy().url = '/report/';
	            	Ext.MessageBox.show({
				           title: 'Failure',
				           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.ERROR
				       });
	            }
	        });
	    }
    },
    
    loadPeriodSalesByTerritory : function(store, operation, eOpts){
    	if (this.getPsttDuration().getValue()){
    		operation.params['duration_id'] = parseInt(this.getPsttDuration().getValue());
    		if (this.getPsttTerritory().getValue()){
    			operation.params['territory_id'] = parseInt(this.getPsttTerritory().getValue());
    		}
    	} else {
    		return false;
    	}
    },
    
    /*
    *	Period Sales by Sales Rep
    */
    
    exportPeriodSalesBySalesRepReport: function(){
    	if (this.getPssrtDuration().isValid()){
	        var req = new JavisERP.model.Report();
	        var criteria = {};
	        criteria['duration_id'] = this.getPssrtDuration().getValue();
	        if (this.getPssrtSoldBy().getValue()){
	        	criteria['soldby_id'] = this.getPssrtSoldBy().getValue();
	        }
	        req.set('criteria', criteria);
	    	var me = this;
	    	var myMask = new Ext.LoadMask(this.getPeriodSalesBySalesRepTree(),{msg:"Generating Spreadsheet..."});
			myMask.show();
	    	req.getProxy().url = '/report/periodsalesbysalesrep/';
	    	req.save({
	    		scope: this,
	        	success: function(record, operation){
	                myMask.hide();
					req.getProxy().url = '/report/';
					document.location = '/download/'+record.data.file;
	            },
	            failure: function(record, operation){
	            	myMask.hide();
	            	req.getProxy().url = '/report/';
	            	Ext.MessageBox.show({
				           title: 'Failure',
				           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.ERROR
				       });
	            }
	        });
	    }
    },
    
    loadPeriodSalesBySalesRep : function(store, operation, eOpts){
    	if (this.getPssrtDuration().getValue()){
    		operation.params['duration_id'] = parseInt(this.getPssrtDuration().getValue());
    		if (this.getPssrtSoldBy().getValue()){
    			operation.params['soldby_id'] = parseInt(this.getPssrtSoldBy().getValue());
    		}
    	} else {
    		return false;
    	}
    },
    
    /*
    *	Contract Metrics
    */
    
    exportContractMetricsReport: function(){
    	if (this.getCmtDuration().isValid()){
	        var req = new JavisERP.model.Report();
	        var criteria = {};
	        criteria['duration_id'] = this.getCmtDuration().getValue();
	        req.set('criteria', criteria);
	    	var me = this;
	    	var myMask = new Ext.LoadMask(this.getContractMetricsTree(),{msg:"Generating Spreadsheet..."});
			myMask.show();
	    	req.getProxy().url = '/report/contractmetrics/';
	    	req.save({
	    		scope: this,
	        	success: function(record, operation){
	                myMask.hide();
					req.getProxy().url = '/report/';
					document.location = '/download/'+record.data.file;
	            },
	            failure: function(record, operation){
	            	myMask.hide();
	            	req.getProxy().url = '/report/';
	            	Ext.MessageBox.show({
				           title: 'Failure',
				           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.ERROR
				       });
	            }
	        });
	    }
    },
    
    loadContractMetrics : function(store, operation, eOpts){
    	if (this.getCmtDuration().getValue()){
    		operation.params['duration_id'] = parseInt(this.getCmtDuration().getValue());
    	} else {
    		return false;
    	}
    },

    init: function(application) {
        var me = this;

        this.control({
        	"#ReportPeriodSalesByTerritoryTree button[itemId=submitbutton]": {
        		click: function(){
        			me.getPeriodSalesByTerritoryTree().getStore().load();	
        		}
        	},
        	"#ReportPeriodSalesByTerritoryTree button[itemId=exportbutton]": {
        		click: me.exportPeriodSalesByTerritoryReport
        	},
        	"#ReportPeriodSalesByTerritoryTree": {
        		beforeload: me.loadPeriodSalesByTerritory
        	},
        	"#ReportPeriodSalesBySalesRepTree button[itemId=submitbutton]": {
        		click: function(){
        			me.getPeriodSalesBySalesRepTree().getStore().load();	
        		}
        	},
        	"#ReportPeriodSalesBySalesRepTree button[itemId=exportbutton]": {
        		click: me.exportPeriodSalesBySalesRepReport
        	},
        	"#ReportPeriodSalesBySalesRepTree": {
        		beforeload: me.loadPeriodSalesBySalesRep
        	},
        	"#ReportContractMetricsTree button[itemId=submitbutton]": {
        		click: function(){
        			me.getContractMetricsTree().getStore().load();	
        		}
        	},
        	"#ReportContractMetricsTree button[itemId=exportbutton]": {
        		click: me.exportContractMetricsReport
        	},
        	"#ReportContractMetricsTree": {
        		beforeload: me.loadContractMetrics
        	}
        });
    }
});
