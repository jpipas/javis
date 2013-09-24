Ext.define('JavisERP.view.ProductionPhotosDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.productionphotosdataview',
    
    /*store: 'ResourcesPhotosStore',*/
    
	singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    tpl: [
        // '<div class="details">',
            '<tpl for=".">',
                '<div class="thumb-wrap">',
                    '<div class="thumb">',
                    (!Ext.isIE6? '<img src="/thumbs/{Folder}/{Filename}" />' : 
                    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/thumbs/{folder}/{filename}\')"></div>'),
                    '</div>',
                    '<span>{name}</span>',
                '</div>',
            '</tpl>'
        // '</div>'
    ],
    
    initComponent: function() {
        
        this.callParent(arguments);
    }
});