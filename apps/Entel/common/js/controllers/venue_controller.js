
angular.module('starter.controllers')
.controller('VenueListCtrl',  function($scope, $stateParams, VenueConnector) {
  
  
  var indicator = new WL.BusyIndicator();
  indicator.show();
  VenueConnector.getVenues({
    onSuccess: function(e) {
      indicator.hide();
      $scope.venues = e.responseJSON.array;
      $scope.$apply();
      /*
      uiGmapGoogleMapApi.then(function(maps) {
        _.each($scope.venues, function(venue) {
            var myLatlng = new google.maps.LatLng(venue.latitude, venue.longitude);
            var marker = new google.maps.Marker({
              position: myLatlng,
              map: maps,
              title: venue.address
          });
        });
       
      });
*/
    },
    onFailure: function(e) {
      indicator.hide();
      alert('No se han podido cargar los locales, revise su conectividad');
    }
  });

});