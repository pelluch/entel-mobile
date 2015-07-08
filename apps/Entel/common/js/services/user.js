angular.module('starter.services', [])
.service('User', function(){
    // IMPORTANTE cambiar token a null cuando se suba el sitio
    this.user = null;
    var that = this;
    this.getUser = function(callback) {
    	if(this.user) {
    		callback(this.user);
    	} else {
    		var stored = WL.JSONStore.get('User').findAll().then(function(a) {
    			if(a.length > 0) {
                    var u = {
                        name: a[0].json.name,
                        token: a[0].json.token,
                        account_holder: a[0].json.account_holder
                    };
    				that.setUser(u);
    				callback(u);
    			} else {
    				callback(null);
    			}
    		});
    	}
    };

    this.setUser = function(newUser) {
    	this.user = newUser;
    };

    this.clear = function(callback) {
        this.user = null;
        WL.JSONStore.get('User').removeCollection().then(function() {
             var collections = {};
            collections["User"] = {
              searchFields: {
                name: 'string',
                token: 'string',
                account_holder: 'string'
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
