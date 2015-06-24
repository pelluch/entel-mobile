

angular.module('starter.connectors')
.service('PlanTypeConnector', [ function() {
    this.getPlanTypes = function(opts) {

        var invocationData = {
            adapter: "plan_type", 
            procedure: "getPlanTypes",
            parameters: []
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };
}]);