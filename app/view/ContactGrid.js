Ext.define('JavisERP.view.ContactGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactgrid',

    title: 'Contact List',
    forceFit: true,
    store: 'ContactStore',
    itemId: 'contactgrid',
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
                            cls: 'newcontact',
                            itemId: 'newcontact',
                            iconCls: 'ui-silk ui-silk-vcard-add',
                            text: 'New Contact'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'contactPageToolBar',
                    displayInfo: true,
                    store: 'ContactStore'
                }
            ],
            columns: [
                {
                    xtype: 'rowactions',
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-vcard-edit',
                            tooltip: 'View/Edit Contact',
                            hideIndex: 'edit_action',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-vcard-delete',
                            tooltip: 'Delete Contact',
                            hideIndex: 'delete_action',
                            callback: Ext.emptyFn
                        }
                    ]
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'full_name',
                    text: 'Name'
                },
                {
                	flex: 2,
                    xtype: 'gridcolumn',
                    dataIndex: 'email_address',
                    text: 'Email Address'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'phone',
                    text: 'Phone'
                },
                {
                	flex: 1,
                    xtype: 'gridcolumn',
                    dataIndex: 'role_name',
                    text: 'Role'
                }
            ]
        });

        me.callParent(arguments);
    }

});