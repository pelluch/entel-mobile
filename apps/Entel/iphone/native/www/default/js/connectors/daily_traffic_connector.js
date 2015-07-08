
/* JavaScript content from js/connectors/daily_traffic_connector.js in folder common */

angular.module('starter.connectors')
.service('DailyTrafficConnector', [ function(Token) {
    this.getDailyTraffics = function(userId, opts) {

        var invocationData = {
            adapter: "daily_traffic", 
            procedure: "getDailyTraffics",
            parameters: [ userId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.getMonthlyTraffic = function(userId, opts) {

        Token.getToken(function(token) {
            if(token) {
                var invocationData = {
                    adapter: "daily_traffic", 
                    procedure: "getMonthlyTraffic",
                    parameters: [ token ]
                };

                WL.Client.invokeProcedure(invocationData, opts);
            } else {
                WL.SimpleDialog.show('Error', 'Debe hacer login antes de acceder a esta funcionalidad',
                    [ { text: "Aceptar" }]);
            }
        });
        
    };

}]);
