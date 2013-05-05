/**
 * Search plugin for Ext.grid.GridPanel, Ext.grid.EditorGrid ver. 2.x or subclasses of them
 *
 * @author    Ing. Jozef Sakalos
 * @copyright (c) 2008, by Ing. Jozef Sakalos
 * @date      17. January 2008
 * @version   $Id: Ext.ux.grid.Search.js 220 2008-04-29 21:46:51Z jozo $
 *
 * @license Ext.ux.grid.Search is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * License details: http://www.gnu.org/licenses/lgpl.html
 */


/*
    Revised for Ext 4
    by Nathan LeBlanc
    on July 8, 2011
*/


/*
 * Changed in toolbar
 * by Fabio Frijo,
 * on April 6, 2012
 */


Ext.define('Ext.ux.toolbar.GridSearching', {
    extend             : "Ext.toolbar.Toolbar",
    alias              : 'widget.gridsearchingbar',
    alternateClassName : 'Ext.ux.GridSearchingToolbar',

    /**
     * @cfg {Boolean} hideMenu Set this to true to prevent menu creation
     */

    /**
     * @cfg {String} position The position of search elements
     */
    position: 'first',

    /**
     * @cfg {Ext.grid.Panel} grid The grid panel to bind search functions
     */
    grid: undefined,

    /**
     * @cfg {String} menuPosition The menu position relative to search field (defaults to 'left')
     */
    menuPosition: 'left',


    /**
     * @cfg {String} menuText Text to display on menu button
     */
    menuText:'Search',


    /**
     * @cfg {String} inputTip Text to display as input tooltip. Set to '' for no tooltip
     */
    inputTip:'Type a text to search and press Enter',


    /**
     * @cfg {String} inputTip Text to display as input tooltip. Set to '' for no tooltip
     */
    menuTip:'',


    /**
     * @cfg {String} selectAllText Text to display on menu item that selects all fields
     */
    selectAllText:'Select All',


    /**
     * @cfg {String} menuIconCls Icon class for menu button (defaults to '')
     */
    menuIconCls:'',


    /**
     * @cfg {String/Array} checkIndexes Which indexes to check by default. Can be either 'all' for all indexes
     * or array of dataIndex names, e.g. ['persFirstName', 'persLastName']
     */
    checkIndexes:'all',


    /**
     * @cfg {Array} disableIndexes Array of index names to disable (not show in the menu), e.g. ['persTitle', 'persTitle2']
     */
    disableIndexes:[],


    /**
     * @cfg {String} dateFormat how to format date values. If undefined (the default)
     * date is formatted as configured in colummn model
     */
    dateFormat:undefined,


    /**
     * @cfg {Boolean} showSelectAll Select All item is shown in menu if true (defaults to true).
     * This config is valid only with menuStyle:'checkbox'
     */
    showSelectAll:true,


    /**
     * @cfg {String} menuStyle Valid values are 'checkbox' and 'radio'. If menuStyle is radio
     * then only one field can be searched at a time and selectAll is automatically switched off.
     */
    menuStyle:'checkbox',


    /**
     * @cfg {String} mode Use 'remote' for remote stores or 'local' for local stores. If mode is local
     * no data requests are sent to server the grid's store is filtered instead (defaults to 'remote')
     */
    mode:'remote',


    /**
     * @cfg {Array} readonlyIndexes Array of index names to disable (show in menu disabled), e.g. ['persTitle', 'persTitle2']
     */


    /**
     * @cfg {Number} inputWidth Width of input field in pixels (defaults to 100)
     */
    inputWidth:100,

    /**
     * @cfg {String} paramName store param name (defaults to 'search')
     */
    paramName: 'search',


    /**
     * @cfg {Object} jsonNames json param object name map (defaults to {fields:'fields', query:'query'}
     */
    jsonNames: {
         fields:'fields',
         query:'query'
    },


    /**
     * @cfg {Number} minLength force user to type this many character before he can make a search
     */

    // Init
    initComponent: function(){
        this.menu = Ext.create('Ext.menu.Menu');


        this.field = Ext.create('Ext.form.TwinTriggerField', {
            width           : this.inputWidth,
            trigger1Cls     : 'x-form-clear-trigger',
            trigger2Cls     : 'x-form-search-trigger',
            onTrigger1Click : Ext.bind(this.onTriggerClear, this),
            onTrigger2Click : Ext.bind(this.onTriggerSearch, this),
            minLength       : this.minLength
        });

        if('last' === this.position){
            this.addCustomComponents();
        } else {
            var userItems = this.items;
            this.items = [];
            this.addCustomComponents();

            for(var i = 0; i < userItems.length; i++){
                this.items.push(userItems[i]);
            }
        }

        Ext.ux.toolbar.GridSearching.superclass.initComponent.call(this, arguments);
    },


    // On render function
    onRender: function(){
        Ext.ux.toolbar.GridSearching.superclass.onRender.call(this, arguments);

        // populate the menu
        this.populateMenu();

        // install event handlers on input field
        this.field.on('render', this.fieldRender, this, {single:true});
    },

    // Add search components to toolbar
    addCustomComponents: function(){
        if(true === this.hideMenu){
            this.items.push(this.field);
        } else if('right' === this.menuPosition){
            this.items.push(this.field);
            this.items.push('-');
            this.items.push(this.getMenuButton());
        } else {
            this.items.push(this.getMenuButton());
            this.items.push('-');
            this.items.push(this.field);
        }
    },

    // Get the menu container
    getMenuButton: function(){
        return {
            tooltip : this.menuTip,
            text    : this.menuText,
            menu    : this.menu,
            iconCls : this.menuIconCls
        };
    },

    // Private remote search function
    // (ask server to filter records. Proxy must be a Server proxy)
    doRemoteSearch: function(val, store){
        var proxy = store.getProxy();

        // clear start (necessary if we have paging)
        if(store.lastOptions && store.lastOptions.params) {
            store.lastOptions.params[store.paramNames.start] = 0;
        }


        // get fields to search array
        var fields = [];
        this.menu.items.each(function(item) {
            if(item.checked && item.dataIndex) {
                fields.push(item.dataIndex);
            }
        });


        delete(proxy.extraParams[this.paramName]);

        if (store.lastOptions && store.lastOptions.params) {
            delete(proxy.lastOptions.params[this.paramName]);
        }

        if(fields.length) {
            var obj = {};
            obj[this.jsonNames.fields] = fields;
            obj[this.jsonNames.query]  = val;
            proxy.extraParams[this.paramName] = Ext.encode(obj);
        }


        // reload store
        store.loadPage(1);
    },

    // Private local search function (use grid's store filter)
    doLocalSearch: function(val, store){
        store.clearFilter();

        if(val) {
            store.filterBy(function(r) {
                var retval = false;

                this.menu.items.each(function(item) {
                    if(!item.checked || retval) {
                        return;
                    }

                    var rv = r.get(item.dataIndex);

                    if(rv instanceof Date){
                        var format = this.dateFormat || r.fields.get(item.dataIndex).dateFormat;
                        rv =  Ext.Date.format(rv, format);
                    }

                    var re = new RegExp(val, 'gi');
                    retval = re.test(rv);
                }, this);

                if(retval) {
                    return true;
                }

                return retval;
            }, this);
        }
    },

    // Private Search Trigger click handler
    onTriggerSearch:function() {
        var val = this.field.getValue();
        var store = this.grid.store;


        if(!this.field.isValid()) {
            return;
        }

        if('local' === this.mode) {
            this.doLocalSearch(val, store);
        } else if(store.getProxy() instanceof Ext.data.proxy.Server) {
            this.doRemoteSearch(val, store);
        }
    },

    // Private Clear Trigger click handler
    onTriggerClear:function() {
        this.field.setValue('');
        this.field.focus();
        this.onTriggerSearch();
    },

    // Field onRender function
    fieldRender: function() {
        Ext.QuickTips.register({
            target : this.field.inputEl,
            text   : this.inputTip
        });

        // install key map
        var map = new Ext.KeyMap(this.field.el, [{
             key   : Ext.EventObject.ENTER,
             scope : this,
             fn    : this.onTriggerSearch
        }]);

        map.stopEvent = true;
    },

    // Menu creation function
    populateMenu: function(){
        // remove old items
        this.menu.removeAll();


        // add Select All item plus separator
        if(this.showSelectAll && 'radio' !== this.menuStyle) {
            var selectAllFn = function(item) {
                var checked = item.checked;
                item.parentMenu.items.each(function(i) {
                    if(item !== i && i.setChecked && !i.disabled) {
                        i.setChecked(checked);
                    }
                });
            };

            var selectAll = {
                xtype       : 'menucheckitem',
                text        : this.selectAllText,
                checked     : 'all' === this.checkItems,
                hideOnClick : false,
                handler     : selectAllFn
            };

            this.menu.add(selectAll, '-');
        }

        // add new items
        var columns = this.grid.headerCt.items.items;

        var group = null;

        if('radio' === this.menuStyle) {
            group = 'g' + (new Date()).getTime();
        }

        // adding not disabled items
        Ext.each(columns, function(column) {
            var disable = false;
            if(column.text && column.dataIndex && column.dataIndex !== '') {
                Ext.each(this.disableIndexes, function(item) {
                    disable = disable ? disable : item === column.dataIndex;
                });
                if(!disable) {
                    this.menu.add({
                        xtype       : 'menucheckitem',
                        text        : column.text,
                        hideOnClick : false,
                        group       : group,
                        checked     : 'all' === this.checkIndexes,
                        dataIndex   : column.dataIndex
                    });
                }
            }
        }, this);

        // check items
        if(this.checkIndexes instanceof Array) {
            Ext.each(this.checkIndexes, function(di) {
                var item = this.menu.items.find(function(itm) {
                    return itm.dataIndex === di;
                });
                if(item) {
                    item.setChecked(true, true);
                }
            }, this);
        }


        // disable items
        if(this.readonlyIndexes instanceof Array) {
            Ext.each(this.readonlyIndexes, function(di) {
                var item = this.menu.items.find(function(itm) {
                    return itm.dataIndex === di;
                });
                if(item) {
                    item.disable();
                }
            }, this);
        }
    },


    /**
     * @param {Boolean} true to disable search (TwinTriggerField), false to enable
     */
    setDisabled:function() {
        this.field.setDisabled.apply(this.field, arguments);
    },

    /**
     * Enable search (TwinTriggerField)
     */
    enable:function() {
        this.setDisabled(false);
    },


    /**
     * Disable search (TwinTriggerField)
     */
    disable:function() {
        this.setDisabled(true);
    }
});