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


WL.Server.createEventSource({
	name: 'PushEventSource',
	onDeviceSubscribe: 'deviceSubscribeFunc',
	onDeviceUnsubscribe: 'deviceUnsubscribeFunc',
	securityTest: 'mobileTests'
});

function sendPush(userId, notificationText) {
	
	var userSubscription = WL.Server.getUserNotificationSubscription('push.PushEventSource', userId);

	if (userSubscription==null){
		return { result: "No subscription found for user :: " + userId };
	}

	var badgeDigit = 1;

	var notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {custom:"data"});

	WL.Logger.debug("submitNotification >> userId :: " + userId + ", text :: " + notificationText);

	WL.Server.notifyAllDevices(userSubscription, notification);

	return { 
		result: "Notification sent to user :: " + userId 
	};
}

function onSusbribe(userSubscription, deviceSubscription) {
	WL.Logger.debug(">> deviceUnsubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function onUnsuscribe(userSubscription, deviceSubscription) {
	WL.Logger.debug(">> deviceUnsubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}
