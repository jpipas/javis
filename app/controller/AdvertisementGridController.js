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
            selector: '#clientadgrid'
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

        //this.getAdvertisementGrid().getStore().clearFilter(true);
        //this.getAdvertisementGrid().getStore().filter("contract_id",record.data.id);
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
        this.getAdvertisementToolbar().child('button[cls=savebutton]').hide();
        var advertisementForm = this.getAdvertisementForm();
        this.getAdvertisementModel().load(record.data.id,{
            success: function(model){
                advertisementForm.loadRecord(model);
            }
        });
        var myMask = new Ext.LoadMask(this.getAdvertisementGrid(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            me.adWindow.show();
        },500);
    }

});
