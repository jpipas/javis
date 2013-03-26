/*
 * File: app/model/Payment.js
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

Ext.define('JavisERP.model.Payment', {
    extend: 'Ext.data.Model',

    uses: [
        'JavisERP.model.Client',
        'JavisERP.model.Contract',
        'JavisERP.model.PaymentType'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'type'
        },
        {
            name: 'payment_type_id',
            mapping: 'payment_type.description'
        },
        {
            name: 'created_at'
        },
        {
            name: 'updated_at'
        },
        {
            name: 'insert_user_id'
        },
        {
            name: 'update_user_id'
        },
        {
            name: 'payment_amount'
        },
        {
            name: 'client_name',
            mapping: 'client.company_name'
        },
        {
            name: 'client_id'
        },
        {
            name: 'client'
        },
        {
            name: 'contract_id'
        },
        {
            name: 'duration_id'
        },
        {
            name: 'payment_category'
        }
    ],

    proxy: {
        type: 'srest',
        url: '/server/web/index.php/payment/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'payment',
            totalProperty: 'totalCount'
        }
    }
});