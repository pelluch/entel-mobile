

angular.module('starter.connectors', [])
.service('UserConnector', [ function() {

    this.addUser = function(userParams, opts) {

        var invocationData = {
            adapter: "user", 
            procedure: "addUser",
            parameters: [ userParams ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.login = function(loginParams, opts) {
        var invocationData = {
            adapter: "user", 
            procedure: "login",
            parameters: [ loginParams ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };
}]);