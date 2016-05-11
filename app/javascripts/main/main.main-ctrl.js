/**
 * Created by famer.me on 16-4-19.
 */

app.controller('loginCtrl', ['$scope',  '$rootScope', '$state', '$http', 'toaster', function ($scope, $rootScope, $state, $http, toaster) {
  //$scope.login = function () {
  //  $scope.addData = {
  //    username: $scope.username,
  //    password: $scope.password
  //  }
  //  $http.post('/api/login', $scope.addData)
  //    .then(function (res) {
  //      //handle data
  //    }, function (res) {
  //      toaster.pop('error', '登录失败，用户名或密码错误', null, 2000, 'toast-top-full-width-login');
  //    });
  //}
  var width;
  var height;
  var renderer;
  function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
  }

  var camera;
  function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 600;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
      x : 0,
      y : 0,
      z : 0
    });
  }

  var scene;
  function initScene() {
    scene = new THREE.Scene();
  }

  var light;
  function initLight() {
    light = new THREE.AmbientLight(0xFF0000);
    light.position.set(100, 100, 200);
    scene.add(light);
    light = new THREE.PointLight(0x00FF00);
    light.position.set(0, 0,300);
    scene.add(light);
  }

  var cube;
  var mesh;
  function initObject() {
    var geometry = new THREE.CylinderGeometry( 100,150,400);
    var material = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
    mesh = new THREE.Mesh( geometry,material);
    mesh.position = new THREE.Vector3(0,0,0);
    scene.add(mesh);
  }

  function animation()
  {
    mesh.position.x-=1;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }

    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    animation();





}]);

app.controller('mainCtrl', ['$scope',  '$rootScope', '$state', '$cookies', function ($scope, $rootScope, $state, $cookies) {
  check();
  function check() {
    if( !R.equals($cookies.get('auth'), 'pass') ){
      $state.go('login')
    }
  }
}]);
