/*
 * File: app/model/Contract.js
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

Ext.define('JavisERP.model.Contract', {
    extend: 'Ext.data.Model',
    alias: 'model.contract',

    uses: [
        'JavisERP.model.Client',
        'JavisERP.model.PaymentTerm',
        'JavisERP.model.Duration'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'total_sales',
            type: 'float'
        },
        {
            name: 'discount',
            type: 'float'
        },
        {
            name: 'subtotal',
            type: 'float'
        },
        {
            name: 'first_months_payment',
            type: 'float'
        },
        {
            name: 'monthly_payment',
            type: 'float'
        },
        {
            name: 'payment_term_description',
            mapping: 'payment_term.description'
        },
        {
            name: 'sale_date',
            type: 'date'
        },
        {
            name: 'client_id',
            type: 'int'
        },
        {
            name: 'design_fee',
            type: 'float'
        },
        {
            name: 'total_amount',
            type: 'float'
        }
    ],

    hasOne: [
        {
            model: 'JavisERP.model.Client',
            foreignKey: 'client_id'
        },
        {
            model: 'JavisERP.model.PaymentTerm',
            foreignKey: 'payment_term_id',
            name: 'payment_term'
        }
    ],

    hasMany: {
        model: 'JavisERP.model.Duration',
        name: 'durations'
    },

    proxy: {
        type: 'rest',
        api: {
            create: 'server/web/index.php/contract/new',
            read: 'server/web/index.php/contract/',
            update: 'server/web/index.php/contract/update',
            destroy: 'server/web/index.php/contract/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'contract',
            totalProperty: 'totalCount'
        }
    }
});