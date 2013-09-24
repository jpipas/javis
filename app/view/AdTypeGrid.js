Ext.define('JavisERP.view.AdTypeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adtypegrid',

    title: 'Ad Types',
    forceFit: true,
    store: {type: 'adtypestore'},
    itemId: 'adtypegrid',
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
                            itemId: 'newadtype',
                            iconCls: 'ui-silk ui-silk-add',
                            text: 'New Type',
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
	                tooltip: 'Edit Type',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-pencil',
	                itemId: 'adtype_edit',
                    resourceId: 'advertisement_typesize',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Type',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-delete',
	                itemId: 'adtype_delete',
                    resourceId: 'advertisement_typesize',
                    hidden: true,
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
                },
                {
                	flex: 3,
                    xtype: 'gridcolumn',
                    dataIndex: 'ad_sizes',
                    text: 'Sizes'
                }
            ]
        });

        me.callParent(arguments);
    }

});