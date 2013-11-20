Ext.define('JavisERP.view.ProductionPhotosDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.productionphotosdataview',
    
    itemId: 'productionphotosdataview',
    store: 'ProductionStore',
    
	singleSelect: true,
	trackOver: true,
	id: 'images-view',
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    emptyText: 'No matches found.',
    tpl: [
        '<tpl for=".">',
            '<div class="thumb-wrap">',
                '<div class="thumb"><img src="/thumb/{id}?w=80&h=60" /></div>',
                '<span>{title}</span>',
            '</div>',
        '</tpl>'
    ],
    
    initComponent: function() {
    	var me = this;

        me.callParent(arguments);
    }
});