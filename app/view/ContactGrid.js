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
                    xtype: 'actioncolumn',
                    maxWidth: 50,
                    defaultWidth: 50,
                    align: 'center',
                    items: [
                        {
                            icon: 'resources/icons/vcard.png',
                            tooltip: 'View'
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
                    getter: function(record) {
                        var obj = record.get('role');
                        //console.log(obj);
                        return Ext.isObject( obj )  ? obj.description : obj;
                    },
                    setter: function(record, value) {
                        var obj = record.get('obj') || {};
                        record.set('role', Ext.apply(obj,{description: value}));
                    },
                    dataIndex: 'role',
                    text: 'Role'
                }
            ]
        });

        me.callParent(arguments);
    }

});