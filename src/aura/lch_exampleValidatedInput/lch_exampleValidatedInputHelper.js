({
	isFormValid : function(validSoFar, inputComponent) {
            inputComponent.showHelpMessageIfInvalid();
            return validSoFar && inputComponent.get('v.validity').valid;
        }
})