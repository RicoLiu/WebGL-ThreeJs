/**
 * Created by famer.me on 16-4-19.
 */

app.controller('loginCtrl', ['$scope',  '$rootScope', '$state', '$http', 'toaster', function ($scope, $rootScope, $state, $http, toaster) {

}]);

app.controller('mainCtrl', ['$scope',  '$rootScope', '$state', '$cookies', function ($scope, $rootScope, $state, $cookies) {
  check();
  function check() {
    if( !R.equals($cookies.get('auth'), 'pass') ){
      $state.go('login')
    }
  }
}]);
