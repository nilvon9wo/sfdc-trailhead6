({
	doInit : function(component, event, helper) {
		var action = component.get('c.getAccount');
		action.setParams({
			accountId: component.get('v.recordId');
		});
		action.setCallback(this, function(response) {
			helper.handleGetAccountResponse(component, response);
		});
		$A.enqueueAction(action);
	},
	
	handleSaveContact: function(component, event, helper) {
		if (helper.validateContactForm(component)) {
			component.set('v.hasErrors', false);
			
			var saveContactAction = component.get('c.saveContactWithAccount');
			saveContactAction.setParams({
				contact: component.get('v.newContact');
				accountId: component.get('v.recordId');
			});
			saveContactAction.setCallback(this, function(response) {
				helper.handleContactSaveResponse(component, response);
			})
			$A.enqueueAction(action);
		} else {
			component.set('v.hasErrors', true);
		}
	},
	
	handleCancel: function(component, event, helper) {
		$A.get('e.force:closeQuickAction').fire();
	}
	
})