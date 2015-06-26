
/* JavaScript content from js/connectors/plan_type_connector.js in folder common */


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