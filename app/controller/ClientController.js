Ext.define('JavisERP.controller.ClientController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.clientController',

    id: 'clientcontroller',

	client: {
		id: null,
		name: null
	},

    views: [
        'ClientWindow',
        'ClientRecord'
    ],

    stores: [
        'ClientStore',
        'State',
        'TerritoryStore',
        'CustomerStage',
        'PostalCode',
        'ContactRoleStore'
    ],

    models: [
        'Client',
        'Contact',
        'Contract'
    ],

    refs: [
        {
            ref: 'clientGrid',
            selector: 'clientgrid'
        },
        {
            ref: 'clientForm',
            selector: 'clientwindow form[cls=clientform]'
        },
        {
            ref: 'clientWindow',
            selector: 'clientwindow'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
            ref: 'clientRecord',
            selector: 'clientrecord'
        },
        {
            ref: 'clientRecordForm',
            selector: 'clientrecord form[cls=clientform]'
        },
        {
            ref: 'contactWindow',
            selector: 'contactwindow'
        },
        {
            ref: 'contactGrid',
            selector: 'contactgrid'
        },
        {
            ref: 'publicationGrid',
            selector: 'publicationgrid'
        },
        {
            ref: 'clientPortlet',
            selector: 'clientportlet'
        },
        {
            ref: 'contractGrid',
            selector: '#clientcontractgrid'
        },
        {
            ref: 'advertisementGrid',
            selector: '#clientadgrid'
        },
        {
            ref: 'activityGrid',
            selector: '#clientactivitygrid'
        },
        {
            ref: 'paymentGrid',
            selector: '#paymentgrid'
        },
        {
            ref: 'editButton',
            selector: 'button[cls=edit_button]'
        },
        {
            ref: 'contactForm',
            selector: 'form[cls=contactform]'
        },
        {
        	ref: 'clientTabs',
        	selector: '#clienttabs'
        },
        {
        	ref: 'clientGeneralTab',
        	selector: '#clientgeneraltab'
        },
        {
        	ref: 'clientSalesTab',
        	selector: '#clientsalestab'
        }
    ],

    onActionColumnClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editClient(record);
                break;
            case 'delete_action':
                this.deleteClient(record,grid);
                break;
            case 'view_action':
                this.changeClientRecord(grid,col,idx,record);
                break;
        }
        //this.application.fireEvent('clientRecordChange',grid,col,row);
    },

    onSubTabChange: function(panel,newCard,oldCard,e){
        switch(newCard.itemId){
            case 'clientadgrid':
            	// clear any potential search values
            	this.getAdvertisementGrid().getStore().getProxy().extraParams = {};
            	// reset the client filter
                this.getAdvertisementGrid().getStore().clearFilter(true);
                this.getAdvertisementGrid().getStore().filter("client_id", this.client.id);
                break;
            case 'clientcontractgrid':
            	this.getContractGrid().getStore().getProxy().extraParams = {};
                this.getContractGrid().getStore().clearFilter(true);
                this.getContractGrid().getStore().filter("client_id",this.client.id);
                break;
            case 'PublicationGrid':
            	this.getPublicationGrid().getStore().getProxy().extraParams = {};
                this.getPublicationGrid().getStore().clearFilter(true);
                this.getPublicationGrid().getStore().filter("client_id",this.client.id);
                break;
            case 'paymentgrid':
            	this.getPaymentGrid().getStore().getProxy().extraParams = {};
                this.getPaymentGrid().getStore().clearFilter(true);
                this.getPaymentGrid().getStore().filter("client_id",this.client.id);
                break;
        	case 'ContactGrid':
        		this.getContactGrid().getStore().getProxy().extraParams = {};
        		this.getContactGrid().getStore().clearFilter(true);
                this.getContactGrid().getStore().filter("client_id", this.client.id);
        		break;
            case 'clientactivitygrid':
            	this.getActivityGrid().getStore().getProxy().extraParams = {};
                this.getActivityGrid().getStore().clearFilter(true);
                this.getActivityGrid().getStore().filter("client_id", this.client.id);
                break;
        }
    },
    
    onTabsChange: function(){
    	var aTab = this.getClientTabs().getActiveTab();
    	var gTab = this.getClientGeneralTab();
    	var sTab = this.getClientSalesTab();
    	if (aTab.contains(gTab, true)){
    		this.onSubTabChange(gTab, gTab.getActiveTab());
    	} else if (aTab.contains(sTab, true)){
    		this.onSubTabChange(sTab, sTab.getActiveTab());
    	}
    },

    onNewButtonClick: function(button, e, options){
        var clientWindow = new JavisERP.view.ClientWindow();
        var client = new JavisERP.model.Client({stage: 'CUSTOMER'});
        var conGrid = this.getContactGrid();
        client.save({
            scope: this,
            callback: function(record,operation){
                if(operation.success){
                    // choke
                    clientWindow.getComponent('clientForm').getForm().setValues({id: record.data.id, stage: record.data.stage});
                    clientWindow.getComponent('clientForm').getForm().findField('territory_id').setValue(new JavisERP.model.Territory(record.data.territory));
                    clientWindow.getComponent('clientForm').getForm().findField('salesrep_id').setValue(new JavisERP.model.User(record.data.salesrep));
                    clientWindow.show();
                }
            }
        });
    },

    onEditButtonClick: function(button, e, options){
        var clientWindow = new JavisERP.view.ClientWindow();
        var clientForm = this.getClientForm();
        this.getClientModel().load(this.client.id,{
            success: function(model){
                clientForm.loadRecord(model);
                clientForm.getForm().findField('territory_id').setValue(new JavisERP.model.Territory(model.raw.territory));
                clientForm.getForm().findField('state_id').setValue(new JavisERP.model.State(model.raw.state));
                clientForm.getForm().findField('postal_code_iso').setValue(new JavisERP.model.PostalCode(model.raw.postal_code));
                clientForm.getForm().findField('salesrep_id').setValue(new JavisERP.model.User(model.raw.salesrep) );
            }
        });
        var myMask = new Ext.LoadMask(this.getClientRecord(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            clientWindow.show();
        },500);
        this.getContactGrid().getStore().clearFilter(true);
        this.getContactGrid().getStore().filter("client_id",this.client.id);
    },

    onSaveClientButtonClick: function(button, e, options){
    	console.log('here');
        var fields = this.getClientForm().getForm().getValues(false,false,false,true);
        var client = new JavisERP.model.Client({id: fields['id']});
        for(var key in fields){
            client.set(key,fields[key]);
        }

        var cWindow = this.getClientWindow();
        var cRecordForm = this.getClientRecord();
        client.save({
            scope: this,
            success: function(record, operation){
            	var refreshedClient = new JavisERP.model.Client(record.data);
				cRecordForm.getForm().loadRecord(refreshedClient);
				this.client.id = record.data.id;
				this.client.name = record.data.company_name;
				clientId = record.data.id;
				
				this.getContactGrid().getStore().clearFilter(true);
				this.getContactGrid().getStore().filter("client_id", clientId);
				
				this.getActivityGrid().getStore().clearFilter(true);
				this.getActivityGrid().getStore().filter("client_id", clientId);
				
				this.getPublicationGrid().getStore().clearFilter(true);
				this.getPublicationGrid().getStore().filter("client_id",clientId);
				
				this.getPaymentGrid().getStore().clearFilter(true);
				this.getPaymentGrid().getStore().filter("client_id",clientId);
				
				this.getContractGrid().getStore().clearFilter(true);
				this.getContractGrid().getStore().filter("client_id",clientId);
				
				this.getAdvertisementGrid().getStore().clearFilter(true);
				this.getAdvertisementGrid().getStore().filter("client_id", clientId);
				
				cWindow.close();
				Ext.Msg.alert('Success','Client saved successfully!');
            },
            failure: function(record, operation){
            	Ext.MessageBox.show({
			           title: 'Failure',
			           msg: "<p>The following errors were encountered:</p><ul><li>"+operation.request.scope.reader.jsonData.error.join("</li><li>")+'</li></ul>',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
            }
        });

    },

    onListViewClick: function(button, e, options){
    	this.client.id = null;
    	this.client.name = null;
    	this.application.fireEvent("setClientFields",null,null);
        this.application.fireEvent('navigationChange',button.itemId);
    },

    deleteClient: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Client?',
            msg: 'You are about to delete this client. Are you sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button, text, opts){
                switch(button){
                    case 'yes':
                        record.destroy({
                            success: function(){
                                grid.getStore().reload();
                            },
                            failure: function(){
                                alert("Could not delete client!");
                            }
                        });
                        break;
                    case 'no':
                        //this.close();
                        break;
                }
            }
        });
    },

    init: function(application) {
        var me = this;

        me.application.on({
            clientRecordChange: me.changeClientRecord,
            scope: me
        });

        me.application.on({
            createClientRecord: me.onNewButtonClick,
            scope: me
        });

        this.control({
            "clientgrid rowactions, clientportlet rowactions": {
                action: this.onActionColumnClick
            },
            "recordnav[cls=clientrecordnav] button[cls=edit_button]": {
                click: this.onEditButtonClick
            },
            "recordnav[cls=clientrecordnav] button[cls=listview_button]": {
                click: this.onListViewClick
            },
            "recordnav[cls=clientrecordnav] button[cls=new_button]": {
                click: this.onNewButtonClick
            },
            "button[cls=clientsavebutton]": {
                click: this.onSaveClientButtonClick
            },
            "tabpanel[itemId=clienttabs]": {
                tabchange: this.onTabsChange
            },
            "tabpanel[itemId=clientgeneraltab]": {
                tabchange: this.onSubTabChange
            },
            "tabpanel[itemId=clientsalestab]": {
                tabchange: this.onSubTabChange
            }
        });
    },

    changeClientRecord: function(grid, col, row, record) {
        this.getContentCards().getLayout().setActiveItem('ClientRecord');
        var form = this.getClientRecord().getForm();
        var crec = this.getClientGrid().getStore().getAt(row);
        form.loadRecord(this.getClientGrid().getStore().getAt(row));

        this.client.id = this.getClientGrid().getStore().getAt(row).data.id;
        this.client.name = this.getClientGrid().getStore().getAt(row).data.company_name;
        this.application.fireEvent("setClientFields",this.client.id,this.client.name);
        
        // only "refresh" the grid for the tab we are on instead of all of them
        this.onTabsChange();
    }

});
