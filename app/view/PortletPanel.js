Ext.define('JavisERP.view.PortletPanel', {
    extend: 'JavisERP.view.PortalPanel',

    alias: 'widget.portletpanel',

    uses: ['JavisERP.util.Constants'],
    itemId:'Dashboard',
	border: 0,
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },

    initComponent: function() {

        Ext.apply(this, {

            items: [{
                id: 'col-1',
                items: [{
                    id: 'portlet-3',
                    title: 'Welcome to Best Version Media\'s Backoffice',
                    tools: this.getTools(),
					minHeight: 150,
                    overflow:false,
                    autoScroll: true,
                    html: JavisERP.util.Constants.bogusMarkup
                }]
            },{
                id: 'col-2',
                items: [{
                    id: 'portlet-1',
                    title: 'Client Portlet',
                    tools: this.getTools(),
                    items: Ext.create('JavisERP.view.ClientPortlet'),
                    resourceId: 'client_view',
                    resourceType: 'hide',
                    plugins: ['permission']
                    
                }
                /*,{
                    id: 'portlet-2',
                    title: 'Activities Portlet',
                    tools: this.getTools(),
                    items: Ext.create('JavisERP.view.ActivityPortlet'),
                    resourceId: 'activity_view',
                    resourceType: 'hide',
                    plugins: ['permission']
                }*/
                ]
            }]

        });

        this.callParent(arguments);
    }
});
