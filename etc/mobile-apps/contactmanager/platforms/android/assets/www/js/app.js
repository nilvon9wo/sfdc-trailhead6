force.init({
	appId: "3MVG9HxRZv05HarRgDskiOgFNOgucdA2E47wPqne0MGOQXdOM95kbUe0zmhOjmjpZ4YNO_axDyk2nHcv5D4.H"
});

force.login(showContacts, handleLoginError);

function showContacts() {
	force.query('SELECT Name, Phone FROM Contact LIMIT 20', handleContactSuccessResponse, handleContactErrorResponse);
	
	function handleContactSuccessResponse(response) {
		var contactList = response.records;
		var html = '';
		
		contactList.forEach(function(contact) {
			html += '<li class="table-view-cell"><div class="media-body">'
						+ contact.Name 
						+ '<p>' 
							+ contact.Phone
						+ '</p>'
					+ '</div></li>';
		});
		
		document.querySelector('#contacts').innerHTML = html;
	}
	
	function handleContactErrorResponse(error) {
		alert ('Can\'t load contacts: ' + error);
	}
}

function handleLoginError(error) {
	alert('Authentication failed: ' + 'error);
}