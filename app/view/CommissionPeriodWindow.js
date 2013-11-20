Ext.define('JavisERP.view.CommissionPeriodWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.commissionperiodwindow',

    itemId: 'commissionperiodwindow',
    width: 500,
    layout: {
        type: 'fit'
    },
    title: 'Baseline Revenue Period',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'commissionPeriodForm',
                    itemId: 'commissionperiodform',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'commissionperiodwindowtoolbar',
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
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth: 100
                    },
                    items: [
                    	{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                		{
                            xtype: 'combobox',
                            fieldLabel: 'Period',
                            displayField: 'description',
                            emptyText: 'Select a period...',
                            labelAlign: 'right',
                            descField: 'id',
                            valueField: 'id',
                            store: {type: 'durationstore'},
                            name: 'duration_id'
                        },
                        {
                            xtype: 'datefield',
                            name: 'cutoff_date',
                            fieldLabel: 'Payment Cutoff'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Cycle',
                            displayField: 'title',
                            emptyText: 'Select a cycle...',
                            labelAlign: 'right',
                            descField: 'id',
                            valueField: 'id',
                            store: {type: 'commissioncyclestore'},
                            name: 'cycle_id'
                        }
                	]
                }
            ]
        });

        me.callParent(arguments);
    }

});