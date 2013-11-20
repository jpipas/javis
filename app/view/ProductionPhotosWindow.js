Ext.define('JavisERP.view.ProductionPhotosWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.productionphotoswindow',

    id: 'productionPhotosWindow',
    itemId: 'productionPhotosWindow',
    width: 500,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Photos',
    modal: true,
    closeAction: 'hide',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'productionPhotoForm',
                    itemId: 'productionPhotoForm',
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'productionphotowindowtoolbar',
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
                    items: [
                		{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                		{
                			xtype: 'hiddenfield',
                			name: 'type_id',
                			value: 'photos'
                		},
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
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
                                    name: 'upload_id'
                                },
                            	{
                                    xtype: 'filefield',
                                    name: 'file_full',
                                    itemId: 'photo_file_full',
                                    fieldLabel: 'Hi-res Photo',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'title',
                                    fieldLabel: 'Title',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'filename',
                                    fieldLabel: 'Filename',
                                    allowBlank: false
                                },
                                {
                                	xtype: 'textarea',
		                        	fieldLabel: 'Keywords',
		                        	name: 'keywords',
                                    allowBlank: false,
                                    emptyText: 'Separate multiple keywords with a comma'
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