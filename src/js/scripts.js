import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.shadowMap.enabled = true

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth/window.innerHeight,
  1,
  1000
)
camera.position.set(-5,1,5)

const orbit = new OrbitControls(camera, renderer.domElement)

const gui = new dat.GUI()

const pointLightWhite = new THREE.PointLight( 0xffffff, 1, 100 );
pointLightWhite.position.set( -0.58,0.29,3.43 );
pointLightWhite.intensity = .5
scene.add( pointLightWhite );

// const pointLightHelper1 = new THREE.PointLightHelper( pointLightWhite, 1 );
// scene.add( pointLightHelper1 );

const pointLightRed = new THREE.PointLight( 0xff0000, 1, 100 );
pointLightRed.position.set( 5,3.3,.34 );
pointLightRed.intensity = 3.2
scene.add( pointLightRed );

// const pointLightHelper2 = new THREE.PointLightHelper( pointLightRed, 1 );
// scene.add( pointLightHelper2 );

const pointLight2 = new THREE.PointLight( 0x00FF00, 1, 100 );
pointLight2.position.set( -1.21, -2.42, -1 );
pointLight2.color.set(0x96ff)
pointLight2.intensity = 6.33
scene.add( pointLight2 );

// const pointLightHelper3 = new THREE.PointLightHelper( pointLight2, 1 );
// scene.add( pointLightHelper3 );

const textureLoader = new THREE.TextureLoader()
textureLoader.load('/assets/NormalMap.png', function(texture){
  const geometry = new THREE.SphereGeometry( 1, 64, 64 );
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x292929,
    metalness: .7,
    roughness: .2,
    normalMap: texture
  });
  
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
})

const whiteLight = gui.addFolder('white light')

whiteLight.add(pointLightWhite.position, 'x').min(-5).max(5).step(.01)
whiteLight.add(pointLightWhite.position, 'y').min(-5).max(5).step(.01)
whiteLight.add(pointLightWhite.position, 'z').min(-5).max(5).step(.01)
whiteLight.add(pointLightWhite, 'intensity').min(0).max(10).step(.01)

const redLight = gui.addFolder('red light')

redLight.add(pointLightRed.position, 'x').min(-5).max(5).step(.01)
redLight.add(pointLightRed.position, 'y').min(-5).max(5).step(.01)
redLight.add(pointLightRed.position, 'z').min(-5).max(5).step(.01)
redLight.add(pointLightRed, 'intensity').min(0).max(10).step(.01)

const light3 = gui.addFolder('custom light')

light3.add(pointLight2.position, 'x').min(-5).max(5).step(.01)
light3.add(pointLight2.position, 'y').min(-5).max(5).step(.01)
light3.add(pointLight2.position, 'z').min(-5).max(5).step(.01)
light3.add(pointLight2, 'intensity').min(0).max(10).step(.01)

const light3Color = {
  color : 0x96ff
}

light3.addColor(light3Color, 'color').onChange( (e) => {
  pointLight2.color.set(e)
} )

function animate(time){
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const mousePosition = new THREE.Vector2()
window.addEventListener('mousemove', function(e){
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1
})