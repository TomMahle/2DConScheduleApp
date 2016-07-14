import {timeRangeToDisplayString} from './dateHelper';

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ScheduleCtrl', ($scope, Events) => {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event: blah
  // 
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.timeRangeToDisplayString = timeRangeToDisplayString;
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  };
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.event = Events.get($stateParams.eventId);
  $scope.timeRangeToDisplayString = timeRangeToDisplayString;
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});