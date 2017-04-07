public class DB_ContactSelector extends fflib_SObjectSelector {
	DB_AccountSelector accountSelector;
	
	public DB_ContactSelector(DB_AccountSelector accountSelector) {
		this.accountSelector = accountSelector;
	}

	public DB_ContactSelector() {
		this(new DB_AccountSelector());
	}

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Contact.Account.name, 
                Contact.Account.createdDate, 
                Contact.id,
                Contact.email, 
                Contact.name, 
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

    public List<Contact> selectWithAccountByEmailList(List<String> emailList) {
    	fflib_QueryFactory queryFactory = newQueryFactory();
    	accountSelector.configureQueryFactoryFields(queryFactory, 'Account');
    	return (List<Contact>) Database.query(
                queryFactory
                .setCondition('email IN :emailList')
                .toSOQL()
        );
    }    
}