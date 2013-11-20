Ext.define('JavisERP.view.AdvertisementGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.advertisementgrid',

	title: 'Advertisements',
    forceFit: true,
    store: 'AdvertisementStore',
	itemId: 'AdvertisementGrid',
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
                            iconCls: 'ui-silk ui-silk-layout-add',
                            text: 'New Advertisement',
                            cls:'newAdvertisementButton',
                            itemId: 'newadvertisement',
                            hidden: true,
		                    resourceId: 'advertisement_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        },
                        {
		                    xtype: 'gridsearchingbar',
		                    inputWidth: 200,
		                    grid: this,
		                    border: 0,
		                    showSelectAll: true,
		                    menuIconCls: 'ui-silk ui-silk-magnifier',
		                    disableIndexes: ['id'],
		                    items: ['->']
		                }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'advertisementPageToolBar',
                    displayInfo: true,
                    store: 'AdvertisementStore'
                }
            ],
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Advertisement',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-layout-edit',
	                itemId: 'advertisement_edit',
                    resourceId: 'advertisement_edit',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Advertisement',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-layout-delete',
	                itemId: 'advertisement_delete',
                    resourceId: 'advertisement_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
            		xtype: 'gridcolumn',
            		dataIndex: 'client_company_name',
            		text: 'Client',
            		flex: 2
                },
                {
            		xtype: 'gridcolumn',
            		dataIndex: 'publication_names',
            		text: 'Publication(s)',
            		flex: 3
                },
                {
            		xtype: 'gridcolumn',
            		dataIndex: 'contracts',
            		text: 'Contract(s)',
            		flex: 2
                },
                {
            		xtype: 'gridcolumn',
            		dataIndex: 'designer_name',
            		text: 'Designer',
            		flex: 2
                },
                {
            		xtype: 'gridcolumn',
            		dataIndex: 'salesrep_name',
            		text: 'Sales Rep',
            		flex: 2
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ad_type_description',
                    text: 'Ad Type',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ad_size_description',
                    text: 'Ad Size',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'created_at',
                    text: 'Created On',
					format: 'm/d/Y g:ia',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }
});