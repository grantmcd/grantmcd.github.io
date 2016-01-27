'use strict';

/**
 * @ngdoc function
 * @name grantmcdApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the grantmcdApp
 */
angular.module('grantmcdApp')
  .controller('TestCtrl', ['$scope', '$timeout',
    function($scope, $timeout) {

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
        linkText: "Beta Web App",
        link: "http://dskus.parseapp.com/#/"
      }, {
        name: "Task Manager",
        description: "I started working on this app because I was tired of looking for a dead simple task manager that syncs across all devices. It's a work in progress and I'm still thinking of a clever name for the app. Once the web app is finished, the plan is to build a mobile version for Android as well.",
        linkText: "Beta Web App",
        link: "http://todomcd.parseapp.com"
      }, {
        name: "Steam Crawler",
        description: "My senior design project requires a large amount of Steam game data which isn't available via an API, so I'm currently building an HTML crawler using jSoup to gather as much data as possible from the games' store pages.",
        linkText: "GitHub",
        link: "https://github.com/grantmcd/steam-crawl"
      }, {
        name: "Green Apartment Prototype",
        description: "Worked with the Director of Sustainability for Iowa State University to gather requirements for a Green Apartment Application that will be created in a future senior design project. The purpose of the app is to allow a user to recreate the layout of their apartment along with any energy consuming items within. Tips and a score related to how environmentally friendly the user's apartment is would be displayed. This UI prototype served as a proof of concept for the final product. I built the apartment visualization component of the app using the <a href='http://fabricjs.com/'>Fabric.js</a> library for easy canvas manipulation.",
        linkText: "Prototype",
        link: "http://grantmcd.com/409-pages"
      }, {
        name: "Portfolio",
        description: "The site you're currently viewing is made with AngularJS and Bootstrap. One of my main goals with this most recent redesign was to learn how to use Travis CI to speed up the deployment process and to tinker with web typography.",
        linkText: "GitHub",
        link: "https://github.com/grantmcd/grantmcd.github.io"
      }];

      $scope.experiments = [{
        name: "Steam User Graph",
        description: "This simple app was made during the research phase of my senior design project. My goals when working on this app were to become familiar with Steam's public API as well as to use the Sigma.js library for displaying graphs in the canvas element. Because Steam's API does not allow CORS, you will need to disable security in your browser for the app to function.",
        linkText: "Web App",
        link: "http://may1635.sd.ece.iastate.edu/#/graph",
        image: "steam-graph.png"
      }, {
        name: "PDM Schedule Creator",
        description: "This tool was built for a class project, but it could be useful to others planning out their projects. The web app allows users to create tasks with a duration in weeks and assign any dependent tasks. Once finished, a report will be generated allowing a user to see the order of their tasks and when they need to be started and finished by. It also was a good opportunity to try out the HTML5 FileReader API for the first time.",
        linkText: "Web App",
        link: "/#/329-assignment4",
        image: ""
      }];

      $scope.chosenExperiment = $scope.experiments[0];

      $scope.bioText = "<b>Hello!</b> Welcome to my little corner of the web. I'm currently in my senior year studying Software Engineering at Iowa State University. At the moment, most of my work has been with web development on a variety of projects. Feel free to check out some of them below. If you have any questions or just want to say hi, <a href='mailto:grantmcd@outlook.com'>shoot me an email</a>.";
      $scope.subTitleText = "Software Developer, Web Designer, Student";

      $scope.chooseExperiment = function(experiment) {
        if (experiment == $scope.chosenExperiment)
          $scope.chosenExperiment = '';
        else
          $scope.chosenExperiment = experiment;
      };

      $scope.openWindow = function(url) {
        window.open(url);
      };


      var scene, world, eventListener;
      init();
      $scope.finishedAnimation = false;
      $scope.finishAnimation = function() {
        $scope.$apply(function() {
          $scope.finishedAnimation = true;
        });


      };


      function init() {
        scene = new voxelcss.Scene();
        //scene.disableOrbit();
        scene.addEventListener('zoom', function() {
          console.log(scene.getZoom());
        });

        scene.rotate(-Math.PI / 4, Math.PI / 4, 0);
        scene.attach(document.getElementById("voxelContainer"));

        var lightSource = new voxelcss.LightSource(300, 300, 300, 750, 0.3, 1);
        world = new voxelcss.World(scene);

        //eventListener = new EventListener();

        var purpleFace = new voxelcss.ColorFace("#03a9f4");

        var meshTop = new voxelcss.Mesh();
        meshTop.setTop(purpleFace);
        var meshLeft = new voxelcss.Mesh();
        meshLeft.setLeft(purpleFace);
        var meshRight = new voxelcss.Mesh();
        meshRight.setFront(purpleFace);
        var meshCube = new voxelcss.Mesh();
        meshCube.setFaces(purpleFace);


        var nameArray = [{
          "x": 1,
          "y": 1,
          "z": 0,
          "side": "top"
        }, {
          "x": 1,
          "y": 1,
          "z": -1,
          "side": "top"
        }, {
          "x": 0,
          "y": 1,
          "z": -1,
          "side": "top"
        }, {
          "x": -1,
          "y": 1,
          "z": -1,
          "side": "top"
        }, {
          "x": -1,
          "y": 1,
          "z": -1,
          "side": "left"
        }, {
          "x": -1,
          "y": 0,
          "z": -1,
          "side": "left"
        }, {
          "x": -1,
          "y": -1,
          "z": -1,
          "side": "left"
        }, {
          "x": -1,
          "y": -1,
          "z": 0,
          "side": "left"
        }, {
          "x": -1,
          "y": -1,
          "z": 1,
          "side": "left"
        }, {
          "x": -1,
          "y": -1,
          "z": 1,
          "side": "right"
        }, {
          "x": 0,
          "y": -1,
          "z": 1,
          "side": "right"
        }, {
          "x": 1,
          "y": -1,
          "z": 1,
          "side": "right"
        }, {
          "x": 1,
          "y": 0,
          "z": 1,
          "side": "right"
        }, {
          "x": 1,
          "y": 1,
          "z": 1,
          "side": "right"
        }, {
          "x": 0,
          "y": 1,
          "z": 1,
          "side": "right"
        }];

        var i = 0;

        function AddVoxel() {
          if (i >= nameArray.length) {

            setTimeout($scope.finishAnimation, 1000);

            return;
          }

          var json = nameArray[i++];
          var chosenMesh;

          if (json.side == 'top')
            chosenMesh = meshTop;
          else if (json.side == 'left')
            chosenMesh = meshLeft;
          else if (json.side == 'right')
            chosenMesh = meshRight;

          var voxel = new voxelcss.Voxel(json.x * 100, json.y * 100, json.z * 100, 100, {
            mesh: chosenMesh
          });
          voxel.animDown(scene);
          setTimeout(AddVoxel, 150);

        }
        AddVoxel();


      }
    }
  ]);
