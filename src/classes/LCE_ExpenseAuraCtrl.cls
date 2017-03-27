public with sharing class LCE_ExpenseAuraCtrl {
	DB_AccountSelector accountSelector; 
	DB_ExpenseSelector expenseSelector; 
	DB_GenericDml genericDml;
	
	LCE_ExpenseAuraCtrl(DB_AccountSelector accountSelector, DB_ExpenseSelector expenseSelector, DB_GenericDml genericDml) {
		this.accountSelector = accountSelector;
		this.expenseSelector = expenseSelector;
		this.genericDml = genericDml;
	}
	
	LCE_ExpenseAuraCtrl() {
		this(new DB_AccountSelector(), new DB_ExpenseSelector(), new DB_GenericDml());
	}
	
	@AuraEnabled
	public static List<Expense__c> getExpensesFromServer() {
		return (new LCE_ExpenseAuraCtrl()).selecExpenses();
	}
    
    @testVisible
    private List<Expense__c> selecExpenses() {
    	return this.expenseSelector.selectAll();
    }
    
    @AuraEnabled
    public static Expense__C saveExpense(Expense__c expense, String clientName) {
    	return (new LCE_ExpenseAuraCtrl()).doUpsert(expense, clientName); 
    }
    
    @testVisible
    public Expense__C doUpsert(Expense__c expense, String clientName) {
    	Id accountId;
    	if (!String.isBlank(clientName)) {
    		List<Account> clientAccountList = accountSelector.selectByName(clientName);
    		if (clientAccountList.size() > 0) {
    			accountId = clientAccountList[0].id;
    		} else {
    			Account account = new Account(name = clientName);
    			genericDml.doInsert(new List<Account>{account});
    			accountId = account.id;
    		}
    	}
    	
    	expense.client__c = accountId;  
    	Database.UpsertResult[] resultList= this.genericDml.doUpsert(new List<Expense__c>{expense});
    	return expenseSelector.selectById(new Set<Id>{expense.id})[0];
    }
}