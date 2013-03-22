/*
 * File: app/view/TerritoryGrid.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('JavisERP.view.TerritoryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.territorygrid',

    height: 250,
    itemId: 'clientgrid',
    width: 868,
    autoScroll: false,
    title: 'List: Territory',
    forceFit: true,
    scroll: 'none',
    scrollDelta: 150,
    store: 'TerritoryStore',
    columnLines: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                itemId: 'TerritoryGridView',
                maintainFlex: true
            },
            listeners: {
                beforeshow: {
                    fn: me.onTerritorygridBeforeShow,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    {
                        xtype: 'button',
                        iconCls: 'ui-silk ui-silk-map-add',
                        itemId: 'newterritory',
                        text: 'New Territory'
                    }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'TerritoryPagingToolbar',
                    displayInfo: true,
                    store: 'TerritoryStore'
                }
            ],
            columns: [
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'id',
                    hidden: true,
                    text: 'ID',
                    format: '0'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'state_name',
                    text: 'State'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'manager_username',
                    text: 'Publisher'
                }
            ]
        });

        me.callParent(arguments);
    },

    onTerritorygridBeforeShow: function(abstractcomponent, options) {
        abstractcomponent.getStore().load();
    }

});