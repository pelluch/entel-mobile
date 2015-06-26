
angular.module('starter.connectors')
.service('VenueConnector', [ function() {
    this.getVenues = function(opts) {

        var invocationData = {
            adapter: "venue", 
            procedure: "getVenues",
            parameters: []
        };
        
        WL.Client.invokeProcedure(invocationData, opts);
    };

}]);
