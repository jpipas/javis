/*
 * File: app/model/Client.js
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

Ext.define('JavisERP.model.Client', {
    extend: 'Ext.data.Model',
    alias: 'model.client',

    uses: [
        'JavisERP.model.Territory',
        'JavisERP.model.Contact'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            sortType: 'asInt',
            type: 'int'
        },
        {
            name: 'company_name',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'address1',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'address2',
            type: 'string'
        },
        {
            name: 'city',
            type: 'string'
        },
        {
            name: 'state',
            type: 'string'
        },
        {
            name: 'zip',
            type: 'string'
        },
        {
            name: 'phone'
        },
        {
            name: 'email_address'
        },
        {
            name: 'fax'
        },
        {
            name: 'territory',
            mapping: 'territory.name'
        },
        {
            name: 'balance'
        },
        {
            name: 'remaining_months',
            mapping: 'remaining_months.cnt'
        },
        {
            name: 'overdue_balance'
        }
    ],

    proxy: {
        type: 'rest',
        api: {
            create: '/server/web/index.php/client/new',
            read: '/server/web/index.php/client/',
            update: '/server/web/index.php/client/update',
            destroy: '/server/web/index.php/client/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'client',
            totalProperty: 'totalCount'
        }
    },

    hasMany: [
        {
            associationKey: 'territory',
            model: 'JavisERP.model.Territory',
            name: 'territory'
        },
        {
            associationKey: 'contact',
            model: 'JavisERP.model.Contact',
            name: 'contact'
        }
    ]
});