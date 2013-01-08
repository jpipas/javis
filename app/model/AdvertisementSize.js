/*
 * File: app/model/AdvertisementSize.js
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

Ext.define('JavisERP.model.AdvertisementSize', {
    extend: 'Ext.data.Model',

    uses: [
        'JavisERP.model.AdvertisementType'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'description'
        },
        {
            name: 'type_id'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'server/web/index.php/advertisement/size/',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'adSize',
            totalProperty: 'totalCount'
        }
    },

    belongsTo: {
        model: 'JavisERP.model.AdvertisementType',
        getterName: 'AdType',
        foreignKey: 'id',
        setterName: 'AdType'
    }
});