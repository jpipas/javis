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
        },
        {
            name: 'territory_id',
            type: 'int'
        },
        {
            name: 'durations'
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
        },
        {
            model: 'JavisERP.model.Territory',
            foreignKey: 'territory_id'
        }
    ],

    hasMany: {
        model: 'JavisERP.model.Duration',
        name: 'durations'
    },

    proxy: {
        type: 'rest',
        api: {
            create: '/server/web/index.php/contract/new',
            read: '/server/web/index.php/contract/',
            update: '/server/web/index.php/contract/update',
            destroy: '/server/web/index.php/contract/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'contract',
            totalProperty: 'totalCount'
        }
    }
});