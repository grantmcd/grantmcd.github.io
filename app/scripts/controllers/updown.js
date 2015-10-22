'use strict';

/**
 * @ngdoc function
 * @name grantmcdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grantmcdApp
 */
angular.module('grantmcdApp')
  .controller('UpdownCtrl', ['$scope', '$http',
    function($scope, $http) {

      Parse.initialize("X9c7UH7ZkTAu1j9EQ6yE3SHD8SKiqkZTPclZ67Sh", "WgUaoGkH6IbNgUBUw9dLpS4vWP5ZoDULQ3ZGrcu5");
      $scope.message = "hello world";
      $scope.count = 25;
    }
  ]);
