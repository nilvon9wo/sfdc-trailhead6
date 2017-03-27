({
    
    editRecord : function(component, event, helper) {
        var editRecordEvent = $A.get('e.force:editRecord');
        editRecordEvent.setParams({
            recordId: component.get('v.contact.Id'),
        });
        editRecordEvent.fire();
    },
    
    gotoRecord : function(component, event, helper) {
        var sObjectEvent = $A.get('e.force:navigateToSObject');
        sObjectEvent.setParams({
            recordId: component.get('v.contact.Id'),
            slideDevName : 'related'
        });
        sObjectEvent.fire();
    },
    
    displayCaseList : function(component, event, helper) {
        var relatedCaseListEvent = $A.get('e.force:navigateToRelatedList');
        relatedCaseListEvent.setParams({
    		relatedListId: 'Cases',
            parentRecordId: component.get('v.contact.Id')
        });
        relatedCaseListEvent.fire();
    }

})