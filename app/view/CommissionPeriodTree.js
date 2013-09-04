Ext.define('JavisERP.view.CommissionPeriodTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.commissionperiodtree',

    title: 'Commission Periods',
    forceFit: true,
    store: 'CommissionPeriodStore',
	itemId: 'CommissionPeriodTree',
	xtype: 'commissionperiodtree',
    scroll: 'vertical',
    border: 1,
    rootVisible: false,
    useArrows: true,
    rowLines: true,
    singleExpand: true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(this, {
        	viewConfig: {

            },
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Period',
                flex: 2,
                dataIndex: 'text'
            },
            {
            	xtype: 'gridcolumn',
            	text: '#',
            	dataIndex: 'payments',
            	align : 'center',
            	width: 45
            },
            {
                text: 'Run',
                width: 45,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Run Commissions',
                align: 'center',
                iconCls: 'ui-silk ui-silk-database-refresh',
                itemId: 'period_run',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    this.fireEvent('itemclick', grid, rowIndex, colIndex, actionItem, event, record, row);
                },
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return (record.data.locked_at?true:!record.data.leaf);
                }
            },
            {
                text: 'Reset',
                width: 45,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Reset Commission Period',
                align: 'center',
                iconCls: 'ui-silk ui-silk-database-error',
                itemId: 'period_reset',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    this.fireEvent('itemclick', grid, rowIndex, colIndex, actionItem, event, record, row);
                },
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return (record.data.locked_at?true:!record.data.leaf);
                }
            },
            {
                text: 'Locked',
                width: 45,
                xtype: 'actioncolumn',
                tooltip: 'Lock Period',
                align: 'center',
                iconCls: 'ui-silk ui-silk-lock',
                itemId: 'period_lock',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    this.fireEvent('itemclick', grid, rowIndex, colIndex, actionItem, event, record, row);
                },
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return (record.data.locked_at?true:!record.data.leaf);
                }
            },
            {
                text: 'Edit',
                width: 45,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit Period',
                align: 'center',
                iconCls: 'ui-silk ui-silk-pencil',
                itemId: 'period_edit',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    this.fireEvent('itemclick', grid, rowIndex, colIndex, actionItem, event, record, row);
                },
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return (record.data.locked_at?true:!record.data.leaf);
                }
            }]
        });
        //console.log(this.getStore().load());
        me.callParent(arguments);
    }
});