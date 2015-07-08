
angular.module('starter.connectors')
.service('DailyTrafficConnector', function(User) {
    this.getDailyTraffics = function(userId, opts) {

        var invocationData = {
            adapter: "daily_traffic", 
            procedure: "getDailyTraffics",
            parameters: [ userId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.getMonthlyTraffic = function(userId, opts) {

        User.getUser(function(user) {
            if(user) {
                var invocationData = {
                    adapter: "daily_traffic", 
                    procedure: "getMonthlyTraffic",
                    parameters: [ user.token ]
                };

                WL.Client.invokeProcedure(invocationData, opts);
            } else {
                WL.SimpleDialog.show('Error', 'Debe hacer login antes de acceder a esta funcionalidad',
                    [ { text: "Aceptar" }]);
            }
        });
        
    };

});
