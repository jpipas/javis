Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': 'http://cdn.sencha.io/ext-4.2.0-gpl/src/',
        'Ext.ux': 'http://cdn.sencha.io/ext-4.2.0-gpl/examples/ux/'
        //'JavisERP':'/app'
    }
});

// remove the tooltip minWidth!
// http://stackoverflow.com/questions/15834689/extjs-4-2-tooltips-not-wide-enough-to-see-contents
delete Ext.tip.Tip.prototype.minWidth;

// http://stackoverflow.com/questions/1287584/how-do-i-force-the-display-of-a-decimal-in-an-extjs-numberfield-to-a-certain-pre
Ext.override(Ext.form.NumberField, {
    forcePrecision : false,

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        if (isNaN(value))
        {
          value = '';
        } else {
          value = me.forcePrecision ? value.toFixed(me.decimalPrecision) : parseFloat(value);
          value = String(value).replace(".", decimalSeparator);
        }
        return value;
    }
});

Ext.define('Ext.ux.component.Permission', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.permission',
	init: function (cmp) {
		// see if our permissions are set
		if (App){
			if (App.user){
				if (App.user.resources){
					//console.log(cmp.resourceId);
					if (Ext.isArray(cmp.resourceId)){
						for (i in cmp.resourceId){
							if(App.user.resources.indexOf(cmp.resourceId[i]) != -1){
        						return;
        					}
						}
					} else {
        				if(App.user.resources.indexOf(cmp.resourceId) != -1){
        					return;
        				}
        			}
        		}
        	}
        }
        // switch what type of resources it is (either hide or disable)
        switch (cmp.resourceType){
        	case 'hide':
        		cmp.hide();
        		break;
        	
        	default:
        		cmp.disable();
        		break;
        }
	}
});

Ext.application({
    models: [
        'Client',
        'Territory',
        'State',
        'PaymentType',
        'PaymentCategory',
        'Contact',
        'Contract',
        'Activity',
        'UserNote',
        'Role',
        'Publication',
        'Payment',
        'AppliedPayment',
        'Duration',
        'PostalCode',
        'User',
        'AdList',
        'PermissionResource',
        'PermissionRole'
    ],
    stores: [
        'ClientStore',
        'TerritoryStore',
        'PaymentStore',
        'ContactStore',
        'ActivityStore',
        'UserNoteStore',
        'ContactRoleStore',
        'ActivityTypeStore',
        'ActivityStatusStore',
        'PublicationStore',
        'ContractStore',
        'PaymentTypeStore',
        'PaymentCategoryStore',
        'StaticPublicationStore',
        'Duration',
        'PostalCode',
        'User',
        'AdList',
        'UserNoteStore',
        'PermissionResourceStore',
        'PermissionRoleStore'
    ],
    views: [
        'Viewport',
        'NavBar',
        'ContentCards',
        'Activities',
        'RecordNavigation',
        'ClientPortlet',
        'TerritoryGrid',
        'ContactGrid',
        'ContactWindow',
        'PublicationGrid',
        'ContractGrid',
        'ContractWindow',
        'PaymentGrid',
        'ContractPaymentWindow',
        'PublicationWindow',
        'UserGrid',
        'UserWindow',
        'AdListGrid',
        'PortalPanel',
        'PortalColumn',
        'PortalDropZone',
        'Portlet',
        'PortletPanel',
        'PermissionResourceTree',
        'PermissionRoleGrid'
    ],
    autoCreateViewport: true,
    name: 'JavisERP',
    controllers: [
        'AppController',
        'ActivityController',
        'MainNavController',
        'ClientController',
        'ContactController',
        'Portal',
        'ContractController',
        'PaymentController',
        'PublicationController',
        'UserController',
        'AdListController',
        'TerritoryController',
        'AdvertisementController',
        'PermissionResourceController',
        'PermissionRoleController'
    ],
    appFolder: '/app',
    launch: function() {
        // can now be used to reference the application from anywhere!!
        _myAppGlobal = this;
    }

});
