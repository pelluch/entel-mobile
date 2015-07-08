
angular.module('starter.controllers', [ 'starter.connectors', 'starter.utils',
  'starter.services', 'uiGmapgoogle-maps' ])

.controller('AppCtrl', function($scope, $ionicViewService, $state, $ionicModal, $timeout, $location, $ionicSideMenuDelegate, UserConnector, User) {


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
    User.getUser(function(user) {
      if(user) {
        $scope.loggedIn = true;
        $scope.user = user;
      } else {
        $scope.loggedIn = false;
      }
    });
  });

  $scope.menuClicked = function(message) {
    WL.Analytics.log({ 
      message: "Click en " + message,
      type: "event"
    });         
    WL.Analytics.send();
  };

  $scope.logout = function() {
    $scope.loggedIn = false;
    User.clear(function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $ionicViewService.nextViewOptions({
       disableBack: true
     });
      $state.go('app.login', {}, { location: "replace", reload: true });
    });
    
  };


})
.controller('MainCtrl', function($scope, $stateParams) {

});