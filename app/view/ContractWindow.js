Ext.define('JavisERP.view.ContractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractwindow',

    cls: 'contractWindow',
    width: 750,
    layout: {
        type: 'fit'
    },
    title: 'Contract',
    //closable: true,
    //modal: true,
    autoDestroy: true,
    closeAction: 'hide',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'contractform',
                    itemId: 'contractform',
                    //trackResetOnLoad: true,
                    minHeight: 300,
                    bodyPadding: 5,
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
                                            step: 0.001
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
                                            forcePrecision: true,
                                            decimalPrecision: 2,
                                            minValue: 0
                                        },
                                        {
                                            xtype: 'displayfield',
                                            name: 'subtotal',
                                            fieldLabel: 'Subtotal',
                                            decimalPrecision: 2,
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'design_fee',
                                            fieldLabel: 'Design Fee',
                                            forcePrecision: true,
                                            decimalPrecision: 2,
                                            labelAlign: 'right',
                                            step: 5
                                        },
                                        {
                                            xtype: 'numberfield',
                                            padding: '',
                                            name: 'total_amount',
                                            fieldLabel: 'Total Amount',
                                            forcePrecision: true,
                                            decimalPrecision: 2,
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'first_months_payment',
                                            fieldLabel: '1st Mon. Payment',
                                            decimalPrecision: 2,
                                            forcePrecision: true,
                                            labelAlign: 'right',
                                            autoStripChars: false
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'monthly_payment',
                                            fieldLabel: 'Montly Payment',
                                            decimalPrecision: 2,
                                            forcePrecision: true,
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'client_id',
                                            itemId: 'client_id',
                                            inputId: 'client_id',
                                            name: 'client_id'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'is_new',
                                            itemId: 'is_new',
                                            inputId: 'is_new',
                                            name: 'is_new'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'advertisementgrid',
                            cls: 'contractadgrid',
                            autoDestroy: true,
                            height: 150,
                            //id: 'contractadgrid',
                            itemId: 'contractadgrid',
                            padding: '10px 0px'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});