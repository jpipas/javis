/*
 * File: app/view/ContactWindow.js
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

Ext.define('JavisERP.view.ContactWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactwindow',

    height: 250,
    hidden: false,
    width: 400,
    layout: {
        type: 'fit'
    },
    closable: false,
    title: 'New Contact',
    itemId: 'contactwindow',
    modal: true,
    autoDestroy: true,
    cls: 'contactWindow',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'contactForm',
                    itemId: 'contactform',
                    bodyPadding: 10,
                    trackResetOnLoad: true,
                    title: '',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'contactwindowtoolbar',
                            items: [
                            		{
                            				xtype: 'tbspacer',
                            				flex: 1
                            		},
                                {
                                    xtype: 'button',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    itemId: 'savebutton',
                                    cls: 'saveContactButton',
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
                            xtype: 'textfield',
                            itemId: 'name',
                            name: 'full_name',
                            fieldLabel: 'Contact Name',
                            labelAlign: 'right',
                            allowBlank : false,
                            maxLength : 255,
                            enforceMaxLength : true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'email_address',
                            name: 'email_address',
                            vtype: 'email',
                            fieldLabel: 'Email Address',
                            labelAlign: 'right',
                            maxLength : 255,
                            enforceMaxLength : true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'cell_phone',
                            name: 'phone',
                            vtype: 'phone',
                            fieldLabel: 'Phone Number',
                            labelAlign: 'right',
                            maxLength : 30,
                            enforceMaxLength : true
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'role',
                            name: 'role_id',
                            fieldLabel: 'Role',
                            valueField: 'id',
                            editable: true,
                            displayField: 'description',
                            store: 'ContactRoleStore',
                            labelAlign: 'right',
                            allowBlank : false,
                            maxLength : 255,
                            enforceMaxLength : true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});