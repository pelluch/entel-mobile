
angular.module('starter.connectors')
.service('DailyTrafficConnector', [ function() {
    this.getDailyTraffics = function(userId, opts) {

        var invocationData = {
            adapter: "plan", 
            procedure: "getDailyTraffics",
            parameters: [ userId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

}]);
