({
	buildEmailList : function (people) {
		return getEmailsFromList(people.to)
					.concat(getEmailsFromList(people.cc));
					
		function getEmailsFromList(list) {
			var list = [];
			list.forEach(function (item){
				list.push(item.email);
			});
			return list;
		},
	},

	setAccountList : function (component, emailList) {
		this.setList(component, emailList, 'c.findAccountAges', 'v.accountList');
	}, 

	setOpportunityList : function (component, emailList) {
		this.setList(component, emailList, 'c.findOpportunityCloseDateTime', 'v.opportunityList');
	},
	
	setList: function(component, emailList, serverMethod, targetValue) {
		var action = component.get(serverMethod);
		action.setParam('emailList', emailList);
		action.setCallback(this, function(response){
			handleResponse(component, response, targetValue);
		});
		$A.enqueueAction(action);
		
		function handleResponse(component, response, targetValue) {
			var state = response.getState();
			var list = (component.isValid() && state === 'SUCCESS')
									? response.getReturnValue()
									: [];	
			component.set(targetValue, list);
		}		
	}
})