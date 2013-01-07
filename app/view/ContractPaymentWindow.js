Ext.define('JavisERP.view.ContractPaymentWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractpaymentwindow',

    cls: 'paymentWindow',
    id: 'paymentWindow',
    itemId: 'paymentWindow',
    width: 750,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Payment',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'paymentform',
                    id: 'paymentForm',
                    itemId: 'paymentForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            cls: 'adWindowToolBar',
                            itemId: 'adwindowtoolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'paymentsavebutton',
                                    id: 'paymentsavebutton',
                                    itemId: 'paymentsavebutton',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'cancelbutton',
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            padding: '0px 0px 10px 0px',
                            defaults: {
                                anchor: '95%'
                            },
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    id: 'paymentform_column1',
                                    itemId: 'column1',
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            name: 'client_name',
                                            fieldLabel: 'Client'
                                        },
                                        {
                                            xtype: 'combobox',
                                            tpl: '<tpl for="."><div class="x-boundlist-item">Contract #: <b>{id}</b> - ({total_amount})</div></tpl>',
                                            displayTpl: '<tpl for=".">Contract #: {id} - ({total_amount})</tpl>',
                                            cls: 'contractCombo',
                                            fieldLabel: 'Contract',
                                            name: 'contract_id',
                                            displayField: 'id',
                                            store: 'ContractStore',
                                            valueField: 'id'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            cls: 'paymentType',
                                            itemId: 'payment_type_id',
                                            name: 'payment_type_id',
                                            fieldLabel: 'Payment Type',
                                            displayField: 'description',
                                            store: 'PaymentTypeStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            cls: 'paymentAmount',
                                            id: 'payment_amount',
                                            itemId: 'payment_amount',
                                            name: 'payment_amount',
                                            fieldLabel: 'Payment Amount'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'paymentCategory',
                                            id: 'payment_category',
                                            itemId: 'payment_category',
                                            name: 'payment_category',
                                            fieldLabel: 'Category',
                                            displayField: 'description',
                                            store: [
                                                'Paid in Advance',
                                                'Partial Payment Recieved',
                                                'Paid on Time',
                                                'Uncollected',
                                                'Paid on Overdue',
                                                'Commission Paid On',
                                                '1st Month Bonus Paid on Time',
                                                'Bonus Commission Paid On'
                                            ],
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'checkboxgroup',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    margin: '0 10',
                                                    name: 'email_client',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
                                                    boxLabel: 'Notify Client of Payment Entry',
                                                    inputValue: '1'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            cls: 'payment_client_id',
                                            itemId: 'client_id',
                                            name: 'client_id'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});