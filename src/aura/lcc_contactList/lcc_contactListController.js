({
    createRecord : function(component, event, helper) {
        var createRecordEvent = $A.get('e.force:createRecord');
        createRecordEvent.setParams({
            entityApiName: 'Contact'
        });
        createRecordEvent.fire();
	},
    
	doInit : function(component, event, helper) {
		helper.getContactList(component);
	},
    
    select : function(component, event, helper) {
        var selectComponent = component.find('selection');
        var selectValue = selectComponent.get('v.value');
        console.log('######### selectValue', selectValue);
        var justPrimary = (selectValue == 'All Primary');
        console.log('######### justPrimary', justPrimary);
        helper.getContactList(component, justPrimary);
	}
})