({
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
    
    updateTotal: function(component) {
        var expenseList = component.get('v.expenseList');
        var totalExpenses = 0;
        expenseList.forEach(function(expense){
            totalExpenses += expense.Amount__c;
        });
        component.set('v.totalExpenses', totalExpenses);
        component.set('v.numberOfExpenses', expenseList.length);
    }
})