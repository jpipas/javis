Ext.define('JavisERP.controller.AdvertisementController', {
    extend: 'Ext.app.Controller',
    
    client: {
			id: '',
			name: ''
		},

    views: [
        'AdvertisementGrid',
        'AdvertisementWindow'
    ],

    models: [
        'Advertisement'
    ],

    stores: [
    	'AdvertisementStore',
        'PublicationStore',
        'AdTypeStore',
        'AdSizeStore'
    ],

    refs: [
        {
            ref: 'advertisementGrid',
            selector: 'advertisementgrid'
        },
        {
            ref: 'adForm',
            selector: 'adwindow form[cls=adForm]'
        },
        {
            ref: 'advertisementToolbar',
            selector: 'adwindow toolbar'
        },
        {
            ref: 'adWindow',
            selector: '#adwindow'
        },
        {
            ref: 'adTypeCombo',
            selector: 'combobox[cls=adType]',
            xtype: 'combobox'
        },
        {
            ref: 'adSizeCombo',
            selector: 'combobox[cls=adSize]',
            xtype: 'combobox'
        },
        {
            ref: 'publicationList',
            selector: 'combobox[cls=publicationlist]'
        },
        {
            ref: 'contractForm',
            selector: 'form[cls=contractform]'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
            ref: 'clientForm',
            selector: 'form[cls=clientform]'
        }
    ],
    onAdvertisementActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editAdvertisement(record);
                break;
            case 'delete_action':
                this.deleteAdvertisement(record,grid);
                break;
        }
    },
    
    onNewAdvertisementClick: function(act_type) {
        var advertisementWindow = new JavisERP.view.AdvertisementWindow();
        advertisementWindow.show();
        var adForm = this.getAdForm().getForm();
        if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
        	adForm.findField('client_id').setValue(new JavisERP.model.Client({ id: this.getClientId(), company_name: this.getClientName() })).setReadOnly(true);
        }
    },
    
    onAdvertisementSaveButtonClick: function(button, options, e){
    		var fields = this.getAdForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var ad = new JavisERP.model.Advertisement();
        for(var key in fields){
            ad.set(key,fields[key]);
        }

        var publications = [];
        var recs = this.getPublicationList().getValue();
        for(var key1 in recs){
            var publication = new JavisERP.model.Publication();
            publication.set("id",recs[key1]);
            publications.push(publication);
        }

        ad.setAssociatedData("publications",publications);
        ad.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));
        var aWindow = this.getAdWindow();
        var aGrid = this.getAdvertisementGrid();
        var cc = this.getContentCards();
        var me = this;
        //console.log(me.contract);
        ad.save({
        		success: function(record, operation){
                aGrid.getStore().reload();
               	//aGrid.getStore().clearFilter(true);
                //console.log(record);
                // if looking at a client, filter grid by the client
                if (cc.getLayout().getActiveItem().getXType() == 'clientrecord'){
                	aGrid.getStore().clearFilter(true);
                	aGrid.getStore().filter("client_id", me.getClientId());
                } else {
                	aGrid.getStore().clearFilter();
                }
                // if adding/editing a contract ....
                //aGrid.getStore().filter("contract_id",record.data.contract_id);
                aWindow.close();
                Ext.Msg.alert('Success','Advertisement saved successfully!');
                me.application.fireEvent("onAdvertisementSaved",record.data);
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
    
    onAdTypeChange: function(field, newValue, oldValue, options) {
        this.getAdSizeCombo().clearValue();
        this.getAdSizeCombo().getStore().clearFilter(true);
        this.getAdSizeCombo().getStore().filter("type_id",field.getValue());
    },

    init: function(application) {
        var me = this;
        me.application.on({
            setClientFields: me.setClientFields,
            scope: me
        });

        this.client.id = null;
        this.client.name = null;
        me.control({
            "advertisementgrid #advertisement_edit": {
                click: me.editAdvertisement
            },
            "advertisementgrid #advertisement_delete": {
                click: me.deleteAdvertisement
            },
            "advertisementgrid toolbar button[itemId=newadvertisement]": {
                click: function(button, options, e){
            		this.onNewAdvertisementClick();
            	}
            },
            "#adwindowtoolbar > #savebutton": {
                click: this.onAdvertisementSaveButtonClick
            },
            "#adwindowtoolbar > #cancelbutton": {
                click: function(){
            		me.getAdWindow.close();
            		//Ext.WindowMgr.getActive().close();
            	}
            },
            "combobox[cls=adType]": {
                change: this.onAdTypeChange
            }
        });

    },
    
    setClientFields: function(clientId, clientName) {
        this.client.id = clientId;
        this.client.name = clientName;
    },

    getClientId: function() {
        return this.getClientForm().getForm().findField('id').getValue();
    },

    getClientName: function() {
        return this.getClientForm().getForm().findField('company_name').getValue();
    },

    editAdvertisement: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var adWindow = new JavisERP.view.AdvertisementWindow();
        var adForm = this.getAdForm();
        var cc = this.getContentCards();
        this.getAdvertisementModel().load(record.data.id, {
            success: function(record,operation){
                adForm.getForm().loadRecord(record);
                var pubs = [];
                for (i in record.data.publications){
                	pubs.push(new JavisERP.model.Publication(record.data.publications[i]));
                }
                adForm.getForm().findField('publications').setValue(pubs);
                adForm.getForm().findField('client_id').setValue(new JavisERP.model.Client(record.data.client));
                adForm.getForm().findField('designer_id').setValue(new JavisERP.model.User(record.data.designer));
                adForm.getForm().findField('salesrep_id').setValue(new JavisERP.model.User(record.data.salesrep));
                adForm.getForm().findField('ad_type_id').setValue(new JavisERP.model.AdvertisementType(record.data.ad_type));
                adForm.getForm().findField('ad_size_id').setValue(new JavisERP.model.AdvertisementSize(record.data.ad_size));
                if (cc.getLayout().getActiveItem().getXType() == 'clientrecord'){
				        	adForm.getForm().findField('client_id').setReadOnly(true);
				        }
            }
        });
        var myMask = new Ext.LoadMask(this.getAdWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            adWindow.show();
        },500);
    },

    deleteAdvertisement: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.show({
            title: 'Delete Advertisement?',
            msg: 'You are about to delete this advertisement.  It will be removed from all contracts that use it.  Would you like to proceed?',
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
                                alert("Could not delete advertisement!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    },
    viewAdvertisement: function(record){
        var advertisementForm = null;
        if(!this.getAdWindow()){
            var adWindow = new JavisERP.view.AdvertisementWindow();
            advertisementForm = this.getAdForm();
        } else {
            var adWindow = this.getAdWindow();
            advertisementForm = me.adWindow.getComponent('adform');
        }

        // this is view mode - remove the save button!
        this.getAdvertisementToolbar().child('button[cls=savebutton]').hide();
        this.getPublicationStoreStore().clearFilter(true);
        this.getPublicationStoreStore().filter("territory_id",this.getContractForm().getForm().findField('territory_id').getValue());
        this.getAdTypeStoreStore().load();
        this.getAdSizeStoreStore().load();
        this.getAdvertisementModel().load(record.data.id,{
            success: function(model){
                advertisementForm.loadRecord(model);
                var publicationfield = advertisementForm.getForm().findField('publications');
                publicationfield.setValue(model.raw.publications);
                advertisementForm.getForm().findField('ad_type_id').setValue(new JavisERP.model.AdvertisementType(model.raw.ad_type));
                advertisementForm.getForm().findField('ad_size_id').setValue(new JavisERP.model.AdvertisementSize(model.raw.ad_size));
            }
        });
        adWindow.show();
    }

});
