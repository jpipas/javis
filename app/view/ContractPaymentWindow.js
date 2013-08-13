Ext.define('JavisERP.view.ContractPaymentWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractpaymentwindow',

    cls: 'paymentWindow',
    id: 'paymentWindow',
    itemId: 'paymentWindow',
    width: 500,
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
                            dock: 'bottom',
                            cls: 'adWindowToolBar',
                            itemId: 'adwindowtoolbar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
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
                                    text: 'Cancel',
                                    scope: this,
                                    handler: function(){ this.close(); }
                                }
                            ]
                        }
                    ],
                    defaults: {
                        padding: '5px 0px 0px 0px',
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth: 125
                    },
                    items: [
                		{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                        {
                            xtype: 'combobox',
                            name: 'client_id',
                            fieldLabel: 'Client',
                            displayField: 'company_name',
                            itemId: 'paymentclient',
                            store: {type: 'clientstore'},
                            hideTrigger: true,
                            triggerAction: 'query',
                            pageSize: true,
                            readOnlyCls: 'read_only',
                            allowOnlyWhitespace: false,
                            allowBlank: false,
                            minChars: 3,
                            valueField: 'id'
                        },
                        {
                            xtype: 'combobox',
                            tpl: '<tpl for="."><div class="x-boundlist-item">Contract #: <b>{contract_number}</b> - (${total_amount})</div></tpl>',
                            displayTpl: '<tpl for=".">Contract #: {contract_number} - (${total_amount})</tpl>',
                            cls: 'contractCombo',
                            fieldLabel: 'Contract',
                            name: 'contract_id',
                            displayField: 'id',
                            queryMode: 'remote',
                            pageSize: true,
                            minChars: 3,
                            store: {type: 'contractstore'},
                            valueField: 'id',
                            itemId: 'paymentcontract',
					        beforeQuery: function(e) {
					        	this.fireEvent('contractcomboquery', this, event);
					        }
                        },
                        {
                            xtype: 'combobox',
                            cls: 'paymentType',
                            itemId: 'payment_type_id',
                            name: 'payment_type_id',
                            fieldLabel: 'Payment Type',
                            displayField: 'description',
                            store: {type: 'paymenttypestore'},
                            valueField: 'id'
                        },
                        {
                            xtype: 'numberfield',
                            cls: 'paymentAmount',
                            id: 'payment_amount',
                            itemId: 'payment_amount',
                            name: 'payment_amount',
                            fieldLabel: 'Payment Amount',
                            forcePrecision: true,
                            decimalPrecision: 2,
                            minValue: 0
                        },
                        {
                            xtype: 'displayfield',
                            name: 'payment_total',
                            fieldLabel: 'Payment Total',
                            decimalPrecision: 2
                        },
                        {
                            xtype: 'datefield',
                            name: 'postdate',
                            fieldLabel: 'Received'
                        },
                        {
                            xtype: 'comboboxselect',
                            multiSelect:true,
                            fieldLabel: 'Apply to Duration(s)',
                            displayField: 'description',
                            emptyText: 'Select a duration...',
                            labelAlign: 'right',
                            anchor: '100%',
                            descField: 'id',
                            valueField: 'id',
                            store: {type: 'durationstore'},
                            grow: true,
                            forceSelection: false,
                            filterPickList: true,
                            queryMode: 'remote',
                            typeAdead:true,
                            name: 'durations',
                            itemId: 'paymentdurations',
					        beforeQuery: function(e) {
					        	this.fireEvent('paymentdurationcomboquery', this, event);
					        }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});