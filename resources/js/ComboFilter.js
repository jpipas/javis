Ext.define('Ext.ux.form.field.FilterCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.filtercombo',
    /**
    * @cfg {string} recordField
    * @required
    * The fieldname of the record that contains the filtervalue
    */

    /**
    * @cfg {string} searchField
    * @required
    * The fieldname on which the filter should be applied
    */

    /**
    * @cfg {boolean} clearable
    * Indicates if the clear trigger should be hidden. Defaults to <tt>true</tt>.
    */
    clearable: true,

    initComponent: function () {
        var me = this;

        if (me.clearable)
            me.trigger2Cls = 'x-form-clear-trigger';
        else
            delete me.onTrigger2Click;

        me.addEvents(

            /**
            * @event clear
            *
            * @param {Ext.ux.form.field.FilterCombo} FilterCombo The filtercombo that triggered the event
            */
            'clear',
            /**
            * @event beforefilter
            *
            * @param {Ext.ux.form.field.FilterCombo} FilterCombo The filtercombo that triggered the event
            * @param {String/Number/Boolean/Float/Date} value The value to filter by
            * @param {string} field The field to filter on
            */
            'beforefilter'
        );

        me.callParent(arguments);
        // fetch the id the save way
        var ident = me.getId();

        me.on('select', function (me, rec) {
            var value = rec[0].data[me.recordField],
                field = me.searchField;
            me.fireEvent('beforefilter', me, value, field)
            me.onShowClearTrigger(true); 
            me.onSearch(value, field);
        }, me);
        me.on('afterrender', function () { me.onShowClearTrigger(); }, me);
    },

    /**
    * @abstract onSearch
    * running a search on the store that may be removed separately
    * @param {String/Number/Boolean/Float/Date} val The value to search for
    * @param {String} field The name of the Field to search on
    */
    onSearch: Ext.emptyFn,

    /**
    * @abstract onFilterRemove
    * removing filters from the the
    * @param {Boolean} silent Identifies if the filter should be removed without reloading the store
    */
    onClear: Ext.emptyFn,

    onShowClearTrigger: function (show) {
        /*
        6/5/2013 - Dominic - I want the clear button to always be visible
        var me = this;
        if (!me.clearable)
            return;
        show = (Ext.isBoolean(show)) ? show : false;
        if (show) {
            me.triggerEl.each(function (el, c, i) {
                if (i === 1) {
                    el.setWidth(el.originWidth, false);
                    el.setVisible(true);
                    me.active = true;
                }
            });
        } else {
            me.triggerEl.each(function (el, c, i) {
                if (i === 1) {
                    el.originWidth = el.getWidth();
                    el.setWidth(0, false);
                    el.setVisible(false);
                    me.active = false;
                }
            });
        }
        // Version specific methods
        if (Ext.lastRegisteredVersion.shortVersion > 407) {
            me.updateLayout();
        } else {
            me.updateEditState();
        }
        */
    },

    /**
    * @override onTrigger2Click
    * eventhandler
    */
    onTrigger2Click: function (args) {
        this.clear();
    },

    /**
    * @private clear
    * clears the current search
    */
    clear: function () {
        var me = this;
        if (!me.clearable)
            return;
        me.onClear(false);
        me.clearValue();
        me.onShowClearTrigger(false);
        me.fireEvent('clear', me);
        console.log('combofilter clear');
    }
});