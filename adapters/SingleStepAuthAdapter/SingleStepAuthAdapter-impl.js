/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;

	return {
		authRequired: true,
		errorMessage: errorMessage
	};
}

function submitAuthentication(rut, phone_number, password){

	var input = {
			method : 'post',
			returnedContentType : 'json',
			path : 'access_tokens',
			body: {
				contentType : 'application/json; charset=utf-8',
				content: {
					rut: rut,
					password: password,
					phone_number: phone_number
				}
			}
	};

	var response = WL.Server.invokeHttp(input);
	if(response.statusCode == 200) {
		var userIdentity = {
				first_name: response.first_name,
				last_name: response.last_name,
				access_token: response.access_token,
				rut: response.rut,
				phone_number: response.phone_number,
				id: response.id
		};

		WL.Server.setActiveUser("SingleStepAuthRealm", userIdentity);

		return {
			authRequired: false,
			user: userIdentity
		};
	} else {
		return onAuthRequired(null, "Invalid login credentials");
	}
}




function getSecretData(){
	return {
		secretData: "Very very very very secret data"
	};
}

function onLogout(){
	WL.Logger.debug("Logged out");
}

