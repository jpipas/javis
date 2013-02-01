Ext.define('JavisERP.view.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',

    height: 250,
    width: 400,
    title: 'List: Employees',
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
                    flex: 1,
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
                    text: 'Username'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email',
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'first_name',
                    text: 'First Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'last_name',
                    text: 'Last Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'roles',
                    text: 'Roles'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'manager_user_id',
                    text: 'Manager'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory',
                    text: 'Territory'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'created_at',
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