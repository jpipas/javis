
/*
  * Ext.ux.menu.StoreMenu  Addon
  *
  * @author    Marco Wienkoop (wm003/lubber)
  * @copyright (c) 2009, Marco Wienkoop (marco.wienkoop@lubber.de) http://www.lubber.de
  *
  * @class Ext.ux.menu.StoreMenu
  * @extends Ext.menu.Menu

* Donations are always welcome :)
* Any amount is greatly appreciated and will help to continue on developing ExtJS Widgets
*
* You can donate via PayPal to donate@lubber.de
*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
    
 * This Addon requires the ExtJS Library, which is distributed under the terms of the GPL v3 (from V2.1)
 * See http://extjs.com/license for more info


Revision History
v 0.2 [2009/03/04]
- added support for submenu ("menu" has to be delivered such as "handler")

v 0.1 [2009/03/03]
Initial release
*/

/*
   Modified by Joe Kuan - kuan.joe@gmail.com
   Ported to Ext 4 by Wojciech Naruniec - w.naruniec@gmail.com
   13/06/2012: Ported to Ext 4.1 by Laurent Chenet - laurent.chenet@gmail.com (Tested only with parameter 'url')
*/

Ext.namespace('Ext.ux.menu');
Ext.define('Ext.ux.menu.StoreMenu', {
    extend: 'Ext.menu.Menu',    
    initComponent: function(){
        this.initConfig();        
        // call parent
        this.callParent(arguments);        
        // Keep track of what menu items have been added
        this.storeMenus = [];        
        if (this.itemsOffset === undefined) {
            this.itemsOffset = 0;
        };        
        this.on('render', this.onMenuLoad, this);        
        if (!this.store) {
            //at least url/proxy or data need to be given in config when initiating this component
            this.store = new Ext.data.Store({
                proxy:{
                    type:'ajax',
                    url: this.url,
                    reader:{
                        type:'json'
                    }
                },
                fields: ['config'],                
                baseParams: this.baseParams
            });
        };        
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
    },    
    loadingText: Ext.LoadMask.prototype.msg || 'Loading...',
    loaded: false,    
    onMenuLoad: function(){
        if (!this.loaded || this.autoReload) {
            this.store.load();
            XXX = this.store;
        };
    },    
    updateMenuItems: function(loadedState, records){
        for (var i = 0; i < this.storeMenus.length; i++) {
            this.remove(this.storeMenus[i]);
        }
        this.storeMenus = [];        
        if (loadedState) {
            for (var i = 0, len = records.length; i < len; i++) {
                //create a real function if a handler or menu is given as a string (because a function cannot really be encoded in JSON
                if (records[i].raw.handler) {
                    eval("records[i].raw.handler = " + records[i].raw.handler);
                }
                else if (this.itemsHandler) {
                        records[i].raw.handler = this.itemsHandler;
                };            
                if (records[i].raw.menu) {
                    eval("records[i].raw.menu = " + records[i].raw.menu);
                };
                this.storeMenus.push(this.insert(this.itemsOffset + i, records[i].raw));
            }
        }
        else {
            this.storeMenus.push(this.insert(this.itemsOffset + i, '<span class="loading-indicator">' + this.loadingText + '</span>'));
        };    
        this.loaded = loadedState;    
    },    
    onBeforeLoad: function(store){
        this.updateMenuItems(false);
    },    
    onLoad: function(store, records){
        this.updateMenuItems(true, records);
    },
    setItemsHandler: function(handler){
        this.itemsHandler = handler;
    },    
    setOffset: function(offset){
        this.itemsOffset = offset;
    },    
    setAutoReload: function(autoReload){
        this.autoReload = autoReload;
    },    
    setBaseParam: function(param, value){
        this.store.setBaseParam(param, value);
    },    
    setStore: function(store){
        this.store = store;
    }
});