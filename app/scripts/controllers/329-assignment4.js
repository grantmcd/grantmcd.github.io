'use strict';

/**
 * @ngdoc function
 * @name 329Assignment4App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the 329Assignment4App
 */
angular.module('grantmcdApp')
  .controller('329Assignment4', ['$scope', '$http',
    function($scope, $http) {
      $scope.newTaskDuration = 1;
      $scope.tasks = [];
      $scope.currentDependencies = [];
      $scope.calculatedPath = false;
      $scope.addedTaskIds = [];
      $scope.showError = false;
      $scope.errorMessage = "";
      $scope.addedTaskIds = [];

      $scope.addTask = function() {
        $scope.showError = false;
        $scope.errorMessage = "";
        $scope.criticalPaths = [];

        if ($scope.addedTaskIds.indexOf($scope.newTaskId) > -1) {
          $scope.showError = true;
          $scope.errorMessage = "Task ID must be unique.";
          return -1;
        }
        $scope.calculatedPath = false;
        $scope.addedTaskIds.push($scope.newTaskId);
        var newTask = {
          id: $scope.newTaskId,
          duration: $scope.newTaskDuration,
          dependencies: new Array(),
          dependents: new Array(),
          es: null,
          ef: null,
          ls: null,
          lf: null,
          criticalCost: null
        };

        for (var i = 0; i < $scope.tasks.length; i++) {
          if ($scope.currentDependencies[$scope.tasks[i].id]) {
            newTask.dependencies.push($scope.tasks[i].id);
            $scope.tasks[i].dependents.push($scope.newTaskId);
          }
        }

        $scope.newTaskId = "";
        $scope.newTaskDuration = 1;
        $scope.currentDependencies = [];
        $scope.tasks.push(newTask);
      };

      $scope.addTaskFromFile = function(textLine) {
        var tokens = textLine.split(" ");
        var string = "";
        var newTaskId = "";
        var newTaskDuration = 0;
        var newTaskDependencies = [];

        for (var i = 0; i < tokens.length; i++) {
          if (i == 0)
          {
            newTaskId = tokens[i].trim();
            if ($scope.addedTaskIds.indexOf(newTaskId) > -1) {
              $scope.showError = true;
              $scope.errorMessage = "Task ID must be unique.";
              return -1;
            }
            $scope.$apply(function(){
              $scope.addedTaskIds.push(newTaskId);
            });
          }

          else if (i == 1)
            newTaskDuration = parseInt(tokens[i]);
          else if (i == 2) {
            var dependencyIds = tokens[i].split(",");
            for (var j = 0; j < dependencyIds.length; j++) {
              if($scope.addedTaskIds.indexOf(dependencyIds[j].trim()) < 0)
                {
                  $scope.showError = true;
                  $scope.errorMessage = "Check your input file. Tasks must be created before they can be set as dependencies. ";
                  return -1;
                }
              newTaskDependencies.push(dependencyIds[j].trim());
              for (var k = 0; k < $scope.tasks.length; k++) {
                if ($scope.tasks[k].id.trim() == dependencyIds[j].trim()) {
                  $scope.tasks[k].dependents.push(newTaskId);
                }
              }
            }
          }
        }
        if (newTaskId != "" && newTaskDuration > 0) {
          var newTask = {
            id: newTaskId,
            duration: newTaskDuration,
            dependencies: newTaskDependencies,
            dependents: new Array(),
            es: null,
            ef: null,
            ls: null,
            lf: null,
            criticalCost: null
          };
          $scope.$apply(function() {
            $scope.tasks.push(newTask);
            return 0
          });

        }
      };

      $scope.criticalPaths = [];

      $scope.recursivePathSearch = function(taskArray, taskIndex, currentPath, currentCost) {
        for (var i = 0; i < taskArray[taskIndex].dependents.length; i++) {
          var nextTaskIndex = 0;
          for (var j = 0; j < taskArray.length; j++) {
            if (taskArray[j].id == taskArray[taskIndex].dependents[i]) {
              nextTaskIndex = j;
              break;
            }
          }
          var newCurrentCost = currentCost + taskArray[nextTaskIndex].duration;
          var newCurrentPath = currentPath.concat();

          newCurrentPath.push(taskArray[nextTaskIndex].id);
          if (newCurrentCost == $scope.longestFinalPath) {
            $scope.criticalPaths.push(newCurrentPath);
          } else {
            $scope.recursivePathSearch(taskArray, nextTaskIndex, newCurrentPath, newCurrentCost);
          }

        }

      };

      $scope.findCriticalPath = function(taskArray) {
        for (var i = 0; i < taskArray.length; i++) {
          if (taskArray[i].dependencies.length == 0) {
            var currentPath = new Array();
            currentPath.push(taskArray[i].id);
            $scope.recursivePathSearch(taskArray, i, currentPath, taskArray[i].duration);
          }

        }
      };


      $scope.findPath = function(taskArray) {
        $scope.criticalPaths = [];
        $scope.showError = false;
        $scope.errorMessage = "";

        for (var i = 0; i < taskArray.length; i++) {
          if (taskArray[i].dependencies.length == 0) {
            taskArray[i].es = 0;
            taskArray[i].ef = taskArray[i].duration;
          } else {
            for (var j = 0; j < taskArray[i].dependencies.length; j++) {
              for (var k = 0; k < taskArray.length; k++) {
                if (taskArray[i].dependencies[j] == taskArray[k].id) {
                  if (taskArray[i].es == null || taskArray[i].es < taskArray[k].ef) {
                    taskArray[i].es = taskArray[k].ef;
                    taskArray[i].ef = taskArray[k].ef + taskArray[i].duration;
                  }
                }
              }

            }
          }
        }

        var longestFinalPath = 0;


        for (var i = 0; i < taskArray.length; i++) {
          if (taskArray[i].ef > longestFinalPath)
            longestFinalPath = taskArray[i].ef;
        }
        $scope.longestFinalPath = longestFinalPath;

        for (var i = taskArray.length - 1; i >= 0; i--) {
          if (taskArray[i].dependents.length == 0) {
            taskArray[i].lf = longestFinalPath;
            taskArray[i].ls = longestFinalPath - taskArray[i].duration;
          } else {
            for (var j = 0; j < taskArray[i].dependents.length; j++) {
              for (var k = taskArray.length - 1; k >= 0; k--) {
                if (taskArray[i].dependents[j] == taskArray[k].id) {
                  if (taskArray[i].lf == null || taskArray[i].lf > taskArray[k].ls) {
                    taskArray[i].lf = taskArray[k].ls;
                    taskArray[i].ls = taskArray[k].ls - taskArray[i].duration;
                  }
                }
              }

            }
          }
        }
        $scope.findCriticalPath(taskArray);
        $scope.calculatedPath = true;
      };



      $scope.clearTasks = function() {
        $scope.calculatedPath = false;
        $scope.tasks = new Array();
        $scope.currentDependencies = [];
        $scope.addedTaskIds = [];
        $scope.criticalPaths = [];
      };

      $scope.inputtedFile = false;
      $scope.uploadFileInput = function(evt) {
        $scope.$apply(function() {
          $scope.showError = false;
          $scope.errorMessage = "";
          $scope.clearTasks();
        });

        if (window.File && window.FileReader && window.FileList && window.Blob) {
          var f = evt.target.files[0];

          //Retrieve the first (and only!) File from the FileList object
          if (f) {
            var r = new FileReader();
            r.onload = function(e) {

              var fileText = r.result;
              var lines = fileText.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
              for (var i = 0; i < lines.length; i++) {
                var result = $scope.addTaskFromFile(lines[i]);
                if(result == -1)
                {
                  $scope.$apply(function() {
                    $scope.inputtedFile = true;
                    $scope.clearTasks();
                  });
                  return -1;
                }

              }
              $scope.$apply(function() {
                $scope.inputtedFile = true;
              });

            }
            r.readAsText(f);

          } else {
            alert("Failed to load file. Try again.");
          }

        } else {
          alert('The File APIs are not fully supported by your browser. You will need to enter inputs manually :(');
        }

      };


    }
  ]);
