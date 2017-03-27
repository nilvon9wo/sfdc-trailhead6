public with sharing class LCE_ExpenseAuraCtrl {
	DB_ExpenseSelector expenseSelector;
	
	LCE_ExpenseAuraCtrl(DB_ExpenseSelector expenseSelector) {
		this.expenseSelector = expenseSelector;
	}
	
	LCE_ExpenseAuraCtrl() {
		this(new DB_ExpenseSelector());
	}
	
	@AuraEnabled
	public static List<Expense__c> getExpensesFromServer() {
		return (new LCE_ExpenseAuraCtrl()).selecExpenses();
	}
    
    @testVisible
    private List<Expense__c> selecExpenses() {
    	return this.expenseSelector.selectAll();
    }
}