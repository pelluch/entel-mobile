
/* JavaScript content from js/connectors/daily_traffic_connector.js in folder common */

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
