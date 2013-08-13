Ext.define('JavisERP.view.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',

    minHeight: 250,
    //width: 400,
    title: 'List: Independent Contractors',
    store: 'User',
    itemId: 'UserGrid',
    forceFit: true,
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
	                tooltip: 'Edit Employee',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-user-edit',
	                itemId: 'user_edit',
                    resourceId: 'user_edit',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Employee',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-user-delete',
	                itemId: 'user_delete',
                    resourceId: 'user_delete',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'Id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'username',
                    flex: 1,
                    text: 'Username'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email',
                    flex: 3,
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'first_name',
                    flex: 2,
                    text: 'First Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'last_name',
                    flex: 2,
                    text: 'Last Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'roles',
                    flex: 1,
                    text: 'Roles'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'manager_name',
                    flex: 1,
                    text: 'Manager'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 1,
                    text: 'Territory'
                },
                {
                    xtype: 'datecolumn',
                    format: 'm/d/Y g:ia',
                    dataIndex: 'created_at',
                    flex: 2,
                    text: 'Date Created'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'newuser',
                            iconCls: 'ui-silk ui-silk-user-add',
                            text: 'New Employee',
		                    resourceId: 'user_create',
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
		                    checkIndexes: ['first_name','last_name'],
            				items: ['->']
		                }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'userPageToolBar',
                    displayInfo: true,
                    store: 'User'
                }
            ]
        });

        me.callParent(arguments);
    }

});