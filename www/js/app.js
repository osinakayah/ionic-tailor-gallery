// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('fafa', ['ionic', 'ionic-material', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "modules/sign/login.html",
      controller:'UserCtrl'
    })

    .state('register', {
      url: "/register",
      templateUrl: "modules/sign/register.html",
      controller:'UserCtrl'
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "modules/menu.html"
    })

    .state('category', {
      url: "/dash/:category",
      templateUrl: "modules/category/index.html",
       controller:'CategoryCtrl'
    })

    .state('tailor', {
      url: "/tailor",
      templateUrl: "modules/tailor/profile.html",
       controller:'TailorCtrl'
    })

     .state('app.dash', {
      url: '/dash',
      views: {
        'menuContent': {
          templateUrl: 'modules/home.html',
          controller:'HomeCtrl'
        }
      }
    })

     .state('app.notification', {
      url: '/notification',
      views: {
        'menuContent': {
          templateUrl: 'modules/notification/home.html',
          controller:'NotificationCtrl'
        }
      }
    })

     .state('app.clothes', {
      url: '/clothes',
      views: {
        'menuContent': {
          templateUrl: 'modules/clothes/my_clothes.html',
          controller:'ClothCtrl'
        }
      }
    })

     .state('app.pending_clothes', {
      url: '/pending_clothes',
      views: {
        'menuContent': {
          templateUrl: 'modules/clothes/pending.html',
          controller:'ClothCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'modules/sign/profile.html',
          controller:'UserCtrl'
        }
      }
    })

    $urlRouterProvider.otherwise('/app/dash');
  });
