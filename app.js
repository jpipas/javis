/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

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
        'Contact',
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
        'PublicationStore',
        'ContractStore',
        'PaymentTypeStore',
        'StaticPublicationStore',
        'Duration',
        'PostalCode',
        'User',
        'AdList'
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
        'PaymentGrid',
        'ContractPaymentWindow',
        'PublicationWindow',
        'UserGrid',
        'UserWindow',
        'AdListGrid'
    ],
    autoCreateViewport: true,
    name: 'JavisERP',
    controllers: [
        'AppController',
        'MainNavController',
        'ClientController',
        'Portal',
        'AdWindowController',
        'ContractWindowController',
        'PaymentController',
        'ContractGridController',
        'PublicationController',
        'UserController',
        'AdListController',
        'TerritoryController',
        'AdvertisementGridController'
    ],
    appFolder: '/app',
    launch: function() {
        // can now be used to reference the application from anywhere!!
        _myAppGlobal = this;
    }

});
