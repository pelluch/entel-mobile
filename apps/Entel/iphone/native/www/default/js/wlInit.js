
/* JavaScript content from js/wlInit.js in folder common */
// Uncomment the initialization options as required. For advanced initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center 

var wlInitOptions = {

    // # To disable automatic hiding of the splash screen uncomment this property and use WL.App.hideSplashScreen() API
    autoHideSplash: false,
    
    // # The callback function to invoke in case application fails to connect to MobileFirst Server
    //onConnectionFailure: function (){},
    
    // # MobileFirst Server connection timeout
    //timeout: 30000,
    
    // # How often heartbeat request will be sent to MobileFirst Server
    //heartBeatIntervalInSecs: 20 * 60,
    
    // # Enable FIPS 140-2 for data-in-motion (network) and data-at-rest (JSONStore) on iOS or Android.
    //   Requires the FIPS 140-2 optional feature to be enabled also.
    //enableFIPS : false,
    
    // # The options of busy indicator used during application start up
    //busyOptions: {text: "Loading..."}
};

if (window.addEventListener) {
    window.addEventListener('load', function() { WL.Client.init(wlInitOptions); }, false);
} else if (window.attachEvent) {
    window.attachEvent('onload',  function() { WL.Client.init(wlInitOptions); });
}





function wlCommonInit(){


    var collections = {};
    collections["AccessToken"] = {
        searchFields: {
            token: 'string'
        }
    };

    
    WL.JSONStore.init(collections, {
    localKeyGen: false
    }).then(function() {
        var env = WL.Client.getEnvironment();
        if(env === WL.Environment.IPHONE || env === WL.Environment.IPAD){
            document.body.classList.add('platform-ios'); 
        } else if(env === WL.Environment.ANDROID){
            document.body.classList.add('platform-android'); 
        }   

        angular.element(document).ready(function() {

            angular.bootstrap(document, ['starter']);
        });         
    });

    
    

}

function isPushSupported() {
    var isSupported = false;
    if (WL.Client.Push){
        isSupported = WL.Client.Push.isPushSupported();
    }   
    alert(isSupported);
}

function isPushSubscribed() {
    var isSubscribed = false;
    if (WL.Client.Push){
        isSubscribed = WL.Client.Push.isSubscribed('Entel');
    }
    alert(isSubscribed);
}

//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push) {   
    WL.Client.Push.onReadyToSubscribe = function() {

        WL.Client.Push.registerEventSourceCallback(
            "Entel", 
            "push", 
            "PushEventSource", 
            pushNotificationReceived);
    };
    if(WL.Client.Push.isPushSupported()) {
        WL.Logger.warn("Push supported");
        doSubscribe();
    } else {
        WL.Logger.warn("No push support");   
    }
}

// --------------------------------- Subscribe ------------------------------------
function doSubscribe() {
    WL.Client.Push.subscribe("Entel", {
        onSuccess: doSubscribeSuccess,
        onFailure: doSubscribeFailure
    });
}

function doSubscribeSuccess() {
    alert("doSubscribeSuccess");
}

function doSubscribeFailure() {
    alert("doSubscribeFailure");
}

//------------------------------- Unsubscribe ---------------------------------------
function doUnsubscribe() {
    WL.Client.Push.unsubscribe("Entel", {
        onSuccess: doUnsubscribeSuccess,
        onFailure: doUnsubscribeFailure
    });
}

function doUnsubscribeSuccess() {
    alert("doUnsubscribeSuccess");
}

function doUnsubscribeFailure() {
    alert("doUnsubscribeFailure");
}

//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
    alert("pushNotificationReceived invoked");
    alert("props :: " + JSON.stringify(props));
    alert("payload :: " + JSON.stringify(payload));
}
