'use strict';

angular.module('mainApp')
       .controller('MainController', MainController);

MainController.$inject = ['$scope'];

function MainController($scope){
  $scope.something = "Hey ya'll!";
}
