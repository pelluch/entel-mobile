
angular.module('starter.connectors')
.service('PlanConnector', [ function() {
    this.getPlans = function(planTypeId, opts) {

        var invocationData = {
            adapter: "plan", 
            procedure: "getPlans",
            parameters: [ planTypeId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.getPlan = function(userId, opts) {
        var invocationData = {
            adapter: "plan", 
            procedure: "getPlan",
            parameters: [ userId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    }
}]);
