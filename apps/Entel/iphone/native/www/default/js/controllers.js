
/* JavaScript content from js/controllers.js in folder common */

angular.module('starter.controllers', [ 'starter.connectors', 'starter.utils',
  'starter.services', 'uiGmapgoogle-maps' ])

.controller('AppCtrl', function($scope, $ionicViewService, $state, $ionicModal, $timeout, $location, $ionicSideMenuDelegate, UserConnector, Token) {


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
    Token.getToken(function(token) {
      if(token) {
        $scope.loggedIn = true;
      } else {
        $scope.loggedIn = false;
      }
    });
  });

  $scope.logout = function() {
    $scope.loggedIn = false;
    Token.clear(function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $ionicViewService.nextViewOptions({
       disableBack: true
     });
      $state.go('app.login', {}, { location: "replace", reload: true });
    });
    
  };
  
  // Form data for the login modal
  

  // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;

    Token.getToken(function(t) {
      if(t) {
        $location.path("/app/plan_types");     
      } else {
        $scope.login(); 
      }
    });
   
   });
   */

  // Perform the login action when the user submits the login form
  


})
.controller('MainCtrl', function($scope, $stateParams) {

});