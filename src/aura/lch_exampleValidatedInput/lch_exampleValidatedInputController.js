({
	onClick : function(component, event, helper) {
        var isValid = component.find('field').reduce(helper.isFormValid);
        
        alert((isValid)
        	? 'All form entries look valid.  Ready to submit!'
        	: 'Please update the invalid form entries and try again.'
        );
	}
})