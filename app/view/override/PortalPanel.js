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
        } 
    });
});