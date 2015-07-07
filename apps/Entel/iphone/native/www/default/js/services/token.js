
/* JavaScript content from js/services/token.js in folder common */
angular.module('starter.services', [])
.service('Token', function(){
    // IMPORTANTE cambiar token a null cuando se suba el sitio
    this.token = null;
    var that = this;
    this.getToken = function(callback) {
    	if(this.token) {
    		callback(this.token);
    	} else {
    		var stored = WL.JSONStore.get('AccessToken').findAll().then(function(a) {
    			if(a.length > 0) {
    				that.setToken(a[0].json.token);
    				callback(a[0].json.token);
    			} else {
    				callback(null);
    			}
    		});
    	}
    };

    this.setToken = function(newToken) {
    	this.token = newToken;
    };

    this.clear = function(callback) {
        this.token = null;
        WL.JSONStore.get('AccessToken').removeCollection().then(function() {
             var collections = {};
            collections["AccessToken"] = {
              searchFields: {
                token: 'string'
              }
            };

            WL.JSONStore.init(collections, {
              localKeyGen: false
            }).then(function() {
                callback();
            });
        });
    };
});
