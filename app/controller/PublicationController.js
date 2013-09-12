Ext.define('JavisERP.controller.PublicationController',{
    extend: 'Ext.app.Controller',
    alias: 'controller.publicationcontroller',

    models: [
        'Publication',
        'PostalCode'
    ],
    stores: [
        'PublicationStore',
        'PostalCode'
    ],
    views: [
        'PublicationWindow',
        'PublicationGrid'
    ],

    refs: [
        {
            ref: 'postalCodeList',
            selector: 'combobox[cls=postalCodeList]'
        },
        {
            ref: 'publicationForm',
            selector: 'form[cls=publicationform]'
        },
        {
            ref: 'publicationWindow',
            selector: 'publicationwindow'
        },
        {
            ref: 'publicationGrid',
            selector: 'publicationgrid'
        },
        {
        	ref: 'moreBaselines',
        	selector: 'publicationwindow #publicationform #MoreBaselines'
        },
        {
        	ref: 'publicationBaselines',
        	selector: 'publicationwindow #publicationform #PublicationBaselines'
        }
    ],

    onPublicationActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editPublication(record);
                break;
            case 'delete_action':
                this.deletePublication(record,grid);
                break;
        }
    },

    onNewPublicationClick: function(button, e, options) {
        var publicationWindow = new JavisERP.view.PublicationWindow();
        for (i = 0; i < 3; i++){
        	this.onMoreBaselinesClick();
        }
        publicationWindow.show();
    },

    onSavePublicationClick: function(button, e, options) {
        var fields = this.getPublicationForm().getForm().getValues(false,false,false,true);
        publication = new JavisERP.model.Publication();
        for(var key in fields){
            publication.set(key,fields[key]);
        }
        var pWindow = this.getPublicationWindow();
        var pStore = this.getPublicationStoreStore();
        publication.save({
            success: function(record, operation){
            	pWindow.close();
				pStore.reload();
				Ext.Msg.alert('Success','Publication saved successfully!');
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

    onWindowClose: function(panel, eOpts){
        this.getPublicationGrid().getStore().reload();
    },

    init: function(application) {
        var me = this;
        this.control({
            "publicationgrid #publication_edit": {
            	click: this.editPublication
            },
            "publicationgrid #publication_delete": {
            	click: this.deletePublication
            },
            "publicationgrid toolbar button[cls=newpublication]": {
                click: this.onNewPublicationClick
            },
            "publicationwindow toolbar button[cls=publicationsavebutton]": {
                click: this.onSavePublicationClick
            },
            "#pubwindowtoolbar > #cancelbutton": {
                click: function(){ 
                	me.getPublicationWindow().close();
                }
            },
            "publicationwindow #publicationform #MoreBaselines": {
            	click: this.onMoreBaselinesClick
            }
        });
    },
    
    onMoreBaselinesClick: function(){
		var container = this.getPublicationBaselines();
		//console.log('more baselines');
		//console.log(container.items.length);
		if (container){
			var config = Ext.apply({}, container.initialConfig.items[0]);
			container.add(config);
		}
    },

    editPublication: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var publicationWindow = new JavisERP.view.PublicationWindow();
        var publicationForm = this.getPublicationForm();
        var me = this;
        var myMask = new Ext.LoadMask(me.getPublicationGrid(),{msg:"Loading..."});
        myMask.show();
        this.getPublicationModel().load(record.data.id,{
            success: function(model){
            	myMask.hide();
                publicationForm.loadRecord(model);
                publicationForm.getForm().findField('territory_id').setValue(new JavisERP.model.Territory(model.raw.territory));
                publicationForm.getForm().findField('contentcoord_id').setValue(new JavisERP.model.User(model.raw.contentcoord) );
                var postalcodes = publicationForm.getForm().findField('postal_codes');
                var valArray = [];
                Ext.each(model.raw.postal_codes, function(arr,index,postalcodeItself){
                    valArray.push(arr.iso_code);
                });
                postalcodes.setValue(valArray);
                if (model.data.baselines){
                	var lcv = model.data.baselines.length;
                	if (lcv < 3){ lcv = 3; }
                } else {
                	var lcv = 3;
                }
                for (i = 0; i < lcv; i++){
        			me.onMoreBaselinesClick();
        		}
        		if (model.data.baselines){
        			var pages = [];
        			var baseline = [];
        			for (i in model.data.baselines){
        				pages.push(model.data.baselines[i].pages);
        				baseline.push(model.data.baselines[i].baseline);
        			}
        		}
        		var fields = publicationForm.getForm().getFields();
        		var pgidx = 0;
        		var baseidx = 0;
        		for (i in fields.items){
        			var field = fields.items[i];
        			if (field.getName() == 'pages'){
        				if (pages[pgidx]){
        					field.setValue(pages[pgidx]);
        				}
        				pgidx++;
        			} else if (field.getName() == 'baseline'){
        				if (baseline[baseidx]){
        					field.setValue(baseline[baseidx]);
        				}
        				baseidx++;
        			}
        		}
        		publicationWindow.show();
            }
        });


    },

    deletePublication: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.show({
            title: 'Delete Publication?',
            msg: 'You are about to delete this publication.  Deleting this publication will also delete all advertisements associated with this publication.  Proceed with caution.  Would you like to proceed?',
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
                                alert("Could not delete publication!");
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