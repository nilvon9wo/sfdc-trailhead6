({
    contactResponseHandler: function(component, response) {
        var state = response.getState();
        if (component.isValid() && state === 'SUCCESS') {
            component.set('v.contactList', response.getReturnValue());
        }
        this.displayToast(state);
    },
    
    displayToast: function(state) {
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams((state === 'SUCCESS')
        	? {title: 'Success!', message: 'Your contacts have been loaded successfully.'}	
        	: {title: 'Error!', message: 'Something has gone wrong.'}
        );	    
        toastEvent.fire();
    },
    
	getContactList : function(component, justPrimary) {
        var serverMethod = justPrimary ? 'c.getPrimary' : 'c.getContacts';
		var action = component.get(serverMethod);
        action.setCallback(this, function(response){
            this.contactResponseHandler(component, response);
        });
        $A.enqueueAction(action);
	}
})