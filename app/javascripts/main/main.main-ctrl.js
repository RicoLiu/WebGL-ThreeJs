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
  var param;
  var line;
  var foo;
  var texture = null;
  var width;
  var height;

  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  createUI();
  animation();



  function initThree () {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1.0);

    window.addEventListener('resize', onWindowResize, false)
  }

  function initCamera () {
    camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);//透视投影相机
    //camera = new THREE.OrthographicCamera(width / -2, width/2, height/2, height/-2, 10, 1000);//正投影相机

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
    var ParamObj = function () {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
    param = new ParamObj()
    var gui = new dat.GUI()
    gui.add(param,"x",-10000,10000).name("方向光X的位置")
    gui.add(param,"y",-10000,10000).name("方向光Y的位置")
    gui.add(param,"z",-10000,10000).name("方向光Z的位置")

    light = new THREE.DirectionalLight(0xffff00,1.0);
    //light = new THREE.DirectionalLight()
    light.position.set(param.x, param.y, param.z);
    scene.add(light);
  }

  function initObject () {
    /*var geometry = new THREE.CylinderGeometry(70,100,500);
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

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

    var mesh = new THREE.Mesh( geometry, material)
    mesh.position.set(300, 0, 0)

    scene.add(mesh);*/

    /*for (var i = 0; i < 5; i++) {
      var geometry = new THREE.BoxGeometry(60,100,80)
      var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 })
      var mesh = new THREE.Mesh( geometry, material )

      switch (i) {
        case 0:
          mesh.position.set(0, 0, 0)
          break;
        case 1:
          mesh.position.set(i*100, 0, 0)
          break;
        case 2:
          mesh.position.set(i*-100, 0, 0)
          break;
        case 3:
          mesh.position.set(0, i*100, 0)
          break;
        case 4:
          mesh.position.set(0, i*-100, 0)
          break;
      }

      scene.add(mesh)
    }*/

    /*var geometry = new THREE.PlaneGeometry(500, 300, 10, 10)
    var material;
    var loader = new THREE.TextureLoader();
    loader.load(
      //加载图片路径
      'images/background.png',
      //图片加载完成后触发的函数
      function (text) {
        texture = text
        material = new THREE.MeshBasicMaterial({
          map: texture
        })
        var mesh = new THREE.Mesh( geometry, material)
        scene.add(mesh)
      },
      //加载过程
      function (xhr) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' )
      },
      //加载失败
      function (xhr) {
        console.log('An Error Happened')
      }
    )*/

    var geometry = new THREE.Geometry()
    var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors,wireframe:false})
    var color1 = new THREE.Color(0x00900f)
    var color2 = new THREE.Color(0xdb4437)
    var color3 = new THREE.Color(0x20f0ff)

    var p1 = new THREE.Vector3(-200,0,0)
    var p2 = new THREE.Vector3(100,0,0)
    var p3 = new THREE.Vector3(0,200,0)

    geometry.vertices.push(p1)
    geometry.vertices.push(p2)
    geometry.vertices.push(p3)

    var face = new THREE.Face3(0,1,2)//为了减少存储空间，所以这里存放索引
    face.vertexColors[0] = color1
    face.vertexColors[1] = color2
    face.vertexColors[2] = color3
    geometry.faces.push(face)

    var mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)
  }

  function createUI () {
    var Obj = function () {
      this.fov = 45;
      this.repeat = 1;
      this.wrap = 1;
      this.offsetX = 0;
      this.offsetY = 0;
    }

    foo = new Obj();
    var gui = new dat.GUI();
    gui.add(foo,"fov",0,180).name("视角大小")
    gui.add(foo,"repeat",1,5).name("纹理重复")
    gui.add(foo,"wrap",1,3).name("纹理环绕").step(1)
    gui.add(foo,"offsetX",-1.0,1.0).name("纹理X偏移").step(0.1)
    gui.add(foo,"offsetY",-1.0,1.0).name("纹理Y偏移").step(0.1)
  }

  function animation () {
    light.position.set(param.x, param.y, param.z)
    //camera.position.x += 10;
    //camera.position.z += 10;
    changeFov();
    change();
    renderer.clear()
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }

  function setCameraFov (fov) {
    camera.fov = fov;
    camera.updateProjectionMatrix()
  }

  function changeFov () {
    setCameraFov(foo.fov)
  }

  function change () {
    if (texture !== null) {
      texture.repeat.x = texture.repeat.y = foo.repeat
      texture.offset.x += 0.001
      //texture.offset.y = foo.offsetY
      if (foo.wrap === 1) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      } else if (foo.wrap === 2) {
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
      } else if (foo.wrap === 3) {
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping
      }
      texture.needsUpdate = true;//与后面两种纹理重复同时使用
    }
  }

  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )
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
