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
        'AdList'
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
        'UserNoteStore'
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
        'PortletPanel'
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
        'AdvertisementController'
    ],
    appFolder: '/app',
    launch: function() {
        // can now be used to reference the application from anywhere!!
        _myAppGlobal = this;
    }

});
