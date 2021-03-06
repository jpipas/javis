Ext.define('JavisERP.view.UserWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.userwindow',

    requires: [
        'JavisERP.view.ComboView',
        'JavisERP.view.ComboFieldBox'
    ],

    id: 'userWindow',
    cls: 'userWindow',
    itemId: 'userWindow',
    width: 750,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Employee',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'userForm',
                    id: 'userForm',
                    itemId: 'userForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'userWindowToolBar',
                            itemId: 'userwindowtoolbar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    cls: 'usersavebutton',
                                    id: 'usersavebutton',
                                    itemId: 'savebutton',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'cancelbutton',
                                    itemId: 'cancelbutton',
                                    text: 'Cancel'
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
                                    id: 'user_column1',
                                    itemId: 'userwindow_col1',
                                    defaults: {
                                        padding: '5px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    labelAlign: 'right',
                                    items: [
                                    	{
                                            xtype: 'textfield',
                                            cls: 'firstname',
                                            name: 'first_name',
                                            fieldLabel: 'First Name'
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'lastname',
                                            name: 'last_name',
                                            fieldLabel: 'Last Name'
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'username',
                                            name: 'username',
                                            fieldLabel: 'Username'
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'email',
                                            name: 'email',
                                            fieldLabel: 'Email'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'phone',
                                            fieldLabel: 'Phone',
                                            maxLength: 30
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'profitshare',
                                            fieldLabel: 'Profit Share %',
                                            emptyText: 'Blank: .80 (80%)',
                                            decimalPrecision: 2,
					                    	maxValue: 1,
					                    	minValue: 0,
					                    	step: .1
                                        },
										{
                                            xtype: 'numberfield',
                                            name: 'salesrep_comm',
                                            fieldLabel: 'AE Comm. %',
                                            emptyText: 'Blank: .30 (30%)',
                                            decimalPrecision: 2,
					                    	maxValue: 1,
					                    	minValue: 0,
					                    	step: .1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    defaults: {
                                        padding: '5px 0px',
                                        anchor: '95%',
                                        labelAlign: 'right'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    combineLabels: false,
                                    labelAlign: 'right',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            cls: 'password',
                                            name: 'password',
                                            id: 'password',
                                            fieldLabel: 'Password',
                                            inputType: 'password',
                                            listeners: {
                                                validitychange: function(field){
                                                    field.next().validate();
                                                },
                                                blur: function(field){
                                                    field.next().validate();
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'retype-password',
                                            name: 'retype-password',
                                            fieldLabel: 'Retype Password',
                                            inputType: 'password',
                                            vtype: 'password',
                                            initialPassField: 'password'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            name: 'newpassword',
                                            fieldLabel: 'Require Change',
                                            inputValue: 1
                                        },
                                        {
                                            xtype: 'checkbox',
                                            name: 'disabled',
                                            fieldLabel: 'Disable Login',
                                            inputValue: 1
                                        },
                                        {
				                            xtype: 'comboboxselect',
				                            multiSelect:true,
				                            fieldLabel: 'Role(s)',
				                            displayField: 'title',
				                            emptyText: 'Select a role...',
				                            labelAlign: 'right',
				                            valueField: 'id',
				                            store: {type: 'permissionrolestore'},
				                            grow: true,
				                            forceSelection: false,
				                            queryMode: 'remote',
				                            typeAdead:true,
				                            name: 'roles',
				                            filterPickList: true,
                                            pinList: false
				                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'manager',
                                            id: 'manager_user_id',
                                            itemId: 'manager_user_id',
                                            name: 'manager_user_id',
                                            fieldLabel: 'DVM',
                                            displayField: 'fullname',
                                            store: {type: 'userstore'},
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            minChars: 3,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'regional_user_id',
                                            name: 'regional_user_id',
                                            fieldLabel: 'RM',
                                            displayField: 'fullname',
                                            store: {type: 'userstore'},
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            minChars: 3,
                                            valueField: 'id'
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