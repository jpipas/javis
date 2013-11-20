Ext.define('JavisERP.controller.ProductionPhotosController', {
    extend: 'Ext.app.Controller',

    views: [
        'ProductionPhotosPanel',
        'ProductionPhotosDataView',
        'ProductionPhotosDetailPanel',
        'ProductionPhotosWindow',
        'ProductionPhotosUploadGrid'
    ],

    models: [
        'Production'
    ],

    stores: [
        'ProductionStore'
    ],

    refs: [
        {
            ref: 'photoForm',
            selector: 'form[itemId=productionPhotoForm]'
        },
        {
            ref: 'photoWindow',
            selector: 'window[itemId=productionPhotosWindow]'
        },
        {
        	ref: 'photoDataView',
        	selector: '#productionphotosdataview'
        },
        {
        	ref: 'photoDetailView',
        	selector: '#productionphotosdetailpanel'
        },
        {
        	ref: 'photoUploadProgress',
        	selector: 'productionphotosuploadgrid'
        }
    ],
    
    openUploadWindow: function(id){
    	var win = this.getPhotoWindow();
    	if (!win){
    		var win = new JavisERP.view.ProductionPhotosWindow();
    	}
    	win.show();
    	var frm = this.getPhotoForm();
    	frm.getForm().reset();
    	if (Ext.isNumeric(id)){
    		this.getProductionModel().load(id,{
				success: function(record,operation){
					myMask.hide();
					frm.getForm().loadRecord(record);
					frm.getForm().findField('file_full').disable();
	        	}
	        });
	        var myMask = new Ext.LoadMask(win, {msg:"Loading..."});
	        myMask.show();
    	} else {
    		frm.getForm().findField('file_full').enable();
    	}
    },
    
    uploadFileChange: function(f,new_val){
    	if (new_val.match(/\\/)){
			var oParts = new_val.split('\\');
		} else {
			var oParts = new_val.split('/');
		}
		var index = oParts.length - 1;
		var filename = '';
		if (oParts[index]){
			 filename = oParts[index];
		}
		var frm = this.getPhotoForm().getForm();
		frm.findField('title').setValue(filename.replace(/\.[^/.]+$/, ""));
		frm.findField('filename').setValue(filename);
    },
    
    onPhotoSaveButtonClick: function(){
    	var frm = this.getPhotoForm();
    	if(frm.getForm().isValid()){
    		var me = this;
    		var url = '/production/';
    		
    		// if editing, we are only modifying database and not photo
    		if (frm.getForm().findField('id').getValue() != ''){
    			url += frm.getForm().findField('id').getValue();
    			var fields = frm.getForm().getValues(false,false,false,true);
		        var upload = new JavisERP.model.Production({id: fields['id']});
		        for(var key in fields){
		            upload.set(key,fields[key]);
		        }
		        var win = this.getPhotoWindow();
		        var dv = this.getPhotoDetailView();
		        var myMask = new Ext.LoadMask(win, {msg:"Saving..."});
	        	myMask.show();
		        upload.save({
		           	success: function(record, operation){
		           		myMask.hide();
						frm.getForm().reset();
						win.close();
						dv.loadRecord(record)
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
		    
		    // if we are uploading a new photo, handle that here
    		} else {
    			url += 'new';
    			var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
				var uniqid = randLetter + Date.now();
	    		frm.getForm().findField('upload_id').setValue(uniqid);
	    		var fields = frm.getForm().getValues(false,false,false,true);
		        var upload = new JavisERP.model.Production({id: fields['id']});
		        for(var key in fields){
		            upload.set(key,fields[key]);
		        }
		        var grid = this.getPhotoUploadProgress();
		        grid.expand(true);
		        grid.getStore().add(upload);
		        var rowIndex = grid.getStore().find('upload_id', uniqid);
	            var row = grid.getStore().getAt(rowIndex);
	            // commit so we don't show dirty indicators
		        row.commit();
	    		
	            frm.getForm().submit({
	                url: url,
	                reset: true,
	                success: function(fp, o){
	                	var rowIndex = grid.getStore().find('upload_id', o.result.production.upload_id);
				    	var row = grid.getStore().getAt(rowIndex);
				    	row.data.id = o.result.production.id;
				    	row.data.upload_id = 'success';
				    	// commit to toggle progress bar
				    	row.commit();
	                },
	                failure: function(fp, o){
	                	var rowIndex = grid.getStore().find('upload_id', o.result.production.upload_id);
				    	var row = grid.getStore().getAt(rowIndex);
				    	row.data.upload_id = 'failure';
				    	row.commit();
				    	Ext.MessageBox.show({
					           title: 'Failure Uploading '+o.result.production.filename,
					           msg: "<p>The following errors were encountered:</p><ul><li>"+o.result.error.join("</li><li>")+'</li></ul>',
					           buttons: Ext.MessageBox.OK,
					           icon: Ext.MessageBox.ERROR
					       });
	                }
	            });
	            setTimeout(function(){ frm.getForm().reset(); }, 500);
    		}
        }
    },
    
	loadPhotoDataView: function(){
		var dv = this.getPhotoDataView();
		dv.getStore().clearFilter(true);
		dv.getStore().filter({ type_id : 'photos' });
		dv.getStore().load();
	},
	
	viewPhoto: function(dataview, selections){
		var selected = selections[0];
		if (selected){
			this.getPhotoDetailView().loadRecord(selected);
		}
	},

	downloadPhoto: function(image){
		document.location = '/production/download/'+image.id;
	},
	
	deletePhoto: function(image){
		var grid = this.getPhotoDataView();
		var detail = this.getPhotoDetailView();
		this.getProductionModel().load(image.id,{
			success: function(record,operation){
				myMask.hide();
				Ext.Msg.show({
		            title: 'Delete Photo '+record.data.filename+'?',
		            msg: 'You are about to delete the selected photo.  Would you like to proceed?',
		            buttons: Ext.Msg.OKCANCEL,
		            icon: Ext.Msg.QUESTION,
		            fn: function(buttonId,text,opt){
		                switch(buttonId){
		                    case 'ok':
		                        record.destroy({
		                            success: function(){
		                                grid.getStore().remove(record);
		                            },
		                            failure: function(){
		                                alert("Could not delete photo!");
		                            }
		                        });
		                        detail.clear();
		                        break;
		                    case 'cancel':
		                        break;
		                }
		            }
		        });
          }
        });
        var myMask = new Ext.LoadMask(detail, {msg:"Loading image..."});
        myMask.show();
	},
	
	editPhoto: function(image){
		this.openUploadWindow(image.id);
	},
	
	searchPhoto: function(e){
		var dv = this.getPhotoDataView();
		var store = dv.getStore();
		var proxy = store.getProxy();

        // clear start (necessary if we have paging)
        if(store.lastOptions && store.lastOptions.params) {
            store.lastOptions.params[store.paramNames.start] = 0;
        }

        var fields = ['keywords'];

        delete(proxy.extraParams[this.paramName]);

        if (store.lastOptions && store.lastOptions.params) {
            delete(proxy.lastOptions.params[this.paramName]);
        }

        if(fields.length) {
            var obj = {};
            obj['fields'] = fields;
            obj['query']  = e.getValue();
            proxy.extraParams['search'] = Ext.encode(obj);
        }

        // reload store
        store.loadPage(1);
	},
	
	clearPhotoSearch: function(e){
		e.setValue('');
		e.focus();
		this.searchPhoto(e);
	},

	/*****
    Init
    *****/
    init: function(application) {
        var me = this;
        
        me.application.on({
            downloadProductionPhoto: me.downloadPhoto,
            deleteProductionPhoto: me.deletePhoto,
            editProductionPhoto: me.editPhoto,
            scope: me
        });
        
        me.control({
            "productionphotospanel #productionphotosadd": {
                click: me.openUploadWindow
            },
            "productionphotospanel #productionphotosdataview_search":{
            	ontrigger2click: me.searchPhoto,
            	ontrigger1click: me.clearPhotoSearch,
            },
            "form filefield[name=file_full]": {
            	change: me.uploadFileChange
            },
            "#productionphotowindowtoolbar > #savebutton": {
                click: this.onPhotoSaveButtonClick
            },
            "productionphotospanel": {
            	beforeactivate: this.loadPhotoDataView
            },
            "productionphotosdataview": {
            	selectionchange: this.viewPhoto
            },
            "productionphotosdetailpanel img": {
            	click: this.downloadPhoto
            }            	
        });

    }    
    
});
