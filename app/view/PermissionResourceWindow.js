Ext.define('JavisERP.view.PermissionResourceWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.permissionresourcewindow',

    id: 'permissionResourceWindow',
    itemId: 'permissionResourceWindow',
    width: 400,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Permission Resource',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'permissionResourceForm',
                    itemId: 'permissionResourceForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'permissionresourcewindowtoolbar',
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
                                    text: 'Cancel',
                                    scope: this,
                                    handler: function(){ this.close(); }
                                }
                            ]
                        }
                    ],
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
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                		{
                			xtype: 'hiddenfield',
                			name: 'is_folder'
                		},
                       	{
                            xtype: 'textfield',
                            name: 'title',
                            fieldLabel: 'Title'
                        },
                        {
                            xtype: 'textfield',
                            name: 'resourceid',
                            fieldLabel: 'Resource ID'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'parent_id',
                            name: 'parent_id',
                            fieldLabel: 'Folder',
                            displayField: 'title',
                            store: {type: 'permissionresourcedatastore'},
                            queryMode: 'local',
                            allowOnlyWhitespace: false,
                            allowBlank: false,
                            valueField: 'id'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});