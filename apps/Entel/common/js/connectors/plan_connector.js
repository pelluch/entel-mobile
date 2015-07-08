
angular.module('starter.connectors')
.service('PlanConnector',  function(User) {
    this.getPlans = function(planTypeId, opts) {

        var invocationData = {
            adapter: "plan", 
            procedure: "getPlans",
            parameters: [ planTypeId ]
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

    this.getPlan = function(opts) {
        User.getUser(function(user) {
            if(user) {
                var invocationData = {
                    adapter: "plan", 
                    procedure: "getPlan",
                    parameters: [ user.token ]
                };
                WL.Client.invokeProcedure(invocationData, opts);
            } else {
                WL.SimpleDialog.show('Error', 'Debe hacer login antes de acceder a esta funcionalidad',
                    [ { text: "Aceptar" }]);
            }
        });
    }
});
