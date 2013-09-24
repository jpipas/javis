Ext.define('JavisERP.view.ProductionPhotosDetailPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.productionphotosdetailpanel',
    itemId : 'productionphotosdetailpanel',

    width: 200,
    minWidth: 200,

    tpl: [
        '<div class="details">',
            '<tpl for=".">',
                    (!Ext.isIE6? '<img src="/thumbs/{folder}/{filename}" />' : 
                    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/thumbs/{folder}/{filename}\')"></div>'),
                '<div class="details-info">',
                    '<b>Testing:</b>',
                '</div>',
            '</tpl>',
        '</div>'
    ],

    /**
     * Loads a given image record into the panel. Animates the newly-updated panel in from the left over 250ms.
     */
    loadRecord: function(image) {
        this.body.hide();
        this.tpl.overwrite(this.body, image.data);
        this.body.slideIn('l', {
            duration: 250
        });
    },
    
    clear: function(){
        this.body.update('');
    }
});