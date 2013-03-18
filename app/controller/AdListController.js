Ext.define('JavisERP.controller.AdListController', {
    extend: 'Ext.app.Controller',

    views: [
        'AdListGrid'
    ],

    models: [
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
        //deactivate autoreloading
        grid.filters.autoReload = false;
        //initiate the filters
        grid.filters.createFilters() ;
        //clear previous filters
        grid.filters.clearFilters();
        //Activate any number of filters
        grid.filters.getFilter('cl.territory_id').setActive(true) ;
        grid.filters.getFilter('cl.territory_id').setValue(parseInt(this.getTerritoryBox().getValue(),10));
        grid.filters.getFilter('p.id').setActive(true) ;
        grid.filters.getFilter('p.id').setValue(parseInt(this.getPublicationBox().getValue(),10));
        grid.filters.getFilter('d.id').setActive(true) ;
        grid.filters.getFilter('d.id').setValue(parseInt(this.getDurationBox().getValue(),10));
        //activate realod so as the internal filtering goes back on working
        grid.filters.autoReload = true;
        //reaload grid
        grid.filters.reload();
    },

    init: function(application) {
        me = this;
        me.control({
            "adlistgrid toolbar button[itemId=generate_ad_list]": {
                click: me.onGenerateAdListClick
            }
        });

    }

});
