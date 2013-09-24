Ext.define('JavisERP.view.CommissionStatementPanel', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.commissionstatementpanel',
    
    layout: 'border',
    
    bodyBorder: false,
    border: 0,
    
    defaults: {
		collapsible: false,
		split: true
	},
	items: [{
	    xtype: 'commissionperiodtree',
	    region:'west',
	    margins: '0',
	    width: 500,
	    collapsible: true,
	    minWidth: 300,
	    maxWidth: 500,
	    dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                itemId: 'commissionperiodtoolbar',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'commissionperiod_add',
                        iconCls: 'ui-silk ui-silk-add',
                        text: 'Add Period'
                    },
                    {
        				xtype: 'tbspacer',
        				flex: 1
            		},
            		{
                        xtype: 'button',
                        itemId: 'commissionperiod_refresh',
                        iconCls: 'ui-silk ui-silk-arrow-refresh',
                        tooltip: 'Refresh Periods'
                    }
                ]
            }
        ],
	},{
		xtype: 'panel',
	    region:'center',
	    layout: 'border',
	    split: true,
	    border: 0,
	    items: [{
	    	xtype: 'commissionstatementgrid',
		    region:'center'
	    },
	    {
	    	xtype: 'commissionentrygrid',
	    	region: 'south',
	    	minHeight: 200,
	    	maxHeight: 500,
	    	collapsible: true,
	    	collapsed: true,
	    	expandable: true
	    }]
	}]
});