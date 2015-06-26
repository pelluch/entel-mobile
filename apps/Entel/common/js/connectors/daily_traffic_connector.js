
angular.module('starter.connectors')
.service('DailyTrafficConnector', [ function() {
    this.getDailyTraffics = function(userId, opts) {

        var invocationData = {
            adapter: "daily_traffic", 
            procedure: "getDailyTraffics",
            parameters: [ userId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.getMonthlyTraffic = function(userId, opts) {

        var invocationData = {
            adapter: "daily_traffic", 
            procedure: "getMonthlyTraffic",
            parameters: [ userId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

}]);
