({
	handleGetAccountResponse: function (component, response) {
		var state = response.getState();
		if (component.isValid() && state === 'SUCCESS') {
			component.set('v.account', response.getReturnValue());
		} else {
			console.error('Problem getting account, response state: ' + state);
		}
	},
	
	handleContactSaveResponse: function (component, response) {
		var state = response.getState();
		if (component.isValid() && state === 'SUCCESS') {
			var resultsToast = $A.get('e.force:showToast');
			resultsToast.setParams({
				title: 'Contact Saved',
				message: 'The new contact was created.'
			});
			resultsToast.fire();
			
			$A.get('e.force:closeQuickAction').fire();
			$A.get('e.force:refreshView').fire();
		} else if (state === 'ERROR') {
			console.error('Problem saving contact, response state: ' + state);
		} else {
			console.error('Unknown problem, response state: ' + state);
		}
	},
	
	validateContactForm: function(component) {
		var validContact = this.firstNameIsNotBlank(component)
						&& this.lastNameIsNotBlank(component)
						&& this.hasAccount(component);
						// TODO: validate email and phone number
	},
	
	firstNameIsNotBlank: function(component) {
		return isNotBlank(component, 'contactFirstName', 'First Name');
	},

	lastNameIsNotBlank: function(component) {
		return isNotBlank(component, 'contactLastName', 'Last Name');
	},
	
	isNotBlank: function (component, fieldName, label) {
		var errors = null;
		var field = component.find(fieldName);
		if ($A.util.isEmpty(field.get('v.value'))) {
			errors =  [{message: label + ' can\'t be blank'}]
		}
		field.set('v.errors', errors);
		return errors === null; 
	},
	
	hasAccount: function(component) {
		var account = component.get('v.account');
		var hasValidAccount = !$A.util.isEmpty(account); 
		if (!hasValidAccount) {
			console.error('Quick action context doesn\'t have a valid account');
		}
		return hasValidAccount;
		
	}
})