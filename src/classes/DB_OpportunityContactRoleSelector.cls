public class DB_OpportunityContactRoleSelector extends fflib_SObjectSelector {
	DB_OpportunitySelector opportunitySelector;
	
	public DB_OpportunityContactRoleSelector(DB_OpportunitySelector accountSelector) {
		this.opportunitySelector = opportunitySelector;
	}

	public DB_OpportunityContactRoleSelector() {
		this(new DB_OpportunitySelector());
	}

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
        };
    }

    public Schema.SObjectType getSObjectType() {
        return OpportunityContactRole.sObjectType;
    }

    public List<OpportunityContactRole> selectByEmailList(List<String> emailList) {
    	fflib_QueryFactory queryFactory = newQueryFactory();
    	this.opportunitySelector.configureQueryFactoryFields(queryFactory, 'Opportunity');  
    	return (List<OpportunityContactRole>) Database.query(
                queryFactory
                .setCondition('isPrimary=true AND Contact.email IN :emailList')
                .toSOQL()
        );
    }    
}