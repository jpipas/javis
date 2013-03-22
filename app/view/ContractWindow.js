/*
 * File: app/view/ContractWindow.js
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

Ext.define('JavisERP.view.ContractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractwindow',

    cls: 'contractWindow',
    width: 750,
    overflowY: 'auto',
    resizable: false,
    autoDestroy: true,
    layout: {
        type: 'fit'
    },
    title: 'Contract',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'contractform',
                    itemId: 'contractform',
                    minHeight: 300,
                    bodyPadding: 5,
                    url: '/server/web/index.php/contract/new',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            cls: 'contracttoolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'contractsave',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    cls: 'cancelContract'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            padding: '0px 0px 10px 0px',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    cls: 'column1',
                                    itemId: 'column1',
                                    defaults: {
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    labelAlign: 'right',
                                    items: [
                                        {
                                            xtype: 'hidden',
                                            name: 'id',
                                            fieldLabel: 'Contract ID',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '95%',
                                            cls: 'contract_number',
                                            name: 'contract_number',
                                            fieldLabel: 'Contract Number',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '95%',
                                            cls: 'clientnamefield',
                                            name: 'client_name',
                                            fieldLabel: 'Client',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '95%',
                                            name: 'territory_id',
                                            fieldLabel: 'Territory',
                                            labelAlign: 'right',
                                            displayField: 'name',
                                            store: 'TerritoryStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '95%',
                                            name: 'payment_term_id',
                                            fieldLabel: 'Payment Term',
                                            labelAlign: 'right',
                                            displayField: 'description',
                                            store: 'PaymentTermStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'discount',
                                            fieldLabel: 'Discount (%)',
                                            labelAlign: 'right',
                                            maxValue: 1,
                                            minValue: 0,
                                            decimalPrecision: 3,
                                            step: 0.001,
                                            listeners: {
                                                change: {
                                                    fn: me.onDiscountChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            multiSelect:true,
                                            fieldLabel: 'Duration(s)',
                                            displayField: 'description',
                                            emptyText: 'select a duration...',
                                            descField: 'id',
                                            valueField: 'id',
                                            store: 'Duration',
                                            queryMode: 'remote',
                                            typeAdead:true,
                                            editable:false,
                                            name: 'durations',
                                            cls:'durationlist'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    border: 1,
                                    defaults: {
                                        padding: '5px 0px'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    labelAlign: 'right',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name: 'total_sales',
                                            fieldLabel: 'Total Sales Amount',
                                            labelAlign: 'right',
                                            minValue: 0,
                                            listeners: {
                                                change: {
                                                    fn: me.onSalesAmountChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            name: 'subtotal',
                                            fieldLabel: 'Subtotal',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'design_fee',
                                            fieldLabel: 'Design Fee',
                                            labelAlign: 'right',
                                            step: 5,
                                            listeners: {
                                                change: {
                                                    fn: me.onDesignFeeChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            padding: '',
                                            name: 'total_amount',
                                            fieldLabel: 'Total Amount',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'first_months_payment',
                                            fieldLabel: '1st Mon. Payment',
                                            labelAlign: 'right',
                                            autoStripChars: false,
                                            listeners: {
                                                change: {
                                                    fn: me.onFirstMonthsPaymentChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'monthly_payment',
                                            fieldLabel: 'Montly Payment',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'client_id',
                                            itemId: 'client_id',
                                            inputId: 'client_id',
                                            name: 'client_id'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'advertisementgrid',
                            cls: 'contractadgrid',
                            height: 150,
                            id: 'contractadgrid',
                            itemId: 'contractadgrid',
                            padding: '10px 0px'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onCancelClick: function(button, e, options) {
        console.log("cancel this!");
    },

    onDiscountChange: function(field, newValue, oldValue, options) {
        this.runCalculations();
    },

    onSalesAmountChange: function(field, newValue, oldValue, options) {
        this.runCalculations();
    },

    onDesignFeeChange: function(field, newValue, oldValue, options) {
        this.runCalculations();
    },

    onFirstMonthsPaymentChange: function(field, newValue, oldValue, options) {
        this.paymentCalculations();
    },

    runCalculations: function() {
        var form = Ext.ComponentQuery.query('#contractform')[0].getForm();

        var total_sales_amt = form.findField("total_sales").getValue();
        var discount = form.findField("discount").getValue();
        var subtotal = form.findField("subtotal").getValue();
        var design_fee = form.findField("design_fee").getValue();

        var sub_total_calc = (total_sales_amt*(1-discount)).toFixed(2);
        form.findField("subtotal").setValue(sub_total_calc);

        var total_calc = parseFloat(sub_total_calc) + design_fee;
        form.findField("total_amount").setValue(total_calc.toFixed(2));

        this.paymentCalculations();
    },

    paymentCalculations: function() {
        var form = Ext.ComponentQuery.query('#contractform')[0].getForm();

        var subtotal = form.findField("subtotal").getValue();
        var design_fee = form.findField("design_fee").getValue();
        var durations = form.findField("durations").getRawValue();
        //console.log(durations);
        var duration = durations.length;
        if(duration===0){
            duration=1;
        }
        var first_month_calc = (subtotal/duration)+design_fee;
        var month_payment = (subtotal/duration);
        form.findField("first_months_payment").setValue(first_month_calc.toFixed(2));
        form.findField("monthly_payment").setValue(month_payment.toFixed(2));
    }

});