Ext.define('JavisERP.view.CommissionCycleWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.commissioncyclewindow',

    itemId: 'commissioncyclewindow',
    width: 400,
    layout: {
        type: 'fit'
    },
    title: 'Revenue Cycle',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'commissionCycleForm',
                    itemId: 'commissioncycleform',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'commissioncyclewindowtoolbar',
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
                        labelAlign: 'right',
                        labelWidth: 125
                    },
                    items: [
                    	{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                		{
                            xtype: 'textfield',
                            name: 'title',
                            fieldLabel: 'Title',
                            labelAlign: 'right'
                        },              
                        {
                            xtype: 'numberfield',
                            name: 'paymentcutoffday',
                            fieldLabel: 'Payment Cutoff Day',
                            minValue: 1,
                            maxValue: 31,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'applyperiodmonths',
                            fieldLabel: 'Apply Ahead Months',
                            minValue: 1,
                            maxValue: 3,
                            labelAlign: 'right'
                        }
                	]
                }
            ]
        });

        me.callParent(arguments);
    }

});