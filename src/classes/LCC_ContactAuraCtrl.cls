public class LCC_ContactAuraCtrl {
	DB_ContactSelector contactSelector;
	
	public LCC_ContactAuraCtrl(DB_ContactSelector contactSelector){
		this.contactSelector = contactSelector;
	}

	public LCC_ContactAuraCtrl(){
		this(new DB_ContactSelector());
	}
	
	@AuraEnabled
	public static List<Contact> getContacts() {
		return (new LCC_ContactAuraCtrl()).selectContactList();
	}
	
	public List<Contact> selectContactList() {
		return this.contactSelector.selectAll();
	}
	
	@AuraEnabled
	public static List<Contact> getPrimary() {
		 return (new LCC_ContactAuraCtrl()).selectPrimary();
	}

	public List<Contact> selectPrimary() {
		return this.contactSelector.selectByLevel('Primary');
	}
    
}