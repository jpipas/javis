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
            selector: 'comboboxselect[cls=postalCodeList]'
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
        me.publication = new JavisERP.model.Publication({id: fields['id']});
        for(var key in fields){
            me.publication.set(key,fields[key]);
        }

        var postalcodes = [];
        var recs = this.getPostalCodeList().getValueRecords();
        for(var key1 in recs){
            var postalcode = new JavisERP.model.PostalCode();
            postalcode.set("id",recs[key1].data.id);
            postalcode.set("iso_code",recs[key1].data.iso_code);
            postalcodes.push(postalcode);
        }

        me.publication.setAssociatedData("postalcodes",postalcodes);
        me.publication.getProxy().setWriter(new custom.writer.Json({writeAllFields:true}));

        me.publication.save({
            callback: function(record,operation){
                if(operation.wasSuccessful){
                    me.getPublicationWindow().close();
                    Ext.Msg.alert('Success','Publication saved successfully!');
                } else {
                    Ext.Msg.alert('Failure','Something went wrong!');
                }
            }
        });
    },

    onWindowClose: function(panel, eOpts){
        this.getPublicationGrid().getStore().reload();
    },

    init: function(application) {
        me = this;
        this.control({
            "publicationwindow": {
                close: this.onWindowClose
            },
            "publicationgrid rowactions": {
                action: this.onPublicationActionClick
            },
            "publicationgrid toolbar button[cls=newpublication]": {
                click: this.onNewPublicationClick
            },
            "publicationwindow toolbar button[cls=publicationsavebutton]": {
                click: this.onSavePublicationClick
            }
        });
    },

    editPublication: function(record) {
        me.publicationWindow = new JavisERP.view.PublicationWindow();
        var publicationForm = this.getPublicationForm();
        me.publicationWindow.show();
        this.getPublicationModel().load(record.data.id,{
            success: function(model){
                publicationForm.loadRecord(model);
                publicationForm.getForm().findField('territory_id').setValue(new JavisERP.model.Territory(model.raw.territory));
                me.postalcodes = publicationForm.getForm().findField('postal_codes');
                var valArray = [];
                Ext.each(model.raw.postal_code, function(arr,index,postalcodeItself){
                    valArray.push(arr.id);
                });
                me.postalcodes.setValue(valArray);
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