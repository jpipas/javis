Ext.define('JavisERP.view.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',

    height: 250,
    width: 400,
    title: 'List: Employees',
    store: 'User',
    itemId: 'UserGrid',
    forceFit: false,
    scroll: 'vertical',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'Id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email',
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'username',
                    text: 'Username'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'password',
                    text: 'Password'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'first_name',
                    text: 'First_name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'last_name',
                    text: 'Last_name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'roles',
                    text: 'Roles'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'manager_user_id',
                    text: 'Manager_user_id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_id',
                    text: 'Territory_id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'created_at',
                    text: 'Created_at'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'deleted_at',
                    text: 'Deleted_at'
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