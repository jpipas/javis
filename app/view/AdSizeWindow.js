Ext.define('JavisERP.view.AdSizeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.adsizewindow',

    itemId: 'adsizewindow',
    width: 400,
    layout: {
        type: 'fit'
    },
    title: 'Advertisement Size',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'adSizeForm',
                    itemId: 'adsizeform',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'adsizewindowtoolbar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    cls: 'savebutton',
                                    itemId: 'savebutton',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    scope: this,
                                    handler: function(){ this.close(); }
                                }
                            ]
                        }
                    ],
                    defaults: {
                        padding: '5px 0px',
                        anchor: '95%',
                        labelAlign: 'right'
                    },
                    items: [
                    	{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                		{
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: 'Description',
                            labelAlign: 'right'
                        }
                	]
                }
            ]
        });

        me.callParent(arguments);
    }

});