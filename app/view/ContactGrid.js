Ext.define('JavisERP.view.ContactGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactgrid',

    title: 'Contact List',
    forceFit: true,
    store: 'ContactStore',
    columnLines: false,
    scroll: 'vertical',
    autoScroll: true,
    height:350,
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
                }
            ],
            columns: [
                {
                    xtype: 'rowactions',
                    maxWidth: 80,
                    defaultWidth: 80,
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-vcard-edit',
                            tooltip: 'View/Edit Contact',
                            hideIndex: 'revoke_edit',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-vcard-delete',
                            tooltip: 'Delete Contact',
                            hideIndex: 'revoke_delete',
                            callback: Ext.emptyFn
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'id',
                    hideable: false,
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'full_name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email_address',
                    text: 'Email Address'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'phone',
                    text: 'Phone'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'role_name',
                    text: 'Role'
                }
            ]
        });

        me.callParent(arguments);
    }

});