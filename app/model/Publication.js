/*
 * File: app/model/Publication.js
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

Ext.define('JavisERP.model.Publication', {
    extend: 'Ext.data.Model',
    alias: 'model.publication',

    uses: [
        'JavisERP.model.Territory',
        'JavisERP.model.Advertisement'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'description'
        },
        {
            name: 'contact_email'
        },
        {
            name: 'content_email'
        },
        {
            name: 'territory_name',
            mapping: 'territory.name'
        },
        {
            name: 'territory_id'
        },
        {
            name: 'created_at'
        },
        {
            name: 'deleted_at'
        },
        {
            name: 'edit_action'
        },
        {
            name: 'delete_action'
        },
        {
            name: 'view_action'
        },
        {
            name: 'postal_code'
        },
        {
            name: 'territory'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/publication/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'publication',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true
        }
    }
});