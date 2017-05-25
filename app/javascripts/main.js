
var app = angular.module('app', [ 'ui.router', 'jsonFormatter', 'ui.bootstrap', 'ngBootstrap', 'ngCookies', 'toaster' ]);


app.controller('rootCtrl', ['$scope', function ($scope) {}]);

app.controller('errorCtrl', ['$scope', '$state', function ($scope, $state) {
  $state.go('error');
}]);

app.controller('parentCtrl', ['$scope', function ($scope) {

}]);
