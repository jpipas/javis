Ext.define('JavisERP.view.UserPasswordWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.userpasswordwindow',

    id: 'userPasswordWindow',
    cls: 'userPasswordWindow',
    itemId: 'userPasswordWindow',
    width: 400,
    autoDestroy: true,
    layout: {
        type: 'fit'
    },
    title: 'Change Your Password',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'userPasswordForm',
                    id: 'userPasswordForm',
                    itemId: 'userPasswordForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    itemId: 'savebutton',
                                    iconCls: 'ui-silk ui-silk-disk',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'cancelbutton',
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
                                type: 'vbox'
                            },
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
                                        },
                                        afterrender: function(field) {
											field.focus(false, 1000);
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