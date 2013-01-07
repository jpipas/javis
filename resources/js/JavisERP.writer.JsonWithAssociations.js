Ext.data.Model.prototype.setAssociatedData = function(fieldName, value) {
    var associatedStore;
    var storeName;
    var associations = this.associations.items;
    for (var i=0; i<associations.length; i++){
        var association = associations[i];
        storeName = association.storeName;

        if (association.name==fieldName){

            associatedStore = this[storeName];
            if (associatedStore == null){
                this[storeName] = associatedStore =
                    Ext.create('Ext.data.Store', {
                    model: association.model
                });
            }
            break;
        }
    }

    if (associatedStore){
        associatedStore.add(value);
        this[storeName] = associatedStore;
    }
};

Ext.define('custom.writer.Json', {
extend: 'Ext.data.writer.Json',
    getRecordData: function(record) {
        Ext.apply(record.data, record.getAssociatedData());
        return record.data;
    }
});
