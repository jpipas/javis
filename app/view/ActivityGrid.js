Ext.define('JavisERP.view.ActivityGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.activitygrid',

    title: 'Activities',
    forceFit: true,
    store: 'ActivityStore',
		itemId: 'ActivityGrid',
    forceFit: true,
    scroll: 'vertical',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'rowactions',
                    flex: 1,
                    actions: [
                        {
                        	iconIndex: 'type_cls_edit',
                            tooltip: 'Edit Activity',
                            callback: Ext.emptyFn
                        },
                        {
                        	iconIndex: 'type_cls_delete',
                            tooltip: 'Delete Activity',
                            callback: Ext.emptyFn
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'id',
                    text: 'Id'
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
                            text: 'New Task'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                        		itemId: 'newactivityphone',
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-telephone-add',
                            text: 'New Phone Call'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                        		itemId: 'newactivityevent',
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-date-add',
                            text: 'New Event'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'filtercombo',
                            itemId: 'typeFilter',
                            hideLabel: true,
                            emptyText: 'Filter Activity Type...',
                            displayField: 'description',
                            store: 'ActivityTypeStore',
                            recordField: 'id',
                            searchField: 'type_id',
                            clearable: true,
                            onClear: function(){
                            	var store = Ext.StoreMgr.lookup('ActivityStore');
                            	store.clearFilter(false);
                            },
                            onSearch: function(filtervalue, filterfield){
                            	var store = Ext.StoreMgr.lookup('ActivityStore');
                            	if (filtervalue){
	                            	store.clearFilter(true);
	                            	var myfilter = Ext.create('Ext.util.Filter', {
	                            			property: filterfield,
	                            			value: filtervalue
														    });
														    // Apply filter to store
														    store.filter(myfilter);
														  } else {
														  	store.clearFilter(false);
														  }
                            }

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