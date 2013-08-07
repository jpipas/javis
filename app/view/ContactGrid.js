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
                            text: 'New Contact',
		                    resourceId: 'contact_create',
		                    resourceType: 'disable',
		                    plugins: ['permission']
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
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Edit Contact',
	                align: 'center',
	                iconCls: 'edit_action ui-silk ui-silk-vcard-edit',
	                itemId: 'contact_edit',
                    resourceId: 'contact_edit',
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Contact',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-vcard-delete',
	                itemId: 'contact_delete',
                    resourceId: 'contact_delete',
                    resourceType: 'hide',
                    plugins: ['permission']
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