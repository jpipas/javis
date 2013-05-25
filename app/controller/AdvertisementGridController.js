Ext.define('JavisERP.controller.AdvertisementGridController', {
    extend: 'Ext.app.Controller',

    views: [
        'AdvertisementGrid',
        'AdvertisementWindow'
    ],

    models: [
        'Advertisement'
    ],

    stores: [
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
            ref: 'advertisementForm',
            selector: 'adwindow form[cls=adForm]'
        },
        {
            ref: 'advertisementToolbar',
            selector: 'adwindow toolbar'
        },
        {
            ref: 'advertisementWindow',
            selector: 'adwindow'
        },
        {
            ref: 'contractForm',
            selector: 'form[cls=contractform]'
        },
        {
            ref: 'publicationList',
            selector: 'combobox[cls=publicationlist]'
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
            case 'view_action':
                this.viewAdvertisement(record);
                break;
        }
    },

    init: function(application) {
        me = this;
        me.control({
            "advertisementgrid rowactions": {
                action: me.onAdvertisementActionClick
            }
        });

    },

    editAdvertisement: function(record){
        // not there yet!
    },

    deleteAdvertisement: function(record,grid){
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
        if(!this.getAdvertisementWindow()){
            me.adWindow = new JavisERP.view.AdvertisementWindow();
            advertisementForm = this.getAdvertisementForm();
        } else {
            me.adWindow = this.getAdvertisementWindow();
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
                me.publicationfield = advertisementForm.getForm().findField('publications');
                me.publicationfield.setValue(model.raw.publications);
                advertisementForm.getForm().findField('ad_type_id').setValue(new JavisERP.model.AdvertisementType(model.raw.ad_type));
                advertisementForm.getForm().findField('ad_size_id').setValue(new JavisERP.model.AdvertisementSize(model.raw.ad_size));
            }
        });
        me.adWindow.show();
    }

});
