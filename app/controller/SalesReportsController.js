Ext.define('JavisERP.controller.SalesReportsController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.salesreportscontroller',

    views: [
        'ReportPeriodSalesByTerritoryWindow'
    ],
    
    stores: [
        'ReportStore'
    ],
    
    models: [
        'Report'
    ],
    
    refs:  [
    	{
            ref: 'periodSalesByTerritoryForm',
            selector: '#reportPeriodSalesByTerritoryForm'
        }
    ],
    
    runPeriodSalesByTerritoryReport: function(){
    	var frm = this.getPeriodSalesByTerritoryForm();
    	if (frm.getForm().isValid()){
	    	var fields = frm.getForm().getValues(false,false,false,true);
	        var req = new JavisERP.model.Report();
	        var criteria = {};
	        for(var key in fields){
	        	criteria[key] = fields[key];
	        }
	        req.set('criteria', criteria);
	    	var me = this;
	    	var myMask = new Ext.LoadMask(frm,{msg:"Generating Report..."});
			myMask.show();
	    	req.getProxy().url = '/report/periodsalesbyterritory/';
	    	req.save({
	    		scope: this,
	        	success: function(record, operation){
	        		console.log(record);
	                myMask.hide();
					req.getProxy().url = '/report/';
					window.open('/download/'+record.data.file);
	            },
	            failure: function(record, operation){
	            	myMask.hide();
	            	console.log('fail');
	            	console.log(record);
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

    init: function(application) {
        var me = this;

        this.control({
        	"#reportPeriodSalesByTerritoryForm button[itemId=submitbutton]": {
        		click: me.runPeriodSalesByTerritoryReport
        	}
        });
    }
});
