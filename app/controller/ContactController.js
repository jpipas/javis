Ext.define('JavisERP.controller.ContactController', {
    extend: 'Ext.app.Controller',
    
    client: {
		id: '',
		name: ''
	},

    views: [
        'ContactGrid',
        'ContactWindow'
    ],

    models: [
        'Contact',
        'Role'
    ],

    stores: [
    	'ContactStore'
    ],

    refs: [
        {
            ref: 'contactGrid',
            selector: 'contactgrid'
        },
        {
            ref: 'contactForm',
            selector: 'contactwindow form[cls=contactForm]'
        },
        {
            ref: 'contactWindow',
            selector: '#contactwindow'
        },
        {
            ref: 'contentCards',
            selector: 'contentCards'
        },
        {
            ref: 'clientForm',
            selector: 'form[cls=clientform]'
        }
    ],
    onContactActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editContact(record);
                break;
            case 'delete_action':
                this.deleteContact(record,grid);
                break;
        }
    },
    
    onNewContactClick: function(act_type) {
        var contactWindow = new JavisERP.view.ContactWindow();
        contactWindow.show();
        var contactForm = this.getContactForm().getForm();
        if (this.getContentCards().getLayout().getActiveItem().getXType() == 'clientrecord'){
        	contactForm.findField('client_id').setValue(new JavisERP.model.Client({ id: this.getClientId(), company_name: this.getClientName() })).setReadOnly(true);
        }
    },
    
    onContactSaveButtonClick: function(button, options, e){
    	var fields = this.getContactForm().getForm().getValues(false,false,false,true);
        //console.log(fields);
        var contact = new JavisERP.model.Contact();
        for(var key in fields){
            contact.set(key,fields[key]);
        }
        var cWindow = this.getContactWindow();
        var cGrid = this.getContactGrid();
        var cc = this.getContentCards();
        var me = this;
        //console.log(me.contract);
        contact.save({
        		success: function(record, operation){
                cGrid.getStore().reload();
               	//aGrid.getStore().clearFilter(true);
                //console.log(record);
                // if looking at a client, filter grid by the client
                if (cc.getLayout().getActiveItem().getXType() == 'clientrecord'){
                	cGrid.getStore().clearFilter(true);
                	cGrid.getStore().filter("client_id", me.getClientId());
                } else {
                	cGrid.getStore().clearFilter();
                }
                // if adding/editing a contract ....
                //aGrid.getStore().filter("contract_id",record.data.contract_id);
                cWindow.close();
                Ext.Msg.alert('Success','Contact saved successfully!');
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

    init: function(application) {
        var me = this;
        me.application.on({
            setClientFields: me.setClientFields,
            scope: me
        });

        this.client.id = null;
        this.client.name = null;
        me.control({
            "contactgrid rowactions": {
                action: me.onContactActionClick
            },
            "contactgrid toolbar button[itemId=newcontact]": {
                click: function(button, options, e){
                		this.onNewContactClick();
                	}
            },
            "#contactwindowtoolbar > #savebutton": {
                click: this.onContactSaveButtonClick
            }
        });

    },
    
    setClientFields: function(clientId, clientName) {
        this.client.id = clientId;
        this.client.name = clientName;
    },

    getClientId: function() {
        return this.getClientForm().getForm().findField('id').getValue();
    },

    getClientName: function() {
        return this.getClientForm().getForm().findField('company_name').getValue();
    },

    editContact: function(record){
        var contactWindow = new JavisERP.view.ContactWindow();
        var cForm = this.getContactForm();
        var cc = this.getContentCards();
        this.getContactModel().load(record.data.id, {
            success: function(record,operation){
                cForm.getForm().loadRecord(record);
                var pubs = [];
                cForm.getForm().findField('client_id').setValue(new JavisERP.model.Client({ id : record.data.client_id, company_name: record.data.client_company_name }));
                cForm.getForm().findField('role_id').setValue(new JavisERP.model.Role({ id: record.data.role_id, description: record.data.role_name }));
                if (cc.getLayout().getActiveItem().getXType() == 'clientrecord'){
		        	cForm.getForm().findField('client_id').setReadOnly(true);
		        }
            }
        });
        contactWindow.show();
        /*
        var myMask = new Ext.LoadMask(this.getContactWindow(),{msg:"Loading..."});
        myMask.show();
        Ext.defer(function() {
            myMask.hide();
            contactWindow.show();
        },500);
        */
    },

    deleteContact: function(record,grid){
        Ext.Msg.show({
            title: 'Delete Contact?',
            msg: 'You are about to delete this contact. Would you like to proceed?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId,text,opt){
                switch(buttonId){
                    case 'ok':
                        record.destroy({
                            success: function(){
                                grid.getStore().reload();
                            },
                            failure: function(){
                                alert("Could not delete contact!");
                            }
                        });
                        break;
                    case 'cancel':
                        break;
                }
            }
        });
    }
});
