Ext.define('JavisERP.view.override.PortletPanel', {
    override: 'JavisERP.view.PortletPanel',
        initComponent: function() {
        
        Ext.apply(this, {

            items: [{
                id: 'col-1',
                items: [{
                    id: 'portlet-1',
                    title: 'Client Portlet',
                    tools: this.getTools(),
                    items: Ext.create('JavisERP.view.ClientPortlet')
                },{
                    id: 'portlet-2',
                    title: 'Portlet 2',
                    tools: this.getTools(),
                    html: JavisERP.util.Constants.shortBogusMarkup
                }]
            },{
                id: 'col-2',
                items: [{
                    id: 'portlet-3',
                    title: 'Portlet 3',
                    tools: this.getTools(),
                    html: JavisERP.util.Constants.bogusMarkup
                }]
            }]
            
        });
            
       this.callParent(arguments);
   }
    
});