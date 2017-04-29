public with sharing class UC_ContactAuraCtrl {
	DB_AccountSelector accountSelector;
	DB_ContactSelector contactSelector;
	DB_OpportunityContactRoleSelector opportunityContactRoleSelector;
	DB_GenericDml genericDml;
	
	public UC_ContactAuraCtrl(
				DB_AccountSelector accountSelector,	 
				DB_ContactSelector contactSelector,
				DB_OpportunityContactRoleSelector opportunityContactRoleSelector, 
				DB_GenericDml genericDml
			){
		this.accountSelector = accountSelector;
		this.contactSelector = contactSelector;
		this.opportunityContactRoleSelector = opportunityContactRoleSelector;
		this.genericDml = genericDml;
	}
	
	public UC_ContactAuraCtrl(){
		this(
			new DB_AccountSelector(), 
			new DB_ContactSelector(), 
			new DB_OpportunityContactRoleSelector(), 
			new DB_GenericDml()
		);
	}
	
	// TODO: Move this to Account Controller
    @AuraEnabled
    public static Account getAccount(Id accountId) {
    	return (new UC_ContactAuraCtrl()).selectAccount(accountId);
    }
    
    @AuraEnabled
    public static Contact saveContactWithAccount(Contact contact, Id accountId) {
    	contact.AccountId = accountId;
    	return (new UC_ContactAuraCtrl()).save(contact);
    }

	@AuraEnabled
    public static List<Map<String, Object>> findAccountAges(List<String> emailList) {
    	return (new UC_ContactAuraCtrl()).selectAccountAges(emailList);
    }
    
    @AuraEnabled
    public static List<Map<String, Object>> findOpportunityCloseDateTime(List<String> emailList) {
    	return (new UC_ContactAuraCtrl()).selectOpportunityCloseDateTime(emailList);
    }

    @testVisible 
    private Account selectAccount(Id accountId) {
    	return this.accountSelector.selectById(new Set<Id>{accountId})[0]; 
    }
    
    @testVisible
    private Contact save(Contact contact) {
    	this.genericDml.doUpsert(new List<Contact>{contact});
    	return contact;
    }
    
    @testVisible
    private List<Map<String, Object>> selectAccountAges(List<String> emailList) {
    	List<Map<String,Object>> accountAgeByEmailMap = new List<Map<String,Object>>(); 
    	for (Contact contact : this.contactSelector.selectWithAccountByEmailList(emailList)) {
    		accountAgeByEmailMap.add(new Map<String, Object>{
    			'name' => contact.Account.name,
    			'age' => Date.valueOf(contact.Account.CreatedDate).daysBetween(System.Date.today())
    		}); 
    	}
    	return accountAgeByEmailMap;
    }

    @testVisible
    private List<Map<String, Object>> selectOpportunityCloseDateTime(List<String> emailList) {
    	List<Map<String,Object>> opportunityCloseDateTimeByEmailMap = new List<Map<String,Object>>();
    	for (OpportunityContactRole contactRole : this.opportunityContactRoleSelector.selectByEmailList(emailList)) {
    		opportunityCloseDateTimeByEmailMap.add(new Map<String, Object>{
    			'name' => contactRole.Opportunity.name, 
    			'closesIn' => System.Date.today().daysBetween(contactRole.Opportunity.closeDate)
    		});
    	} 
    	return opportunityCloseDateTimeByEmailMap;
    }
    
}