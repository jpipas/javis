/*
 * File: app/view/ClientPortlet.js
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

Ext.define('JavisERP.view.ClientPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientportlet',

    height: 250,
    itemId: 'clientportlet',
    minHeight: 300,
    width: 868,
    autoScroll: false,
    header: false,
    columnLines: true,
    forceFit: true,
    scroll: 'vertical',
    store: 'ClientStore',
    //features: [{ftype: 'filters'}],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'View Client',
	                align: 'center',
	                iconCls: 'view_action ui-silk ui-silk-user',
	                itemId: 'client_view',
                    resourceId: 'client_view',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
	                width: 30,
	                menuDisabled: true,
	                xtype: 'actioncolumn',
	                tooltip: 'Delete Client',
	                align: 'center',
	                iconCls: 'delete_action ui-silk ui-silk-user-delete',
	                itemId: 'client_delete',
                    resourceId: 'client_delete',
                    hidden: true,
                    resourceType: 'hide',
                    plugins: ['permission']
	            },
                {
                    xtype: 'numbercolumn',
                    hidden: true,
                    dataIndex: 'id',
                    flex: 1,
                    text: 'ID',
                    format: '0'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'company_name',
                    flex: 3,
                    text: 'Business Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'stage',
                    flex: 1,
                    text: 'Stage',
                    filter: {
                        type: 'list',
                        options: ['CUSTOMER','PROSPECT','LEAD']
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'salesrep_name',
                    flex: 3,
                    text: 'Sales Rep'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'address1',
                    flex: 3,
                    text: 'Address'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'address2',
                    flex: 1,
                    text: 'Address Line 2'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'city',
                    flex: 1,
                    text: 'City'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'state_name',
                    flex: 1,
                    text: 'State'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'postal_code_iso',
                    flex: 1,
                    text: 'Zip',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'territory_name',
                    flex: 1,
                    text: 'Territory',
                    filter: {
                        type: 'string'
                    }
                }
            ],
            viewConfig: {
                itemId: 'ClientGridView'
            },
            listeners: {
                beforerender: {
                    fn: me.onClientPortletBeforeRender,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'ClientPagingToolbar',
                    displayInfo: true,
                    store: 'ClientStore'
                },
                {
                    xtype: 'gridsearchingbar',
                    inputWidth: 200,
                    grid: this,
                    showSelectAll: true,
                    menuIconCls: 'ui-silk ui-silk-magnifier',
                    disableIndexes: ['id'],
                    items: ['->']
                }
            ]
        });

        me.callParent(arguments);
    },

    onClientPortletBeforeRender: function(abstractcomponent, options) {
        abstractcomponent.getStore().load();
    }
});