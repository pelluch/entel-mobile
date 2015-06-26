
angular.module('starter.controllers', [ 'starter.connectors' ])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserConnector) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    var loginData = $scope.loginData;
    if(loginData) {
      if(!validatePhoneNumber(loginData.phone_number)) {
        alert('Debe ingresar un número de 8 dígitos');
        return;
      }

      if(!validateRut(loginData.rut)) {
        alert('Debe ingresar un RUT válido');
        return;
      }

      if(!validatePassword(loginData.password, 4)) {
        alert('Debe ingresar un clave de al menos 4 caracteres');
        return;
      }
    }
    var indicator = new WL.BusyIndicator();
    indicator.show();
    console.log('Doing login', $scope.loginData);
    UserConnector.login($scope.loginData, {
      onSuccess: function(e) {
        indicator.hide();
        console.log(e);

        if(e.responseJSON.statusCode === 401) {
          alert('Usuario o clave incorrectos, por favor intente de nuevo.');
        } else if(e.responseJSON.statusCode === 200) {
          $scope.closeLogin();
        }
      },
      onFailure: function(e) {
        indicator.hide();

        console.log(e);
      }
    })
    // console.log(UserConnector);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system

  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  { title: 'Reggae', id: 1 },
  { title: 'Chill', id: 2 },
  { title: 'Dubstep', id: 3 },
  { title: 'Indie', id: 4 },
  { title: 'Rap', id: 5 },
  { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlanTypeListCtrl', function($scope, $stateParams, PlanTypeConnector) {

  $scope.planTypes = [];
  var indicator = new WL.BusyIndicator();
  indicator.show();
  PlanTypeConnector.getPlanTypes({
    onSuccess: function(e) {
      indicator.hide();
      $scope.planTypes = e.responseJSON.array;
      console.log($scope.planTypes);
      $scope.$apply();
    },
    onFailure: function(e) {
      indicator.hide();
      alert('No se han podido cargar los planes, revise su conectividad');
    }
  });
})

.controller('PlanTypeCtrl', function($scope, $stateParams) {
});