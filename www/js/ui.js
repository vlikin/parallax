'use strict';

var app = angular.module('parallax/ui', [
])

.controller('FrameController', function ($scope) {
  $scope.greeting = 'Hello from Viktor.';
})

.run(function () {});