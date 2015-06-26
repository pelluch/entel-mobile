
/* JavaScript content from js/app.js in folder common */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }*/ 
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.venues', {
    url: "/venues",
    views: {
      'menuContent': {
        templateUrl: "templates/venues.html",
        controller: 'VenueListCtrl'
      }
    }
  })

  .state('app.traffic', {
    url: "/traffic",
    views: {
      'menuContent': {
        templateUrl: "templates/traffic.html",
        controller: 'TrafficCtrl'
      }
    }
  })
  .state('app.plan_types', {
    url: "/plan_types",
    views: {
      'menuContent': {
        templateUrl: "templates/plan_types.html",
        controller: 'PlanTypeListCtrl'
      }
    }
  })
  .state('app.plan_type', {
    url: "/plan_types/:planTypeId",
    views: {
      'menuContent': {
        templateUrl: "templates/plan_type.html",
        controller: 'PlanTypeCtrl'
      }
    }
    
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/plan_types');
});
