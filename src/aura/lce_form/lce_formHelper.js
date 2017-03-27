({
    createExpense: function(component, expense) {
	        this.upsertExpense(component, expense, function saveResultHandler(response){
            var returnValue = response.getReturnValue();
            var expenseList = component.get('v.expenseList');
            expenseList.push(returnValue);
            component.set('v.expenseList', expenseList);
            this.updateTotal(component);
            this.resetForm(component);
        });
    },
    
	getExpenses : function(component) {
		var action = component.get('c.getExpensesFromServer');
        action.setCallback(this, function(response){
        	this.expenseHandler(component, response);
        });
        $A.enqueueAction(action);
	},
 
 	expenseHandler: function(component, response) { 
        var state = response.getState();
        if (component.isValid() && state === 'SUCCESS') {
            component.set('v.expenseList', response.getReturnValue());
            this.updateTotal(component);
        }
	},
    
    isValidAmount: function (amountValue) {
        return (!(isNaN(amountValue) || amountValue === ''));
    },
    
    resetForm: function(component) {
        component.set('v.clientName', '');
        component.set('v.newExpense', {
            sobjectType: 'Expense__c',
            Description__c: '',
            Amount__c: 0,
            Date_Time__c: '',
            Reimbursed__c: false
        });
    },
    
    updateTotal: function(component) {
        var expenseList = component.get('v.expenseList');
        var totalExpenses = 0;
        expenseList.forEach(function(expense){
            totalExpenses += expense.Amount__c;
        });
        component.set('v.totalExpenses', totalExpenses);
        component.set('v.numberOfExpenses', expenseList.length);
    },
    
    upsertExpense: function(component, expense, callback) {
        var action = component.get('c.saveExpense');
        action.setParams({
            clientName : component.get('v.clientName'),
            expense: expense
        });
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    }
})