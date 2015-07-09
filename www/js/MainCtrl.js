angular.module('timer')
  .controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.counter = 0;
    var userTimeout = null; // the current timeoutID

    // Timer FUNCTION: counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) { //if 0, end timer and broadcast info
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(userTimeout);
            return;
        }
        $scope.counter--; //decrement
        userTimeout = $timeout($scope.onTimeout, 1000); //recursively call until ended above at 0.
    };
    // START TIMER
    $scope.startTimer = function() {
        userTimeout = $timeout($scope.onTimeout, 1);
    };
    //RESET TIMER
    $scope.resetTimer = function () {
      $scope.counter = 0;
      $timeout.cancel(userTimeout);
    };
    // STOP and RESET the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $timeout.cancel(userTimeout);
    };
    // Triggered when timer stops. Perform actions when counter reaches zero.
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
          console.log('your time ran out!');
          navigator.vibrate(3000);
          navigator.notification.beep(1);
          navigator.notification.alert('RED ALERT');
        }
    });
    //grabbing keypad numbers
    $scope.number = function(num){
      num = num.toString();
      if($scope.counter === 0){
        $scope.counter = num; //replacing counter with single number
      }else{
        $scope.counter += num; //add string numbers together and then replacing counter
      }
    }

}]);//end of controller
