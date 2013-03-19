/*
 * File: app/model/Territory.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('JavisERP.model.Territory', {
    extend: 'Ext.data.Model',
    alias: 'model.territory',

    uses: [
        'JavisERP.model.State'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'state_id'
        },
        {
            name: 'state'
        },
        {
            name: 'state_name',
            mapping: 'state.name'
        },
        {
            name: 'manager_username',
            mapping: 'manager.username'
        },
        {
            name: 'manager_id'
        },
        {
            name: 'manager'
        }
    ],

    proxy: {
        type: 'rest',
        api: {
            create: '/server/web/index.php/territory/new',
            read: '/server/web/index.php/territory/',
            update: '/server/web/index.php/territory/update',
            destroy: '/server/web/index.php/territory/delete'
        },
        //url: 'resources/js/territory.json',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'territory',
            totalProperty: 'totalCount'
        }
    },

    hasMany: {
        associationKey: 'states',
        model: 'JavisERP.model.State'
    }
});