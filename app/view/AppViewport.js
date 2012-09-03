/*
 * File: app/view/AppViewport.js
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

Ext.define('JavisERP.view.AppViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'JavisERP.view.NavBar',
        'JavisERP.view.ContentCards'
    ],

    border: 0,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    border: 0,
                    maxHeight: 50,
                    autoScroll: false,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    frameHeader: false,
                    preventHeader: true,
                    title: 'Header',
                    titleCollapse: false,
                    dockedItems: [
                        {
                            xtype: 'image',
                            margins: '0px 0px 5px 0px',
                            dock: 'left',
                            border: 0,
                            height: 84,
                            id: 'logo',
                            width: 209,
                            shadow: false,
                            maintainFlex: true,
                            src: '/resources/images/NCLogo.jpg'
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'HeaderMenu'
                        }
                    ]
                },
                {
                    xtype: 'navbar',
                    preventHeader: true,
                    title: 'Navigation',
                    flex: 1
                },
                {
                    xtype: 'contentCards',
                    itemId: 'AppBody',
                    flex: 1
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    autoRender: false,
                    autoShow: false,
                    height: 50,
                    html: '<div style="padding:10px;text-align:right;">Javis ERP &copy; 2012<br/>v1.0</div>',
                    maxHeight: 50,
                    stateful: false,
                    layout: {
                        type: 'fit'
                    },
                    animCollapse: false,
                    preventHeader: true,
                    title: 'Footer'
                }
            ]
        });

        me.callParent(arguments);
    }

});