({
    createExpense: function(component, expense) {
	        this.upsertExpense(component, expense, function saveResultHandler(response){
            var returnValue = response.getReturnValue();
            var expenseList = component.get('v.expenseList');
            expenseList.push(returnValue);
            component.set('v.expenseList', expenseList);
            this.updateTotal(component);
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