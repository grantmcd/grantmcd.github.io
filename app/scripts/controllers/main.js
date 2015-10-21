'use strict';

/**
 * @ngdoc function
 * @name grantmcdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grantmcdApp
 */
angular.module('grantmcdApp')
  .controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.contacts2 = [{
        name: "Email",
        link: ""
      }, {
        name: "LinkedIn",
        link: ""
      }, {
        name: "Twitter",
        link: ""
      }, {
        name: "Google+",
        link: ""
      }, {
        name: "Github",
        link: ""
      }];

      $scope.projects = [{
        name: "Dskus",
        description: "An app to allow communication between an individual presenting and their audience. Users are able to create or join \"discussions\" where they can answer polls or questions from the presenter. Uses Parse for data storage and PubNub for real time communication between devices. Built with AngularJS. I plan on open sourcing this once I've made more progress.",
        link: ""
      }, {
        name: "Steam Crawler",
        description: "My senior design project requires a large amount of Steam game data which isn't available via an API, so I'm currently building an HTML crawler using jSoup to gather as much data as possible from the games' store pages.",
        link: "https://github.com/grantmcd/steam-crawl"
      }, {
        name: "Portfolio",
        description: "The site you're currently viewing is made with AngularJS and Bootstrap. One of my main goals with this most recent redesign was to learn how to use Travis CI to speed up the deployment process.",
        link: "https://github.com/grantmcd/grantmcd.github.io"
      }, ];

      $scope.bioText = "Welcome to my little corner of the web. I'm currently in my senior year studying Software Engineering at Iowa State University. At the moment, most of my work has been with web development on a variety of projects. Feel free to check out some of their repositories below. If you have any questions or just want to say hi, <a href='mailto:grantmcd@outlook.com'>shoot me an email</a>.";
      $scope.subTitleText = "Software Developer, Designer, Student";
    }
  ]);
