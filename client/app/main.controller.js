'use strict';

angular.module('mainApp')
       .controller('MainController', MainController);

MainController.$inject = ['$scope', '$window'];

function MainController($scope, $window){
  var timerInterval;
  $scope.seconds = "00";
  $scope.minutes = "0";
  $scope.startTimer = startTimer;

  function timerCount(){
    var newMinuteValue;
    var newSecondsValue;

    if($scope.seconds == null){
      var secondsValue = 0;
    } else {
      var secondsValue = parseInt($scope.seconds);
    }
    if($scope.minutes == null){
      var minutesValue = 0;
    } else {
      var minutesValue = parseInt($scope.minutes);
    }

    if(secondsValue == 59) {
      $scope.seconds = '00';
      newMinuteValue = minutesValue + 1;
      $scope.minutes = newMinuteValue.toString();
    } else {
      console.log('oh yeah!')
      newSecondsValue = (pad(secondsValue + 1));
      $scope.seconds = newSecondsValue.toString();
      $scope.minutes = minutesValue.toString();
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
    if(!timerInterval){
      timerInterval = $window.setInterval(timerCount, 1000);
    }
  }

}
