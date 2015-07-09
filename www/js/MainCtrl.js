angular.module('timer')
  .controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.counter = 0;
    var userTimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(userTimeout);
            return;
        }
        $scope.counter--;
        userTimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        userTimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        // $scope.counter = 30;
        $timeout.cancel(userTimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });
    //grabbing numbers
    $scope.number = function(num){
      num = num.toString();
      $scope.counter += num;
    }
}]);
