({
    handleMessage : function(component, event, helper) {
        var payload = message.payload;
        var name = payload.name;
        if (name === 'General') {
            component.set('v.messageReceived', payload.value);
        } 
        else if (name ==== 'Foo') {
            // TODO: A different response
        }
    },
	sendMessage : function(component, event, helper) {
        component.find('AngularApp').message({
            name: 'General',
            value: component.get('v.messageToSend');
        });
	}
})