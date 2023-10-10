window.addEventListener('load', init);

function init() {
  //サイズを指定
  const width = 960;
  const height = 540;
  let rot = 0;

  //シーン作成
  const scene = new THREE.Scene();

  //カメラ作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  
  //レンダラー作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  }); 
  renderer.setSize(window.innerWidth, window.innerHeight);

  //球体作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // マテリアル作成、材質決定
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/earthmap1k.jpg"),
  });

  //メッシュ作成
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  //平行光源
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  //ポイント光源
  const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
  scene.add(pointLight);
  const pointLightHelper = new THREE.PointLightHelper( pointLight, 30 );
  scene.add(pointLightHelper);

  //フレーム毎に呼び出される関数
  function tick () {
    rot += 0.5;

    //ラジアン変換
    const radian = (rot * Math.PI) / 180;

    //角度に応じてカメラの位置を変更する
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 2000 * Math.cos(radian);

    //カメラの見る位置を固定する
    camera.lookAt(new THREE.Vector3(0, 0, -400));

    // ライトを周回させる
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
      ); 

    //レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick(); 
}