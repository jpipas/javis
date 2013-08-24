Ext.define('JavisERP.controller.AdSizeTypeController', {
    extend: 'Ext.app.Controller',

    views: [
        'AdvertisementSizeType',
        'AdTypeWindow',
        'AdSizeWindow'
    ],

    models: [
        'AdvertisementSize',
        'AdvertisementType'
    ],

    stores: [
        'AdTypeStore',
        'AdSizeStore'
    ],

    refs: [
        {
            ref: 'adTypeGrid',
            selector: 'adtypegrid'
        },
        {
            ref: 'adSizeGrid',
            selector: 'adsizegrid'
        },
        {
            ref: 'adTypeForm',
            selector: 'adtypewindow form[cls=adTypeForm]'
        },
        {
            ref: 'adSizeForm',
            selector: 'adsizewindow form[cls=adSizeForm]'
        },
        {
            ref: 'adTypeWindow',
            selector: '#adtypewindow'
        },
        {
            ref: 'adSizeWindow',
            selector: '#adsizewindow'
        }
    ],
    
    onNewAdTypeClick: function(act_type) {
        var win = new JavisERP.view.AdTypeWindow();
        win.show();
    },
    
    onNewAdSizeClick: function(act_type) {
        var win = new JavisERP.view.AdSizeWindow();
        win.show();
    },
    
    onAdTypeSaveButtonClick: function(button, options, e){
    	var fields = this.getAdTypeForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var ad = new JavisERP.model.AdvertisementType();
        for(var key in fields){
            ad.set(key,fields[key]);
        }

        var sizes = [];
        var recs = this.getAdTypeForm().getForm().findField('ad_size').getValue();
        for(var key1 in recs){
            var ad_size = new JavisERP.model.AdvertisementSize();
            ad_size.set("id",recs[key1]);
            sizes.push(ad_size);
        }

        ad.setAssociatedData("ad_size",sizes);
        ad.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));
        var win = this.getAdTypeWindow();
        var grid = this.getAdTypeGrid();
        var me = this;
        //console.log(me.contract);
        ad.save({
        	success: function(record, operation){
                grid.getStore().reload();
                win.close();
                Ext.Msg.alert('Success','Ad Type saved successfully!');
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

	onAdSizeSaveButtonClick: function(button, options, e){
    	var fields = this.getAdSizeForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var ad = new JavisERP.model.AdvertisementSize();
        for(var key in fields){
            ad.set(key,fields[key]);
        }

        var win = this.getAdSizeWindow();
        var grid = this.getAdSizeGrid();
        var me = this;
        //console.log(me.contract);
        ad.save({
        	success: function(record, operation){
                grid.getStore().reload();
                win.close();
                Ext.Msg.alert('Success','Ad Size saved successfully!');
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
            "adtypegrid #adtype_edit": {
                click: me.editAdType
            },
            "adtypegrid #adtype_delete": {
                click: me.deleteAdType
            },
            "adtypegrid toolbar button[itemId=newadtype]": {
                click: this.onNewAdTypeClick
            },
            "#adtypewindowtoolbar > #savebutton": {
                click: this.onAdTypeSaveButtonClick
            },
            "adsizegrid #adsize_edit": {
                click: me.editAdSize
            },
            "adsizegrid #adsize_delete": {
                click: me.deleteAdSize
            },
            "adsizegrid toolbar button[itemId=newadsize]": {
                click: me.onNewAdSizeClick
            },
            "#adsizewindowtoolbar > #savebutton": {
                click: this.onAdSizeSaveButtonClick
            }
        });

    },
    
    editAdType: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = new JavisERP.view.AdTypeWindow();
        var frm = this.getAdTypeForm();
        this.getAdvertisementTypeModel().load(record.data.id, {
            success: function(record,operation){
                frm.getForm().loadRecord(record);
                var sizes = [];
                for (i in record.data.ad_size){
                	sizes.push(new JavisERP.model.AdvertisementSize(record.data.ad_size[i]));
                }
                frm.getForm().findField('ad_size').setValue(sizes);
            }
        });
        var myMask = new Ext.LoadMask(this.getAdTypeWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            win.show();
        },500);
    },

    deleteAdType: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.show({
            title: 'Delete Ad Type?',
            msg: 'You are about to delete this ad type. ALL ads that use this type will be affected!!!  Would you like to proceed?',
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
                                alert("Could not delete ad type!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    },
    
    editAdSize: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = new JavisERP.view.AdSizeWindow();
        var frm = this.getAdSizeForm();
        this.getAdvertisementSizeModel().load(record.data.id, {
            success: function(record,operation){
                frm.getForm().loadRecord(record);
            }
        });
        var myMask = new Ext.LoadMask(this.getAdSizeWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            win.show();
        },500);
    },

    deleteAdSize: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.show({
            title: 'Delete Ad Size?',
            msg: 'You are about to delete this ad size. ALL ads that use this size will be affected!!!  Would you like to proceed?',
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
                                alert("Could not delete ad size!");
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
