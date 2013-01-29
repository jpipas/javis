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
    enabled: true
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
        'User'
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
        'User'
    ],
    views: [
        'AppViewport',
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
        'AdvertisementGrid',
        'AdvertisementWindow',
        'PaymentGrid',
        'ContractPaymentWindow',
        'PublicationWindow',
        'UserGrid',
        'UserWindow'
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
        'UserController'
    ],

    launch: function() {
        // can now be used to reference the application from anywhere!!
        _myAppGlobal = this;
    }

});
