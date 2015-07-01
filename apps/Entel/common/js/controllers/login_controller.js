
angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $stateParams, $ionicViewService, $location, $state, UserConnector, Token) {

  $scope.loginData = {};

 
    Token.getToken(function(token) {
      if(token) {
        $ionicViewService.nextViewOptions({
         disableBack: true
       });
        $state.go('app.plan_types', {}, { location: "replace", reload: true });
      }
    });

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
        Token.setToken(e.responseJSON.access_token.token);
        if(e.responseJSON.statusCode === 401) {
          alert('Usuario o clave incorrectos, por favor intente de nuevo.');
        } else if(e.responseJSON.statusCode === 200) {

          WL.JSONStore.destroy().then(function() {
            var collections = {};
            collections["AccessToken"] = {
              searchFields: {
                token: 'string'
              }
            };

            WL.JSONStore.init(collections, {
              localKeyGen: false
            }).then(function() {
              WL.JSONStore.get('AccessToken').add([{
                token: e.responseJSON.access_token.token
              }]).then(function() {
                $ionicViewService.nextViewOptions({
                 disableBack: true
               });
                $state.go('app.plan_types', {}, { location: "replace", reload: true });      
              });
              
            }).fail(function(e) {
              console.log(e);
            });
          });
          
          
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

});