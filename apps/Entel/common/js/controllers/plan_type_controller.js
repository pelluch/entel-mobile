

angular.module('starter.controllers')
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

.controller('PlanTypeCtrl', function($scope, $stateParams, $location, Utils, PlanConnector) {
  console.log($stateParams);
  $scope.plans = [];
  var indicator = new WL.BusyIndicator();
  indicator.show();
  PlanConnector.getPlans($stateParams.planTypeId, {
    onSuccess: function(e) {
      indicator.hide();
      $scope.plans = e.responseJSON.array;
      _.each($scope.plans, function(plan) {
        plan.price = Utils.getFormattedMoney(plan.price);
        plan.internet_price = Utils.getFormattedMoney(plan.internet_price);
      });
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