import * as THREE from "three"
import { IWorld } from 'bitecs'
import { Engine } from '../types/Engine'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const createEngine = (world: IWorld) : Engine => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color("#FFEECC");

  // CAMERA
  const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.rotation.x = 0;
  camera.rotation.y = 0;
  camera.rotation.z = 0;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;

  const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444)
  hemilight.position.set(0,20,0);
  scene.add(hemilight)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 8, 0);
  //light.lookAt(0,0,0)
  light.castShadow = true
  // DEFINES RES OF SHADOW
  // needs to be a power of two
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  const directionalLightCameraHelper = new THREE.CameraHelper(light.shadow.camera)

  scene.add(directionalLightCameraHelper)
  scene.add(light)


  const renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  // High pixel Ratio make the rendering extremely slow, so we cap it.
  const pixelRatio = window.devicePixelRatio ? Math.min(window.devicePixelRatio, 1.5) : 1;
  renderer.setPixelRatio(pixelRatio);
  //renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( renderer.domElement )

  window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )

  })

  const objects = new Map()

  const time = { last: 0, delta: 0, elapsed: 0, dt: 0 }

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target.set(0,0,0);
  orbitControls.dampingFactor = 0.05;
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 2
  orbitControls.maxDistance = 20
  orbitControls.maxPolarAngle = Math.PI / 2 - 0.05 // prevent camera below ground
  orbitControls.minPolarAngle = Math.PI / 4        // prevent top down view
  orbitControls.update();

  return {
    camera,
    orbitControls,
    renderer,
    objects,
    time,
    scene,
    world,
  } as Engine
}
