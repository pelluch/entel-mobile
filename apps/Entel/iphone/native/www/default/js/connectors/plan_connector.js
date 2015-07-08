
/* JavaScript content from js/connectors/plan_connector.js in folder common */

angular.module('starter.connectors')
.service('PlanConnector', [ function(Token) {
    this.getPlans = function(planTypeId, opts) {

        var invocationData = {
            adapter: "plan", 
            procedure: "getPlans",
            parameters: [ planTypeId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.getPlan = function(opts) {
        Token.getToken(function(token) {
            if(token) {
                var invocationData = {
                    adapter: "plan", 
                    procedure: "getPlan",
                    parameters: [ token ]
                };
                WL.Client.invokeProcedure(invocationData, opts);
            } else {
                WL.SimpleDialog.show('Error', 'Debe hacer login antes de acceder a esta funcionalidad',
                    [ { text: "Aceptar" }]);
            }
        });
    }
}]);
