/* Product(s):                                                    */
/* Tealeaf CX Mobile iOS SDK                                      */
/* 5725-K23                                                       */
/*                                                                */
/* Copyright IBM Corp. 2014										  */
/* All rights reserved.                                           */
/* US Government Users Restricted Rights -                        */
/* Use, duplication or disclosure restricted                      */
/* by GSA ADP Schedule Contract with IBM Corp.                    */
/*                                                                */
/* Licensed Materials-Property of IBM                             */
/*                                                                */

#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>
#import "TLFPublicDefinitions.h"

@import JavaScriptCore;

@class TLFLogging;
@class TLFMonitoringLevel;
@class TLFCache;

@protocol TLFCustomEventJSProtocol <JSExport>
- (BOOL)logEvent:(NSString*)eventName;
- (BOOL)logEvent:(NSString*)eventName values:(NSDictionary*)values;
- (BOOL)logPrintScreenEvent;
- (BOOL)logJSONMessagePayloadStr:(NSString*)payload;
@end
@interface TLFCustomEvent : NSObject <TLFSavePrintScreenOperationDelegate, TLFCustomEventJSProtocol> {
	TLFLogging *_currentLogging;
	TLFMonitoringLevel *_currentMonitoringLevel;
	TLFCache *_currentCache;
	
	BOOL _isTLFEnabled;
	
	// Exception handling 
	// We set these variables before the exceoption happens
	NSString *_hostName;
	NSString *_fileName;
}

/**
 Returns the common singleton instance of the TLFCustomEvent class. If the singleton instance hasn't been created yet then it will create the instance and then return it.
 @return the singleton instance of the TLFCustomEvent class.
 */
+ (TLFCustomEvent*)sharedInstance;

/**
 Requests that the framework log a named event with no additional information.
 @param eventName - the event name.
 @return if the event was successfully logged or not.
 */
- (BOOL)logEvent:(NSString*)eventName;

/**
 Requests that the framework logs a named event and additional information in string form.
 @param eventName - the event name.
 @param value - additional detail about the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logEvent:(NSString*)eventName value:(NSString*)value;

/**
 Requests that the framework logs a named event and additional information in dictionary form. The dictionary will be converted into JSON representation.
 @param eventName - the event name.
 @param values - a dictionary of key value pairs representing additional information associated to the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logEvent:(NSString*)eventName values:(NSDictionary*)values;
    
/**
 Requests that the framework logs a named event, specifying the monitoring level.
 @param eventName - the event name.
 @param level - the monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logEvent:(NSString*)eventName level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs a named event and an associated string, specifying the monitoring level.
 @param level - The monitoring level of the event.
 @param value - The associated string.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logEvent:(NSString*)eventName value:(NSString*)value level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs a named event at a particular level with additional information in dictionary form. The dictionary will be converted into JSON representation.
 @param level - The monitoring level of the event.
 @param values - A dictionary of key value pairs representing additional information associated to the event.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logEvent:(NSString*)eventName values:(NSDictionary*)values level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs the carrier information. This is not logged automatically because it requires the Core Telephony framework.
 @param carrierName - The carrier name.
 @param isoCountryCode - The ISO country code.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logCarrierEvent:(NSString*)carrierName country:(NSString*)isoCountryCode level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs the location information. This is not logged automatically to avoid making unnecessary location updates and to protect the privacy of your application's users by ensuring that location is reported only when the app has some other reason to request it. Your application must include the Core Location framework.
 @param latitude - The geographic latitude of the user.
 @param longitude - The geographic longitude of the user.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logLocationUpdateEventWithLatitude:(double)latitude longitude:(double)longitude level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs an error as described in an NSError instance.
 @param error - The NSError instance.
 @param message - An associated message.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSErrorEvent:(NSError*)error message:(NSString*)message level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs an error as described in an NSError instance.
 @param error - The NSError instance.
 @param message - An associated message.
 @param file - The original file the error occured in
 @param line - The original line where the error occured.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSErrorEvent:(NSError*)error message:(NSString*)message file:(const char*)file line:(unsigned int)line level:(kTLFMonitoringLevelType)level;
    
    
/**
 Requests that the framework logs an exception trapped by your own exception handler. These methods do not use the Cocoa SDK, which is not exception-safe.
 @param exception - The caught NSException instance.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSExceptionEvent:(NSException *)exception;

/**
 Requests that the framework logs an exception trapped by your own exception handler. These methods do not use the Cocoa SDK, which is not exception-safe.
 @param exception - The caught NSException instance.
 @param dataDictionary - Additional data about the exception.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSExceptionEvent:(NSException *)exception dataDictionary:(NSDictionary*)dataDictionary;
    
/**
 Requests that the framework logs an exception trapped by your own exception handler. These methods do not use the Cocoa SDK, which is not exception-safe.
 @param exception - The caught NSException instance.
 @param dataDictionary - Additional data about the exception.
 @param unhandled - Indeicates whether the exception was caught by an exception handler or not.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSExceptionEvent:(NSException *)exception dataDictionary:(NSDictionary*)dataDictionary isUnhandled:(BOOL)unhandled;
    
/**
 DEPRECATED
 Use - (BOOL)logNSExceptionEvent:(NSException *)exception;
 Requests that the framework logs an exception trapped by your own exception handler. These methods do not use the Cocoa SDK, which is not exception-safe.
 @param exception - The caught NSException instance.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSExceptionEvent:(NSException *)exception level:(kTLFMonitoringLevelType)level;
    
/**
 DEPRECATED
 Use - (BOOL)logNSExceptionEvent:(NSException *)exception dataDictionary:(NSDictionary*)dataDictionary;
 Requests that the framework logs an exception trapped by your own exception handler. These methods do not use the Cocoa SDK, which is not exception-safe.
 @param exception - The caught NSException instance.
 @param dataDictionary - Additional data about the exception.
 @param level - The monitoring level of the event.
 @return if the event was successfully logged or not.
 */
