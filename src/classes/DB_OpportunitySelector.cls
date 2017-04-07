public class DB_OpportunitySelector extends fflib_SObjectSelector { 

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Opportunity.name,
                Opportunity.closeDate
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Opportunity.sObjectType;
    }
}