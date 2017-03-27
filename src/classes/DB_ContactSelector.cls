public class DB_ContactSelector extends fflib_SObjectSelector {

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Contact.id, 
                Contact.name, 
                Contact.email, 
                Contact.level__c,
                Contact.mailingStreet, 
                Contact.phone
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Contact.sObjectType;
    }

    public List<Contact> selectAll() {
        return (List<Contact>) Database.query(
                newQueryFactory()
                        .toSOQL()
        );
    }
    
    public List<Contact> selectByLevel(String level) {
        return (List<Contact>) Database.query(
                newQueryFactory()
                .setCondition('level__c = :level')
                .toSOQL()
        );
    }    
    
}