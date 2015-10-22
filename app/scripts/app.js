'use strict';

/**
 * @ngdoc overview
 * @name grantmcdApp
 * @description
 * # grantmcdApp
 *
 * Main module of the application.
 */
angular
  .module('grantmcdApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/updown', {
        templateUrl: 'views/updown.html',
        controller: 'UpdownCtrl',
        controllerAs: 'updown'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
