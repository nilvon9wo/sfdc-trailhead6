public class DB_ExpenseSelector extends fflib_SObjectSelector {

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Expense__c.id, 
                Expense__c.name, 
                Expense__c.description__c, 
                Expense__c.amount__c, 
                Expense__c.client__c, 
                Expense__c.client_name__c, 
                Expense__c.date_time__c, 
                Expense__c.reimbursed__c,
                Expense__c.createdDate
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Expense__c.sObjectType;
    }
    
    public List<Expense__c> selectById(Set<Id> idSet) {
        return (List<Expense__c>) selectSObjectsById(idSet);
    }

    public List<Expense__c> selectAll() {
        return (List<Expense__c>) Database.query(
                newQueryFactory()
                        .toSOQL()
        );
    }
    
}