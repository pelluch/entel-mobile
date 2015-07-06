
/* JavaScript content from js/controllers/traffic_controller.js in folder common */

angular.module('starter.controllers')
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
      { title: "Datos", subtitle: "Total utilizado", value: traffic.megabytes + " MB" }
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