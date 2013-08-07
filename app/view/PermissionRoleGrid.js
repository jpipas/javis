Ext.define('JavisERP.view.PermissionRoleGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.permissionroles',
    
    requires: [
        'JavisERP.view.PermissionResourceCheckTree'
    ],

    itemId: 'permissionroles',
    autoScroll: true,
    title: 'Permission Roles',
    forceFit: true,
    layout: 'column',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	listeners: {
                beforeshow: {
                    fn: me.onBeforeShow,
                    scope: me
                }
            },
            tbar: [{
                text: 'New Role',
                iconCls: 'ui-silk ui-silk-user-add',
                scope: this,
                itemId: 'new_role'
            }],
            items: [{
                columnWidth: 0.65,
                xtype: 'gridpanel',
                border: 0,
                itemId: 'permissionrolegrid',
                forceFit: true,
                store: {type: 'permissionrolestore'},
                columns: [{
                    text: 'ID',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'id'
                }, 
                {
                    text: 'Title',
                    flex: 3,
                    sortable: true,
                    dataIndex: 'title'
                }, 
                {
                    text: 'Users',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'users'
                }]/*,
                listeners: {
                    scope: this,
                    selectionchange: this.onSelectionChange
                }*/
            }, {
                columnWidth: 0.35,
                margin: '10px 0 10px 10px',
                bodyPadding: 0,
                xtype: 'form',
                border: 0,
                frame: true,
                itemId: 'permissionroleform',
                dockedItems: [
	                {
	                    xtype: 'toolbar',
	                    dock: 'top',
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
		                    }
	                    ]
	                },
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
		                    }
	                    ]
	                }
	            ],
                items: [
               	{
	                xtype: 'fieldcontainer',
	                layout: 'anchor',
	                defaults: {
	                	padding: '5px 0px 0px 0px',
	                	labelAlign: 'right',
	                	anchor: '100%',
	                },
	                title: 'Modify Role',
	                defaultType: 'textfield',
	                items: [
	                	{
                			xtype: 'hiddenfield',
                			name: 'id'
                		},
                		{
		                    fieldLabel: 'Title',
		                    name: 'title'
		                },
		                {
		                    xtype: 'permissionresourcechecktree',
		                    itemId: 'resourcetree',
		                    name: 'resources'
	                	}
	                ]
	            }]
			}]  
        });

        me.callParent(arguments);
    },
    onBeforeShow: function(abstractcomponent, options){
    	var grid = abstractcomponent.queryById('permissionrolegrid');
    	grid.getStore().reload();
    	grid.getSelectionModel().deselectAll();
    	
    	var frm = abstractcomponent.queryById('permissionroleform');
    	frm.getForm().reset();
    	
    	var tree = abstractcomponent.queryById('resourcetree');
    	tree.getStore().reload();
    	tree.getRootNode().cascadeBy(function(n) {
			// folders won't have a checkbox
			if (n.data.leaf == true){
				n.set('checked', false);
			}
    	});
    }
});