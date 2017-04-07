({
	update : function(component, event, helper) {
        component.getEvent('updateExpense')
        	.setParams({
                expense: component.get('v.expense')
            })
        	.fire();
	}
})