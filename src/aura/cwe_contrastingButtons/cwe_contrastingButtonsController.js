({
	handleClick : function(component, event, helper) {
		var attributeValue = component.get('v.text');
		console.info('current text:' + attributeValue);
		
		var target = event.getSource();
		component.set('v.text', target.get('v.label'));
	}
})