
/* JavaScript content from js/controllers.js in folder common */

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

.controller('PlanTypeCtrl', function($scope, $stateParams, $location, PlanConnector) {
console.log($stateParams);
  $scope.plans = [];
  var indicator = new WL.BusyIndicator();
  indicator.show();
  PlanConnector.getPlans($stateParams.planTypeId, {
    onSuccess: function(e) {
      indicator.hide();
      $scope.plans = e.responseJSON.array;
      $scope.planTypeName = $location.search().name;
      console.log($scope.plans);
      $scope.$apply();
    },
    onFailure: function(e) {
      indicator.hide();
      alert('No se han podido cargar los planes, revise su conectividad');
    }
  });
})

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

})

.controller('TrafficCtrl', function($scope, $stateParams, DailyTrafficConnector) {

  var indicator = new WL.BusyIndicator();
  indicator.show();
  DailyTrafficConnector.getMonthlyTraffic(1, {
    onSuccess: function(e) {
      indicator.hide();
      var traffic = e.responseJSON;
      var duration = moment.duration({'seconds' : traffic.seconds});
      console.log(duration);
      var hours = duration.hours();
      console.log(hours);
      var minutes = duration.minutes();

      minutes += hours*60;
      console.log(minutes);
      traffic.minutes = minutes + ":" + duration.seconds();
      $scope.traffic = [ 
        { title: "Voz", subtitle: "Minutos utilizados", value: traffic.minutes },
        { title: "Mensajes", subtitle: "SMS/MMS y Otros", value: traffic.messages },
        { title: "Datos", subtitle: "Total utilizado", value: traffic.megabytes }
      ];
      $scope.plan = {
        name: traffic.plan_name,
        type_name: traffic.plan_type_name
      };
      
      $scope.date = moment().format("DD.MM.YYYY");
      $scope.$apply();
    },
    onFailure: function(e) {
      indicator.hide();
      alert('No se han podido cargar el tráfico, revise su conectividad');
    }
  });

});