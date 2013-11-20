Ext.define('JavisERP.view.PublicationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.publicationwindow',

    cls: 'publicationwindow',
    itemId: 'publicationwindow',
    width: 400,
    autoDestroy: false,
    layout: {
        type: 'fit'
    },
    title: 'Publication',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    cls: 'publicationform',
                    itemId: 'publicationform',
                    bodyPadding: 10,
                    defaults : {
                    	labelAlign : 'right',
                    	labelWidth : 125
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            cls: 'pubWindowToolBar',
                            itemId: 'pubwindowtoolbar',
                            items: [
                        		{
                    				xtype: 'tbspacer',
                    				flex: 1
                        		},
                                {
                                    xtype: 'button',
                                    cls: 'publicationsavebutton',
                                    itemId: 'publicationsavebutton',
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
                            name: 'edit'
                        },
                        {
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: 'Name/Description',
                            anchor: '100%',
                        },
                        {
                            xtype: 'combobox',
                            cls: 'territory',
                            itemId: 'territory_id',
                            name: 'territory_id',
                            fieldLabel: 'Location',
                            displayField: 'name',
                            store: 'TerritoryStore',
                            valueField: 'id',
                            anchor: '100%',
                            disabled: true,
                            resourceId: ['publication_edit','publication_create'],
		                    resourceType: 'disable',
		                    plugins: ['permission']
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Postal Code(s)',
                            displayField: 'iso_code',
                            emptyText: 'select a postal code...',
                            valueField: 'iso_code',
                            store: 'PostalCode',
                            queryMode: 'local',
                            typeAdead:true,
                            delimiter: ',',
                            multiSelect:true,
                            name: 'postal_codes',
                            cls:'postalCodeList',
                            anchor: '100%',
                            disabled: true,
                            resourceId: ['publication_edit','publication_create'],
                    		resourceType: 'disable',
                    		plugins: ['permission']
                        },
                        {
                            xtype: 'combobox',
                            cls: 'contentcoord',
                            id: 'contentcoord_id',
                            itemId: 'contentcoord_id',
                            name: 'contentcoord_id',
                            fieldLabel: 'Content Coordinator',
                            displayField: 'fullname',
                            store: 'UserDropDown',
                            hideTrigger: true,
                            triggerAction: 'query',
                            pageSize: true,
                            minChars: 3,
                            valueField: 'id',
                            anchor: '100%',
                        },
                        {
                        	xtype: 'displayfield',
                        	fieldLabel: 'Baselines',
                        	labelAlign: 'left',
                        	style: {
                        		color: '#cc0000',
                        		fontWeight: 'bold'
                        	},
                        	hidden: true,
                        	resourceId: ['publication_edit','publication_create'],
		                    resourceType: 'hide',
		                    plugins: ['permission']
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            layout: {
                                align: 'stretch',
                                type: 'anchor'
                            },
                            hidden: true,
                        	resourceId: ['publication_edit','publication_create'],
		                    resourceType: 'hide',
		                    plugins: ['permission'],
                            anchor: '100%',
                            itemId: 'PublicationBaselines',
                            items: [{
                            	xtype: 'fieldcontainer',
                            	padding: '0px 0px 5px 0px',
	                            flex: 1,
	                            layout: {
	                                align: 'stretch',
	                                type: 'hbox'
	                            },
	                            defaults: {
	                            	hideLabel: true
	                            },
	                            anchor: '100%',
                            	items: [
	                            	{
			                            xtype: 'numberfield',
			                            name: 'pages',
			                            fieldLabel: 'Pages',
			                            emptyText: '# of Pages',
			                            decimalPrecision: 0,
			                            anchor: '100%',
			                            flex: 1,
			                            padding: '0 10px 0 0'
			                        },
			                        {
			                            xtype: 'numberfield',
			                            name: 'baseline',
			                            fieldLabel: 'Baseline Amount',
			                            emptyText: 'Baseline Amount',
			                            decimalPrecision: 2,
			                            flex: 1,
			                            anchor: '100%',
			                        }
	                            ]
	                        }] 
						},
						{
							xtype: 'button',
							text: 'More Baselines',
							itemId: 'MoreBaselines',
							hidden: true,
                        	resourceId: ['publication_edit','publication_create'],
		                    resourceType: 'hide',
		                    plugins: ['permission']
						}
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});