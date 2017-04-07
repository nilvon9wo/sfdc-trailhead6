({
    createExpense: function(component, event, helper) {
        var amountField = component.find('expense-amount');
        var amountValue = amountField.get('v.value');
        var errors;
        if (!helper.isValidAmount(amountValue)){
            errors = [{message: "Enter an expense amount"}];
        } else {
            var newExpense = component.get('v.newExpense');
            helper.createExpense(component, newExpense);
        }
        amountField.set('v.errors', errors);
    },
    
	doInit : function(component, event, helper) {
		helper.getExpenses(component);
	},
    
    updateEvent: function(component, event, helper) {
		helper.upsertExpense(component, event.getParam('expense'));
	}
})