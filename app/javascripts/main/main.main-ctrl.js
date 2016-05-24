/**
 * Created by famer.me on 16-4-19.
 */

app.controller('loginCtrl', ['$scope',  '$rootScope', '$state', '$http', 'toaster', function ($scope, $rootScope, $state, $http, toaster) {
  //Three.js 基础

  //var scene = new THREE.Scene();//场景
  //
  //var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);//相机
  //
  //var renderer = new THREE.WebGLRenderer();//渲染器
  //renderer.setClearColor('#FFFFFF');//设置背景颜色
  //
  //renderer.setSize(window.innerWidth, window.innerHeight);
  //
  //document.body.appendChild(renderer.domElement);
  //
  //var geometry = new THREE.CubeGeometry(1,1,1);
  //var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  //var objectTotal = new THREE.Object3D();
  //var cube = new THREE.Mesh(geometry,material);
  //
  //objectTotal.add(cube);
  //
  //camera.position.z = 5;//设置相机位置
  //camera.position.x = 3;
  //
  //
  //var axisHelper = new THREE.AxisHelper(4);
  //objectTotal.add(axisHelper);
  //
  //scene.add(objectTotal);
  //
  //function render () {
  //  requestAnimationFrame(render);
  //  objectTotal.rotation.y += 0.01;
  //  objectTotal.rotation.z += 0.1;
  //  //console.log(objectTotal.rotation.y)
  //  renderer.render(scene,camera)
  //}
  //
  //render();


  //绘制点、线,三角形

  var renderer;
  var camera;
  var scene;
  var light;
  var cube;
  var line;
  var width;
  var height;



  function initThree () {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1.0);
  }

  function initCamera () {
    camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
    //唯一的决定了相机的摆放位置
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 600;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
      x:0,
      y:0,
      z:0
    })
  }

  function initScene () {
    scene = new THREE.Scene();
  }

  function initLight () {
    light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  function initObject () {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ vertexColors:true });
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xff0000), color3 = new THREE.Color(0x00ff00);
    var objectTotal = new THREE.Object3D();
    var axisHelper = new THREE.AxisHelper(400);

    var p1 = new THREE.Vector3(-200, 0, 0);
    var p2 = new THREE.Vector3(0, 100, 0);
    var p3 = new THREE.Vector3(0, 0, 100);

    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.vertices.push(p3);
    geometry.vertices.push(p1);

    geometry.colors.push( color1, color2, color3, color1);

    line = new THREE.Line( geometry, material, THREE.LineSegments );
    objectTotal.add(line);
    objectTotal.add(axisHelper);
    scene.add(objectTotal);
  }

  function animation () {
    //line.position.x -= 1;
    camera.position.x += 10;
    camera.position.z += 10;
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
