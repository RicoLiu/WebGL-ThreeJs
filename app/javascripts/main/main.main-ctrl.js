
app.controller('loginCtrl', ['$scope',  '$rootScope', '$state', '$http', 'toaster', function ($scope, $rootScope, $state, $http, toaster) {
  $scope.submit = function () {
    console.log('coming--------');
    $state.go('main');
  }
  
}]);

app.controller('mainCtrl', ['$scope',  '$rootScope', '$state', '$cookies', function ($scope, $rootScope, $state, $cookies) {
  //验证权限是否通过
  // check();
  // function check() {
  //   if( !R.equals($cookies.get('auth'), 'pass') ){
  //     $state.go('login')
  //   }
  // }
}]);
