Ext.define('JavisERP.view.PermissionResourceCheckTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.permissionresourcechecktree',
   
	xtype: 'permissionresourcechecktree',
	store: 'PermissionResourceCheckStore',
    scroll: 'vertical',
    border: 0,
    frame: false,
    rootVisible: false,
    useArrows: true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(this, {
        	viewConfig: {
				
            },
            bodyPadding: 10,
            tbar: [{
                text: 'Select All',
                scope: this,
                handler: function(){ this.selectAllFn(true); }
            },
            {
                text: 'Select None',
                scope: this,
                handler: function(){ this.selectAllFn(false); }
            }]
        });
        //console.log(this.getStore().load());
        me.callParent(arguments);
    },
    
    selectAllFn: function(checked){
    	//var checked = item.checked;
    	//var root = this.getView()..getRootNode();
    	//console.log(root);
    	this.getRootNode().cascadeBy(function(n) {
			// folders won't have a checkbox
			if (n.data.leaf == true){
				n.set('checked', checked);
			}
    	});
    },
    
    onCheckedNodesClick: function(){
        var records = this.getView().getChecked(),
            names = [];
                   
        Ext.Array.each(records, function(rec){
            names.push(rec.get('id'));
        });
                    
        Ext.MessageBox.show({
            title: 'Selected Nodes',
            msg: names.join('<br />'),
            icon: Ext.MessageBox.INFO
        });
    }
});