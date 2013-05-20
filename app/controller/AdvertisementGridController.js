Ext.define('JavisERP.controller.AdvertisementGridController', {
    extend: 'Ext.app.Controller',

    views: [
        'AdvertisementGrid',
        'AdvertisementWindow'
    ],

    models: [
        'Advertisement'
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
        me.adWindow = new JavisERP.view.AdvertisementWindow();
        // this is view mode - remove the save button!
        this.getAdvertisementToolbar().child('button[cls=savebutton]').hide();
        var advertisementForm = this.getAdvertisementForm();
        var adGrid = this.getAdvertisementGrid();
        this.getAdvertisementModel().load(record.data.id,{
            success: function(model){
                advertisementForm.loadRecord(model);
                me.publicationfield = advertisementForm.getForm().findField('publicationlist');
                console.log(model.raw);
                me.publicationfield.setValue(model.raw.publication);
            }
        });
        me.adWindow.show();
    }

});
