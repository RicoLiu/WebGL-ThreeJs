/**
 * Created by famer.me on 16-4-19.
 */

app.controller('loginCtrl', ['$scope',  '$rootScope', '$state', '$http', 'toaster', function ($scope, $rootScope, $state, $http, toaster) {
  $scope.login = function () {
    $scope.addData = {
      username: $scope.username,
      password: $scope.password
    }
    $http.post('/api/login', $scope.addData)
      .then(function (res) {
        //handle data
      }, function (res) {
        toaster.pop('error', '登录失败，用户名或密码错误', null, 2000, 'toast-top-full-width-login');
      });
  }

}]);

app.controller('mainCtrl', ['$scope',  '$rootScope', '$state', '$cookies', function ($scope, $rootScope, $state, $cookies) {
  check();
  function check() {
    if( !R.equals($cookies.get('auth'), 'pass') ){
      $state.go('login')
    }
  }
}]);
