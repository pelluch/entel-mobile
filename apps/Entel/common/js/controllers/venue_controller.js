
angular.module('starter.controllers')
.controller('VenueListCtrl', function($scope, $stateParams, VenueConnector) {

  var indicator = new WL.BusyIndicator();
  indicator.show();
  VenueConnector.getVenues({
    onSuccess: function(e) {
      indicator.hide();
      $scope.venues = e.responseJSON.array;
      $scope.$apply();
    },
    onFailure: function(e) {
      indicator.hide();
      alert('No se han podido cargar los locales, revise su conectividad');
    }
  });

});