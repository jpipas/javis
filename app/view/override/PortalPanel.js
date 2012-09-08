Ext.define('JavisERP.view.override.PortalPanel', {
    requires: ['JavisERP.view.PortalPanel','JavisERP.view.PortalColumn']
}, function() {
    Ext.override(JavisERP.view.PortalPanel, {
       initComponent : function() {
            var me = this;
            
            // Implement a Container beforeLayout call from the layout to this Container
            this.layout = {
                type : 'column'
            };
            this.callParent();
            
            this.addEvents({
                validatedrop: true,
                beforedragover: true,
                dragover: true,
                beforedrop: true,
                drop: true
            });
            this.on('drop', this.doLayout, this);
        },
        beforeLayout : function() {
            var items = this.layout.getLayoutItems(),
                len = items.length,
                i = 0,
                item;
            
            for (i; i < len; i++) {
                item = items[i];
                item.columnWidth = 1 / len;
                item.removeCls(['x-portal-column-first', 'x-portal-column-last']);
            }
            items[0].addCls('x-portal-column-first');
            items[len - 1].addCls('x-portal-column-last');
            return this.callParent(arguments);   
        }
    });
});