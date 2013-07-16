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
                    xtype: 'rowactions',
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-user-edit',
                            tooltip: 'Edit Employee',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-user-delete',
                            tooltip: 'Delete Employee',
                            callback: Ext.emptyFn
                        }
                    ]
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
                            text: 'New Employee'
                        },
                        {
                    				xtype: 'tbspacer',
                    				flex: 1
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