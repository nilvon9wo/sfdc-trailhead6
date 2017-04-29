({
	doInit : function(component, event, helper) {
        component.set('v.routeInput', {recordId: component.get('v.recordId')});
	},
    onClick : function(component, event, helper) {
        var navigationEvent = $A.get('e.force:navigateToSObject');
        navigationEvent.setParams({
            recordId: component.get('v.recordId')
        });
        navigationEvent.fire();
    }
})