Ext.define('JavisERP.controller.TerritoryController', {
    extend: 'Ext.app.Controller',

    views: [
        'TerritoryGrid',
        'TerritoryWindow'
    ],

    models: [
        'Territory'
    ],

    stores: [
        'TerritoryStore',
        'User',
        'State'
    ],

    refs: [
        {
            ref: 'territoryForm',
            selector: 'form[cls=territoryform]'
        },
        {
            ref: 'territoryWindow',
            selector: 'window[cls=territoryWindow]'
        }
    ],

    onNewTerritoryClick: function(button, options, e) {
        me.terWindow = new JavisERP.view.TerritoryWindow();
        me.terWindow.show();
    },

    onTerritorySaveButtonClick: function(button, options, e){
        var fields = this.getTerritoryForm().getForm().getValues(false,false,false,true);
        me.ter = new JavisERP.model.Territory();
        for(var key in fields){
            //console.log(key+":"+fields[key]);
            me.ter.set(key,fields[key]);
        }
        var tWindow = this.getTerritoryWindow();
        var tStore = this.getTerritoryStoreStore();
        me.ter.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    tWindow.close();
                    tStore.reload();
                    Ext.Msg.alert('Success','Territory saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    init: function(application) {
        me = this;
        me.control({
            "territorygrid toolbar button[itemId=newterritory]": {
                click: me.onNewTerritoryClick
            },
            "button[cls=saveTerritoryButton]": {
                click: this.onTerritorySaveButtonClick
            }
        });
    }


});
