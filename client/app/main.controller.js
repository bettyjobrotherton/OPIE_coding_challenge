'use strict';

angular.module('mainApp')
       .controller('MainController', MainController);

MainController.$inject = ['$scope', '$window'];

function MainController($scope, $window){
  var timerInterval;
  $scope.seconds = "00";
  $scope.minutes = "0";
  $scope.displayTimer = false;
  $scope.displayStart = false;
  $scope.displayResults = false;
  $scope.displayInputs = false;
  $scope.inputTime = inputTime;
  $scope.startTimer = startTimer;
  $scope.pauseTimer = pauseTimer;
  $scope.restartTimer = restartTimer;
  $scope.resetTimer = resetTimer;
  $scope.calculateRate = calculateRate;
  $scope.calculateInput = calculateInput;

  $scope.$watch(function(){
    return $scope.seconds;
  }, function(){
    $scope.secondsDisplay = $scope.seconds;
    $scope.minutesDisplay = $scope.minutes;
  });

  function timerCount(){
    var newMinutesValue;
    var newSecondsValue;
    var secondsValue = parseInt($scope.seconds);
    var minutesValue = parseInt($scope.minutes);

    if(secondsValue == 59) {
      $scope.seconds = '00';
      newMinutesValue = minutesValue + 1;
      $scope.minutes = newMinutesValue.toString();
    } else {
      newSecondsValue = (pad(secondsValue + 1));
      $scope.seconds = newSecondsValue.toString();
      $scope.minutes = minutesValue.toString();
      console.log($scope.seconds);
    }
  }

  function pad(num){
    if(num < 10){
      return "0" + num;
    } else {
      return num;
    }
  }

  function startTimer(){
    $scope.displayTimer = true;
    $scope.displayInputs = false;
    if(!timerInterval){
      timerInterval = $window.setInterval(timerCount, 1000);
    }
  }

  function pauseTimer(){
    $window.clearInterval(timerInterval);
    timerInterval = null;
    $scope.displayStart = true;
  }

  function restartTimer(){
    if(!timerInterval){
      timerInterval = $window.setInterval(timerCount, 1000);
    }
    $scope.displayStart = false;
  }

  function resetTimer(){
    $scope.seconds = '00';
    $scope.minutes = '0';
    $window.clearInterval(timerInterval);
    timerInterval = null;
    $scope.displayStart = true;
  }

  function inputTime(){
    $scope.displayInputs = true;
    $scope.displayTimer = false;
    resetTimer();
  }

  function calculateRate(){
    $window.clearInterval(timerInterval);
    timerInterval = null;
    var secs = parseInt($scope.seconds);
    var mins = parseInt($scope.minutes);
    var totalTime = (mins * 60) + secs;

    $scope.speed = 6 / totalTime;
    $scope.displayResults = true;
  }

  function calculateInput(){
    console.log('made it');
    var secs = parseInt($scope.inputSecs);
    var mins = parseInt($scope.inputMins);
    var totalTime = (mins * 60) + secs;

    $scope.speed = 6 / totalTime;
    $scope.displayResults = true;
  }

}
