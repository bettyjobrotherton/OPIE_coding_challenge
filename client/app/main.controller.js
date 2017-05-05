'use strict';

angular.module('mainApp')
       .controller('MainController', MainController);

MainController.$inject = ['$scope', '$window'];

function MainController($scope, $window){
  var timerInterval;
  $scope.seconds = "00";
  $scope.minutes = "0";
  $scope.displayTimer = true;
  $scope.displayStart = true;
  $scope.displayResults = false;
  $scope.displayInputs = false;
  $scope.inputTime = inputTime;
  $scope.startTimer = goToTimer;
  $scope.pauseTimer = pauseTimer;
  $scope.restartTimer = restartTimer;
  $scope.resetTimer = resetTimer;
  $scope.calculateRate = calculateRate;
  $scope.calculateInput = calculateInput;
  $scope.saveTest = saveTest;

  // $scope.$watch(function(){
  //   return $scope.seconds;
  // }, function(){
  //   return [$scope.seconds, $scope.minutes];
  // });

  function timerCount(){
    var newMinutesValue;
    var newSecondsValue;
    var secondsValue = parseInt($scope.seconds);
    var minutesValue = parseInt($scope.minutes);

    if(secondsValue == 59) {
      newMinutesValue = minutesValue + 1;
      $scope.$apply(function () {
        $scope.seconds = '00';
        $scope.minutes = newMinutesValue.toString();
      });
    } else {
      newSecondsValue = (pad(secondsValue + 1));
      $scope.$apply(function () {
        $scope.seconds = newSecondsValue.toString();
        $scope.minutes = minutesValue.toString();
      });
    }
  }

  function pad(num){
    if(num < 10){
      return "0" + num;
    } else {
      return num;
    }
  }

  function goToTimer(){
    $scope.displayTimer = true;
    $scope.displayInputs = false;
    $scope.displayResults = false;
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
    $scope.displayResults = false;
    resetTimer();
  }

  function calculateRate(){
    $window.clearInterval(timerInterval);
    timerInterval = null;
    var secs = parseInt($scope.seconds);
    var mins = parseInt($scope.minutes);
    var totalTime = (mins * 60) + secs;

    $scope.speed = 6 / totalTime;
    $scope.displayTimer = false;
    $scope.displayResults = true;
  }

  function calculateInput(){
    var secs = parseInt($scope.inputSecs);
    var mins = parseInt($scope.inputMins);
    if(!mins){
      mins = 0;
    }
    if(!secs){
      secs = 0;
    }
    var totalTime = (mins * 60) + secs;

    if(totalTime === 0){
      $scope.speed = 0;
    } else {
      $scope.speed = 6 / totalTime;
    }
    $scope.displayInputs = false;
    $scope.displayResults = true;
  }

  function saveTest(){
    var testObject = {
      rate: $scope.speed,
      pace: $scope.speedType,
      assist: $scope.assistance,
      comments: $scope.comments,
      date: new Date()
    };
    if(!$window.localStorage['timed-test-results']){
      var testArray = [testObject];
      $window.localStorage.setItem('timed-test-results', JSON.stringify(testArray));
      console.log($window.localStorage['timed-test-results']);
    } else {
      var arrayOfTests = JSON.parse($window.localStorage['timed-test-results']);
      // console.log(arrayOfTests);
      arrayOfTests.push(testObject);
      $window.localStorage.setItem('timed-test-results', JSON.stringify(arrayOfTests));
      console.log($window.localStorage['timed-test-results']);
    }
  }

}
