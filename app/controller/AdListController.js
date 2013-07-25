Ext.define('JavisERP.controller.AdListController', {
    extend: 'Ext.app.Controller',

    views: [
        'AdListGrid'
    ],

    models: [
        'AdList'
    ],
    
    stores: [
        'AdList'
    ],

    refs: [
        {
            ref: 'adListGrid',
            selector: 'adlistgrid'
        },
        {
            ref: 'territoryBox',
            selector: 'adlistgrid toolbar combobox[itemId=territory]'
        },
        {
            ref: 'publicationBox',
            selector: 'adlistgrid toolbar combobox[itemId=publication]'
        },
        {
            ref: 'durationBox',
            selector: 'adlistgrid toolbar combobox[itemId=duration]'
        }
    ],

    onGenerateAdListClick: function(button, e){
        var grid = this.getAdListGrid();
        if (this.getTerritoryBox().getValue() && this.getPublicationBox().getValue() && this.getDurationBox().getValue()){
        	grid.getStore().clearFilter(true);
        	grid.getStore().filter([{id:'territory',property:'c.territory_id', value: parseInt(this.getTerritoryBox().getValue(),10)},{id:'publication',property:'p.id',value:parseInt(this.getPublicationBox().getValue(),10)},{id:'duration',property:'d.id', value: parseInt(this.getDurationBox().getValue(),10)}]);
        } else {
        	grid.getStore().clearFilter(false);
        }
        //grid.getStore().filter('c.territory_id', parseInt(this.getTerritoryBox().getValue(),10));
        //grid.getStore().filter('p.id', parseInt(this.getPublicationBox().getValue(),10));
        //grid.getStore().filter('d.id', parseInt(this.getDurationBox().getValue(),10));
        //grid.getStore().filters.add('territory',new Ext.util.Filter({property:'c.territory_id', value: parseInt(this.getTerritoryBox().getValue(),10)}));
        //grid.getStore().filters.add('publication',new Ext.util.Filter({property:'p.id',value:parseInt(this.getPublicationBox().getValue(),10)}));
        //grid.getStore().filters.add('duration',new Ext.util.Filter({property:'d.id', value: parseInt(this.getDurationBox().getValue(),10)}));
        //grid.getStore().reload();
        //console.log(grid.getStore());
    },

    init: function(application) {
        var me = this;
        me.control({
            "adlistgrid toolbar button[itemId=generate_ad_list]": {
                click: me.onGenerateAdListClick
            }
        });

    }
});