- (BOOL)logNSExceptionEvent:(NSException *)exception dataDictionary:(NSDictionary*)dataDictionary level:(kTLFMonitoringLevelType)level;

/**
 Requests that the framework logs a Print Screen event. The screenshot in that moment is automatically associated.
 @return if the event was successfully logged or not.
 */
- (BOOL)logPrintScreenEvent;

/**
 Requests that the framework logs an Image. 
 @param image - The UIImage to be logged.
 @return if the event was successfully logged or not.
 */
- (BOOL)logImage:(UIImage *)image;

/**
 Requests that the framework logs an Image.
 @param image - The UIImage to be logged.
 @return if the event was successfully logged or not.
 */
- (BOOL)logImageSynchronous:(UIImage*)image;
    
/**
 This example shows how to log the text change event of a UILabel. The label will print out the previous state as well as the current state.
 @param label - The UILabel to be logged.
 @return if the event was successfully logged or not.
 */
- (BOOL)logUILabelTextChange:(UILabel*)label;
    
/**
 This example shows how to log Custom Controls. Any control must conform to the TLFCustomControlDelegate.
 @param customControl - The control to be logged.
 @return if the event was successfully logged or not.
 */
- (BOOL)logCustomControl:(id<TLFCustomControlDelegate>)customControl;

/**
 Requests that the framework logs an application context. 
 @param logicalPageName - Page name or title e.g. "Login View Controller"; Must not be empty.
 @param applicationContext - valid values are "LOAD" or "UNLOAD"; Must not be empty.
 @param referrer - Page name or title that loads logicalPageName. Could be empty.
 @return if the event was successfully logged or not.
 */
- (BOOL)logAppContext:(NSString*)logicalPageName applicationContext:(NSString*)applicationContext referrer:(NSString*)referrer;
    
/**
 Requests that the framework logs the connection information.
 @param connection - The NSURLConnection object
 @param error - An NSError object
 @return if the event was successfully logged or not.
 */
-(BOOL)logConnection:(NSURLConnection*)connection error:(NSError*)error;
    
/**
 Requests that the framework logs the connection information.
 @param connection - The NSURLConnection object
 @param response - The NSURLResponse object from the connection request
 @param responseTimeInMilliseconds - The time in milliseconds taken by the server to respond
 @return if the event was successfully logged or not.
 */
-(BOOL)logConnection:(NSURLConnection*)connection response:(NSURLResponse*)response responseTimeInMilliseconds:(long long)responseTime;
    
