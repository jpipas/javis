/*
 * File: app/view/PublicationGrid.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('JavisERP.view.PublicationGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.publicationgrid',

    width: 815,
    title: 'Publication List',
    columnLines: false,
    forceFit: true,
    store: 'PublicationStore',
    //features: [Ext.create('Ext.grid.feature.Grouping')],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-newspaper-add',
                            cls: 'newpublication',
                            text: 'New Publication'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    hidden: false,
                    itemId: 'pubToolbar',
                    width: 360,
                    displayInfo: true,
                    emptyMsg: 'No publications to display',
                    store: 'PublicationStore'
                }
            ],
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'rowactions',
                    maxWidth: 80,
                    defaultWidth: 80,
                    actions: [
                        {
                            iconCls: 'edit_action ui-silk ui-silk-newspaper-go',
                            tooltip: 'Edit Publication',
                            hideIndex: 'edit_action',
                            callback: Ext.emptyFn
                        },
                        {
                            iconCls: 'delete_action ui-silk ui-silk-newspaper-delete',
                            tooltip: 'Delete Publication',
                            hideIndex: 'delete_action',
                            callback: Ext.emptyFn
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'id',
                    text: 'Id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'contact_email',
                    text: 'Content Coordinator Email'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'contact_email',
                    text: 'Publisher Email'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    text: 'Territory'
                }
            ]
        });

        me.callParent(arguments);
    }

});