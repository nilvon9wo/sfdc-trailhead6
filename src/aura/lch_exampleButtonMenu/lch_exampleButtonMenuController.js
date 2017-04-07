({
    createItems : function(component, event, helper) {
        var actionList = {
            {label: 'New', value: 'new'},
            {label: 'Edit', value: 'edit'},
            {label: 'Delete', value: 'delete'}
        }
    	component.set('v.actionList', actionList);
    },
	handleMenuSelect : function(component, event, helper) {
        var selectedMenuItemValue = event.getParam('value');
	}
})