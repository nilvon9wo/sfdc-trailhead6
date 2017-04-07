public with sharing class UC_LtngForOutlookAuraCtl {
	DB_ContactSelector contactSelector;
	
	public UC_LtngForOutlookAuraCtl(DB_ContactSelector contactSelector){
		this.contactSelector = contactSelector;
	}
	
	public UC_LtngForOutlookAuraCtl(){
		this(new DB_ContactSelector());
	}
	
    @AuraEnabled
    public static List<Map<String, Object>> findAccountAges(List<String> emailList) {
    	return (new UC_LtngForOutlookAuraCtl()).selectAccountAges(emailList);
    }
    
    @testVisible
    private List<Map<String, Object>> selectAccountAges(List<String> emailList) {
    	List<Map<String,Object>> returnAccountAgeByEmailMap = new List<Map<String,Object>>(); 
    	for (Contact contact : this.contactSelector.selectByEmailList(emailList)) {
    		returnAccountAgeByEmailMap.add(new Map<String, Object>{
    			'name' => contact.Account.Name,
    			'age' => Date.valueOf(contact.Account.CreatedDate).daysBetween(System.Date.today())
    		}); 
    	}
    	return returnAccountAgeByEmailMap;
    }
    
    @AuraEnabled
    public static List<Map<String, Object>> findOpportunityCloseDateTime(List<String> emailList) {
    	return (new UC_LtngForOutlookAuraCtl()).selectOpportunityCloseDateTime(emailList);
    }

    @testVisible
    private List<Map<String, Object>> selectOpportunityCloseDateTime(List<String> emailList) {
    	List<Map<String,Object>> OpportunityCloseDateTimeByEmailMap = new List<Map<String,Object>>();
    	/* 
    	for (OpportunityContactRole contactRole : this.opportunityContactRoleSelector.selectByEmailList(emailList)) {
    		// TODO: Lightning Components Developer Guide page 116
    	}
    	*/
    	return OpportunityCloseDateTimeByEmailMap;
    }

}