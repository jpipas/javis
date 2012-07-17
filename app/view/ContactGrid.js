/*
 * File: app/view/ContactGrid.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('JavisERP.view.ContactGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactgrid',

    border: 0,
    preventHeader: true,
    title: 'Contact List',
    forceFit: true,
    store: 'ContactStore',
    columnLines: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
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
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email_address',
                    text: 'Email Address'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cell_phone',
                    text: 'Cell Phone'
                },
                {
                    xtype: 'gridcolumn',
                    getter: function(record) {
                        var obj = record.get('role');
                        console.log(obj);
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