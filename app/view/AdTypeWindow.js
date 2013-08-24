Ext.define('JavisERP.view.AdTypeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.adtypewindow',

    requires: [
        'JavisERP.view.ComboFieldBox',
        'Ext.ux.form.field.BoxSelect'
    ],

    itemId: 'adtypewindow',
    width: 400,
    layout: {
        type: 'fit'
    },
    title: 'Advertisement Type',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'adTypeForm',
                    itemId: 'adtypeform',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'adtypewindowtoolbar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    cls: 'savebutton',
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
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: 'Description',
                            labelAlign: 'right'
                        },              
                        {
                            xtype: 'comboboxselect',
                            multiSelect:true,
                            forceSelection: false,
                            filterPickList: true,
                            pinList: false,
                            grow: true,
                            itemId: 'ad_size',
                            name: 'ad_size',
                            fieldLabel: 'Ad Size(s)',
                            displayField: 'description',
                            store: {type : 'adsizestore'},
                            valueField: 'id'
                        }
                	]
                }
            ]
        });

        me.callParent(arguments);
    }

});