/**
 Requests that the framework logs the connection information.
 @param connection - The NSURLConnection object
 @param request - The NSURLRequest object associated with the connection
 @return if the event was successfully logged or not.
 */
-(BOOL)logConnection:(NSURLConnection*)connection request:(NSURLRequest*)request;
    
/**
 Requests that the framework logs the click events on any UIControl or UIView. Click event is a normalized form of touch up inside event.
 @param view - UIView object on which click event occurred.
 @param data - any additional custom data that needs to be sent as a dictionary along with the click event.
 @return if the event was successfully logged or not.
 */
-(BOOL)logClickEvent:(UIView*)view data:(NSDictionary*)data;
    
/**
 Requests that the framework logs the UITableViewCell or UICollectionViewCell's content changed event
 @param view - UIView object on which the event occurred
 @param data - Any additional custom data that needs to be sent as a dictionary along with the event
 @return if the event was successfully logged or not.
 */
-(BOOL)logValueChangeEvent:(UIView*)view data:(NSDictionary*)data;
    
/**
 Requests that the framework logs the edit event on UITextView, UITextViewSecure, UITextField or UITextFieldSecure
 @param view - UIView object on which edit event occurred
 @param data - any additional custom data that needs to be sent as a dictionary along with the event
 @return if the event was successfully logged or not.
 */
-(BOOL)logTextChangeEvent:(UIView*)view data:(NSDictionary*)data;
    
/**
 Requests that the framework logs the connection information.
 @param urlSession - The NSURLSession object
 @param error - any NSError object
 @return if the event was successfully logged or not.
 */
-(BOOL)logNSURLSession:(NSObject*)urlSession error:(NSError*)error;
    
/**
 Requests that the framework logs the connection information.
 @param urlSession - The NSURLSession object.
 @param response - The NSURLResponse object from the connection request
 @param responseTimeInMilliseconds time taken by the server to respond.
 @return if the event was successfully logged or not.
 */
-(BOOL)logNSURLSession:(NSObject*)urlSession response:(NSURLResponse*)response responseTimeInMilliseconds:(long long)responseTime;
    
/**
 Requests that the framework logs the connection information.
 @param urlSession - The NSURLSession object
 @param request - Any NSURLRequest object
 @return if the event was successfully logged or not.
 */
-(BOOL)logNSURLSession:(NSObject*)urlSession request:(NSURLRequest*)request;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged
 @param name - Custom name to associate with the view Controller
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController andName:(NSString*)name;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged
 @param delay - number of seconds to wait before logging the view.
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController	andDelay:(CGFloat)delay;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged
 @param delay - number of seconds to wait before logging the view.
 @param name - Custom name to associate with the view Controller
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController	andDelay:(CGFloat)delay andName:(NSString*)name;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged
 @param views - Array of views that will be logged along with the provided viewController
 @param delay - number of seconds to wait before logging the view.
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController andRelatedViews:(NSArray*)views andDelay:(CGFloat)delay;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged.
 @param views - Array of views that will be logged along with the provided viewController.
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController andRelatedViews:(NSArray*)views;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged.
 @param views - Array of views that will be logged along with the provided viewController.
 @param name - Custom name to associate with the view Controller
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController andRelatedViews:(NSArray*)views andName:(NSString*)name;
    
/**
 Requests that the framework logs the layout of the screen
 @param viewController - UIViewController object whose layout needs to be logged.
 @param views - Array of views that will be logged along with the provided viewController.
 @param delay - number of seconds to wait before logging the view.
 @param name - Custom name to associate with the view Controller
 @return if the event was successfully logged or not.
 */
-(BOOL)logScreenLayoutWithViewController:(UIViewController *)viewController andRelatedViews:(NSArray*)views andDelay:(CGFloat)delay andName:(NSString*)name;
    
/**
 Requests that the framework logs the Tealeaf JSON Message coming over from javascript. Must follow Tealeaf JSON message format.
 @param payload - NSString object that matches Tealeaf JSON Message type format
 @return if the event was successfully logged or not.
 */
- (BOOL)logJSONMessagePayloadStr:(NSString*)payload;
@end