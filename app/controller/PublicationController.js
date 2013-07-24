Ext.define('JavisERP.controller.PublicationController',{
    extend: 'Ext.app.Controller',
    alias: 'controller.publicationcontroller',

    models: [
        'Publication',
        'PostalCode'
    ],
    stores: [
        'PublicationStore',
        'PostalCode'
    ],
    views: [
        'PublicationWindow',
        'PublicationGrid'
    ],

    refs: [
        {
            ref: 'postalCodeList',
            selector: 'combobox[cls=postalCodeList]'
        },
        {
            ref: 'publicationForm',
            selector: 'form[cls=publicationform]'
        },
        {
            ref: 'publicationWindow',
            selector: 'publicationwindow'
        },
        {
            ref: 'publicationGrid',
            selector: 'publicationgrid'
        }
    ],

    onPublicationActionClick: function(grid,record,action,idx,col,e,target) {
        var doAction = action.split(" ",1);
        switch(doAction[0]){
            case 'edit_action':
                this.editPublication(record);
                break;
            case 'delete_action':
                this.deletePublication(record,grid);
                break;
        }
    },

    onNewPublicationClick: function(button, e, options) {
        var publicationWindow = new JavisERP.view.PublicationWindow();
        publicationWindow.show();
    },

    onSavePublicationClick: function(button, e, options) {
        var fields = this.getPublicationForm().getForm().getValues(false,false,false,true);
        publication = new JavisERP.model.Publication();
        for(var key in fields){
            publication.set(key,fields[key]);
        }
        var pWindow = this.getPublicationWindow();
        var pStore = this.getPublicationStoreStore();
        publication.save({
            success: function(record, operation){
            	pWindow.close();
              pStore.reload();
              Ext.Msg.alert('Success','Publication saved successfully!');
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

    onWindowClose: function(panel, eOpts){
        this.getPublicationGrid().getStore().reload();
    },

    init: function(application) {
        var me = this;
        this.control({
            "publicationgrid rowactions": {
                action: this.onPublicationActionClick
            },
            "publicationgrid toolbar button[cls=newpublication]": {
                click: this.onNewPublicationClick
            },
            "publicationwindow toolbar button[cls=publicationsavebutton]": {
                click: this.onSavePublicationClick
            },
            "#pubwindowtoolbar > #cancelbutton": {
                click: function(){ 
                	me.getPublicationWindow().close();
                }
            }
        });
    },

    editPublication: function(record) {
        var publicationWindow = new JavisERP.view.PublicationWindow();
        var publicationForm = this.getPublicationForm();
        publicationWindow.show();
        this.getPublicationModel().load(record.data.id,{
            success: function(model){
                publicationForm.loadRecord(model);
                publicationForm.getForm().findField('territory_id').setValue(new JavisERP.model.Territory(model.raw.territory));
                publicationForm.getForm().findField('contentcoord_id').setValue(new JavisERP.model.User(model.raw.contentcoord) );
                var postalcodes = publicationForm.getForm().findField('postal_codes');
                var valArray = [];
                Ext.each(model.raw.postal_codes, function(arr,index,postalcodeItself){
                    valArray.push(arr.iso_code);
                });
                postalcodes.setValue(valArray);
            }
        });


    },

    deletePublication: function(record,grid) {
        Ext.Msg.show({
            title: 'Delete Publication?',
            msg: 'You are about to delete this publication.  Deleting this publication will also delete all advertisements associated with this publication.  Proceed with caution.  Would you like to proceed?',
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
                                alert("Could not delete publication!");
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