Ext.define('JavisERP.view.ActivityWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.activitywindow',

    requires: [
        'JavisERP.view.ComboView',
        'JavisERP.view.ComboFieldBox'
    ],

    id: 'activityWindow',
    cls: 'activityWindow',
    itemId: 'activityWindow',
    width: 500,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Activity',
    modal: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'activityForm',
                    id: 'activityForm',
                    itemId: 'activityForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'activityWindowToolBar',
                            itemId: 'activitywindowtoolbar',
                            items: [
                            		{
                            				xtype: 'tbspacer',
                            				flex: 1
                            		},
                                {
                                    xtype: 'button',
                                    cls: 'activitysavebutton',
                                    id: 'activitysavebutton',
                                    itemId: 'savebutton',
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
                                        padding: '5px 0px 0px 0px',
                                        anchor: '95%'
                                    },
                                    layout: {
                                        type: 'anchor'
                                    },
                                    labelAlign: 'right',
                                    items: [
                                    		{
                                            xtype: 'combobox',
                                            cls: 'activitytype',
                                            itemId: 'type_id',
                                            name: 'type_id',
                                            fieldLabel: 'Type',
                                            displayField: 'description',
                                            store: 'ActivityTypeStore',
                                            allowOnlyWhitespace: false,
                                            allowBlank: false,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'activitystatus',
                                            itemId: 'status_id',
                                            name: 'status_id',
                                            fieldLabel: 'Status',
                                            displayField: 'description',
                                            store: 'ActivityStatusStore',
                                            allowOnlyWhitespace: false,
                                            allowBlank: false,
                                            valueField: 'id'
                                        },
                                    		{
                                            xtype: 'textfield',
                                            cls: 'title',
                                            name: 'title',
                                            fieldLabel: 'Title'
                                        },
                                        {
                                            xtype: 'datefield',
                                            cls: 'post_date',
                                            name: 'post_date',
                                            fieldLabel: 'Date'
                                        },
                                        {
                                            xtype: 'timefield',
                                            cls: 'post_time',
                                            name: 'post_time',
                                            fieldLabel: 'Time',
                                            emptyText: 'All Day Activity'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'client',
                                            itemId: 'client_id',
                                            name: 'client_id',
                                            fieldLabel: 'Client',
                                            displayField: 'company_name',
                                            store: 'ClientStore',
                                            hideTrigger: true,
                                            triggerAction: 'query',
                                            pageSize: true,
                                            allowOnlyWhitespace: false,
                                            allowBlank: false,
                                            minChars: 3,
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'assigned_to',
                                            id: 'assigned_to_id',
                                            itemId: 'assigned_to_id',
                                            name: 'assigned_to_id',
                                            fieldLabel: 'Assigned To',
                                            displayField: 'fullname',
                                            store: 'UserDropDown',
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