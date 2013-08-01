Ext.define('JavisERP.view.ContractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractwindow',
    
    requires: [
        'JavisERP.view.ComboFieldBox',
        'Ext.ux.form.field.BoxSelect'
    ],
    
    cls: 'contractWindow',
    itemId: 'contractWindow',
    width: 750,
    layout: {
        type: 'fit'
    },
    title: 'Contract',
    modal: true,
    scroll: 'vertical',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'contractForm',
                    itemId: 'contractForm',
                    bodyPadding: 10,
                     dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'contracttoolbar',
                            itemId: 'contractwindowtoolbar',
                            items: [
                        		{
                        				xtype: 'tbspacer',
                        				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    cls: 'contractsave',
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
                    items: [
                		{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
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
                                    id: 'contract_column1',
                                    itemId: 'contractwindow_col1',
                                    defaults: {
                                        padding: '5px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            cls: 'contract_number',
                                            name: 'contract_number',
                                            fieldLabel: 'Contract Number',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'client_id',
                                            fieldLabel: 'Client',
                                            displayField: 'company_name',
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
                                            name: 'territory_id',
                                            fieldLabel: 'Territory',
                                            labelAlign: 'right',
                                            displayField: 'name',
                                            store: 'TerritoryStore',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
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
                                            name: 'soldby_id',
                                            fieldLabel: 'Sold By',
                                            displayField: 'fullname',
                                            store: {type: 'userstore'},
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            minChars: 3,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'datefield',
                                            name: 'sale_date',
                                            fieldLabel: 'Sales Date',
                                            format: 'm/d/Y',
                                            submitFormat: 'Y-m-d'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    id: 'contract_column2',
                                    itemId: 'contractwindow_col2',
                                    defaults: {
                                        padding: '5px 0px',
                                        labelAlign: 'right',
                                        labelWidth: 125,
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
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
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'comboboxselect',
                            multiSelect:true,
                            fieldLabel: 'Duration(s)',
                            displayField: 'description',
                            emptyText: 'Select a duration...',
                            labelAlign: 'right',
                            itemId: 'contractdurations',
                            anchor: '100%',
                            descField: 'id',
                            valueField: 'id',
                            store: 'Duration',
                            grow: true,
                            forceSelection: false,
                            queryMode: 'remote',
                            typeAdead:true,
                            name: 'durations',
                            cls:'durationlist'
                        },
                        {
                        		padding: '5px 5px',
                            xtype: 'comboboxselect',
                            multiSelect:true,
                            labelAlign: 'top',
                            anchor: '100%',
                            fieldLabel: 'Advertisement(s)',
                            displayField: 'client_company_name',
                            descField: 'id',
                            valueField: 'id',
                            forceSelection: false,
                            store: {type : 'advertisementstore' },
                            pageSize: 50,
                            queryMode: 'remote',
                            listConfig: {
                            	itemTpl : '{client_company_name} - {publication_names} - {ad_type_description} - {ad_size_description}'
							},
							labelTpl: "{client_company_name} - {publication_names} - {ad_type_description} - {ad_size_description}",
                            grow: true,
                            stacked: true,
                            name: 'advertisements',
                            itemId: 'contractads',
                            trigger2Cls: 'x-trigger-add',
                            onTrigger2Click: function(e) {
				              	this.fireEvent("ontrigger2click", this, e);
					        },
					        beforeQuery: function(e) {
					        	console.log('before query');
					        	this.fireEvent('contractadscomboquery', this, e);
					        }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});