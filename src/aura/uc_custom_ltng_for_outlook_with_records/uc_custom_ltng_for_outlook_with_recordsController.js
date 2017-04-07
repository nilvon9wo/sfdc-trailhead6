({
	handlePeopleChange : function(component, event, helper) {
		var emailList = helper.buildEmailList(component.get('v.people'));
		helper.setAccountList(component, emailList);
		helper.setOpportunityList(component, emailList);
	}
})