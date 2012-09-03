/*
 * File: app/model/Contact.js
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

Ext.define('JavisERP.model.Contact', {
    extend: 'Ext.data.Model',
    alias: 'model.contact',

    uses: [
        'JavisERP.model.Role'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'name'
        },
        {
            name: 'email_address'
        },
        {
            name: 'cell_phone'
        },
        {
            mapping: 'role.description',
            name: 'role',
            sortType: 'asText'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/js/contact.json',
        reader: {
            type: 'json',
            root: 'contact',
            totalProperty: 'totalCount'
        }
    },

    hasMany: {
        associationKey: 'role',
        model: 'JavisERP.model.Role',
        name: 'role'
    }
});