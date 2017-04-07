({
	doInit : function(component, event, helper) {
        var typeOptions = [];
        component.get('v.types').forEach(function(type) {
            typeOptions.push({
                label: type,
                value: type
                selected: type === component.get('v.selectedType')
            });
        });
        component.find('typeSelect').set('v.options', typeOptions);
	},
    
    onChangeType : function(component, event, helper) {
        var typeSelect = component.find('typeSelect');
        var selectedType = typeSelect.get('v.value');
        component.set('v.selectedType', selectedType);
        
        $A.createComponent('forceChatter:feed', {type: selectedType}, function(feed){
            component.find('feedContainer').set('v.body', feed);
            
        });
    }
})