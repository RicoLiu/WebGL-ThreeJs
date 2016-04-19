/**
 * Created by famer.me on 16-4-19.
 */

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'JSONFormatterConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, JSONFormatterConfigProvider) {
  //
  // 在请求中发送 X-Requested-With 头，以向服务器声明这是一个来自xhr的请求
  $httpProvider.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
  };

  //
  // 默认启用html5模式，使用history api
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  //默认标志请求为xhr
  // 启用history api
  //var currentDate = new Date();
  //var expireDate = currentDate.setDate(currentDate.getDate()+1);
  //$cookiesProvider.defaults.expires = expireDate;
  //$cookiesProvider.defaults.path = '/';
  JSONFormatterConfigProvider.hoverPreviewEnabled = true;
  window.httpProvider = $httpProvider;
  $httpProvider.defaults.headers.common.pageSize = 1000;
  $httpProvider.defaults.headers.common.pageNum = 1;
  $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
  $httpProvider.defaults.headers.common.Pragma = "no-cache";
  $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
  $urlRouterProvider
    .otherwise('/login');
  $stateProvider
    .state('login',{
      url: '/login',
      views: {
        'root@': {
          templateUrl: "/partial/main/login.html",
          controller: 'loginCtrl'
        }
      }
    })
    .state('main',{
      views: {
        'root@': {
          templateUrl: "/partial/main/main.html",
          controller: 'mainCtrl'
        }
      }
    })



}]);

app.value('timeOut', 500);
app.run(['$window', '$rootScope', '$state', '$stateParams', 'timeOut', function ($window, $rootScope, $state, $stateParams, timeOut) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$stateChangeStart', function () {
    //NProgress.start();
  });
  $rootScope.$on('$stateChangeSuccess', function () {
    //NProgress.set(0.999);
    //setTimeout(NProgress.done, timeOut);
  });
  $rootScope.$on('$stateChangeError', function () {
    //NProgress.set(0.0);
  });
}]);
