Ext.define('JavisERP.view.ActivityGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.activitygrid',

    title: 'Activities',
    forceFit: true,
    store: 'ActivityStore',
		itemId: 'ActivityGrid',
    scroll: 'vertical',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Activity',
	                align: 'center',
	                getClass: function(v,meta,r){ return r.data.type_cls_edit; },
	                itemId: 'activity_edit',
                    resourceId: 'activity_edit',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Activity',
	                align: 'center',
	                getClass: function(v,meta,r){ return r.data.type_cls_delete; },
	                itemId: 'activity_delete',
                    resourceId: 'activity_delete',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    dataIndex: 'title',
                    text: 'Title'
                },
                {
                    xtype: 'datecolumn',
                    flex: 1,
                    format: 'm/d/Y',
                    dataIndex: 'post_date',
                    text: 'Date'
                },
                {
                    xtype: 'datecolumn',
                    flex: 1,
                    format: 'g:ia',
                    emptyCellText: 'All Day',
                    dataIndex: 'post_time',
                    text: 'Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'owner_name',
                    text: 'Owner'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'status_id',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    dataIndex: 'client_name',
                    text: 'Client'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'assigned_to_name',
                    text: 'Assigned To'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                        	itemId: 'newactivitytask',
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-clock-add',
                            text: 'New Task',
                            resourceId: 'activity_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                            
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                        	itemId: 'newactivityphone',
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-telephone-add',
                            text: 'New Phone Call',
                            resourceId: 'activity_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                        	itemId: 'newactivityevent',
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-date-add',
                            text: 'New Event',
                            resourceId: 'activity_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'filtercombo',
                            itemId: 'activtyTypeFilter',
                            hideLabel: true,
                            emptyText: 'Filter Activity Type...',
                            displayField: 'description',
                            store: {type: 'activitytypestore'},
                            recordField: 'id',
                            searchField: 'type_id',
                            clearable: true
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'activityPageToolBar',
                    displayInfo: true,
                    store: 'ActivityStore'
                }
            ]
        });

        me.callParent(arguments);
    }

});