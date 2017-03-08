/**
 * 
 * AngularJS mtg-box
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 * 
 */
;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('mtg-box', [
      'ui.router',
      'ngMaterial'
    ])
    .config(config)
    .run(['$state', function ($state) {}]);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider', '$httpProvider', '$mdThemingProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    // theming
    $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
    .backgroundPalette('grey', {
      default: '100'
    });

    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider.state('main', {
      abstract: true,
      url: '',
      templateUrl: '../views/main.tmp.html',
      controller: 'MainController'
    });

    $stateProvider.state('main.box', {
      url:'/',
      templateUrl: '../views/box.tmp.html'
    });

    $urlRouterProvider.otherwise('/');
  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
  angular
    .module('mtg-box')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('mtg-box')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }


})();