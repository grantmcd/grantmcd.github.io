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
        description: "An app to allow communication between an individual presenting and their audience. Users are able to create or join \"discussions\" where they can answer polls or questions from the presenter. Dskus uses Parse for data storage and PubNub for real time communication between users. It's built with AngularJS. I plan on open sourcing this once I've made more progress.",
        linkText: "Alpha Web App",
        link: "http://dskus.parseapp.com/#/main"
      }, {
        name: "Steam Crawler",
        description: "My senior design project requires a large amount of Steam game data which isn't available via an API, so I'm currently building an HTML crawler using jSoup to gather as much data as possible from the games' store pages.",
        linkText: "GitHub",
        link: "https://github.com/grantmcd/steam-crawl"
      }, {
        name: "Portfolio",
        description: "The site you're currently viewing is made with AngularJS and Bootstrap. One of my main goals with this most recent redesign was to learn how to use Travis CI to speed up the deployment process and to tinker with web typography.",
        linkText: "GitHub",
        link: "https://github.com/grantmcd/grantmcd.github.io"
      }, ];

      $scope.experiments = [{
        name: "Steam User Graph",
        description: "This simple app was made during the research phase of my senior design project. My goals when working on this app were to become familiar with Steam's public API as well as to use the Sigma.js library for displaying graphs in the canvas element. Because Steam's API does not allow CORS, you will need to disable security in your browser for the app to function.",
        linkText: "Web App",
        link: "http://may1635.sd.ece.iastate.edu/#/experiment",
        image: "steam-graph.png"
      }];

      $scope.chosenExperiment = $scope.experiments[0];

      $scope.bioText = "<b>Hello!</b> Welcome to my little corner of the web. I'm currently in my senior year studying Software Engineering at Iowa State University. At the moment, most of my work has been with web development on a variety of projects. Feel free to check out some of my git repos below. If you have any questions or just want to say hi, <a href='mailto:grantmcd@outlook.com'>shoot me an email</a>.";
      $scope.subTitleText = "Software Developer, Designer, Student";

      $scope.chooseExperiment = function(experiment) {
        if (experiment == $scope.chosenExperiment)
          $scope.chosenExperiment = '';
        else
          $scope.chosenExperiment = experiment;
      };

      $scope.openWindow = function(url) {
        window.open(url);
      };
    }
  ]);
