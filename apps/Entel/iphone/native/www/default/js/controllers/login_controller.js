
/* JavaScript content from js/controllers/login_controller.js in folder common */

angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $stateParams, $ionicViewService, $location, $state, UserConnector, Token) {

  $scope.loginData = {};

 
    Token.getToken(function(token) {
      if(token) {
        $ionicViewService.nextViewOptions({
         disableBack: true
       });
        $state.go('app.plan_types', {}, { location: "replace", reload: true }).then(function() {
            setTimeout(function() {
              WL.App.hideSplashScreen();
            }, 2000);
        });
      } else {
        WL.App.hideSplashScreen();
      }
    });

  $scope.doLogin = function() {

    var loginData = $scope.loginData;
    if(loginData) {
      if(!validatePhoneNumber(loginData.phone_number)) {
        WL.SimpleDialog.show('Error', 'Debe ingresar un número de 8 dígitos',
        [ { text: "Aceptar" }]);
        return;
      }

      if(!validateRut(loginData.rut)) {
        WL.SimpleDialog.show('Error', 'Debe ingresar un RUT válido',
        [ { text: "Aceptar" }]);
        return;
      }

      if(!validatePassword(loginData.password, 4)) {
        WL.SimpleDialog.show('Error', 'Debe ingresar un clave de al menos 4 caracteres',
        [ { text: "Aceptar" }]);
        return;
      }
    }
    var indicator = new WL.BusyIndicator();
    indicator.show();
    console.log('Doing login', $scope.loginData);
    UserConnector.login($scope.loginData, {
      onSuccess: function(e) {
        indicator.hide();
        WL.Analytics.enable().then(function() {
        for(var i = 0; i < 10; ++i) {
        	WL.Analytics.log({ 
            message: "This is a test message",
            type: "Test field"
          });        	
          WL.Analytics.send();
          }
        });
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