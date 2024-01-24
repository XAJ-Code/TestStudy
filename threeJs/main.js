import * as Three from 'three'
 const scene = new Three.Scene();//创建一个场景
 const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)//创建相机
 const renderer = new Three.WebGLRenderer();//创建渲染器
 renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染器的大小

 document.body.appendChild(renderer.domElement);//将渲染器添加到HTML文档中

 const geometry = new Three.BoxGeometry();//创建一个立方体的几何体
 const material = new Three.MeshBasicMaterial({ color: 0x00ff0  });//创建一个基础材质

 const cube = new Three.Mesh(geometry, material);//创建一个网格，将几何体和材质结合起来
 scene.add(cube);//将网格添加到场景中   
 camera.position.z = 5;//设置相机的位置

 function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;//使立方体旋转
	renderer.render( scene, camera );
}
animate()
