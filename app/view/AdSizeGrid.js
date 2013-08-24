Ext.define('JavisERP.view.AdSizeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adsizegrid',

    title: 'Ad Sizes',
    forceFit: true,
    store: {type: 'adsizestore'},
    itemId: 'adsizegrid',
    scroll: 'vertical',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'newadsize',
                            iconCls: 'ui-silk ui-silk-add',
                            text: 'New Size',
		                    resourceId: 'advertisement_typesize',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        }
                    ]
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Size',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-pencil',
	                itemId: 'adsize_edit',
                    resourceId: 'advertisement_typesize',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Size',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-delete',
	                itemId: 'adsize_delete',
                    resourceId: 'advertisement_typesize',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
	            {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'ID'
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description'
                }
            ]
        });

        me.callParent(arguments);
    }

});