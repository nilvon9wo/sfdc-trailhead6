public with sharing class DB_AccountSelector extends fflib_SObjectSelector {

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Account.billingCity,
                Account.billingState,
                Account.createdDate,
                Account.name
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Account.sObjectType;
    }

	public List<Account> selectById(Set<Id> idSet) {
        return (List<Account>) selectSObjectsById(idSet);
    }
    
    public List<Account> selectByName(String name) {
        return (List<Account>) Database.query(
                newQueryFactory()
                .setCondition('name = :name')
                .toSOQL()
        );
    }
}