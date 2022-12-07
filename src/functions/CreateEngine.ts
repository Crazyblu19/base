import * as THREE from "three"
import { Engine } from "../types/Engine"
import { IWorld } from 'bitecs'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Group3DEntity } from '../types/Group3DEntity'

export const createEngine = (world: IWorld) : Engine => {


  const scene = new THREE.Scene()
  scene.background = new THREE.Color("#FFEECC");

  const gridHelper = new THREE.GridHelper( 1000, 20 );
  scene.add( gridHelper );
  // CAMERA
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 5;
  camera.position.z = 10;
  camera.position.x = -13;

  const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444)
  hemilight.position.set(0,20,0);
  scene.add(hemilight)

  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(0,20,10);
  scene.add(light)

  // LINES FOR DEBUG RENDERER
  const material = new THREE.LineBasicMaterial({color: 0xffffff});
  const geometry = new THREE.BufferGeometry()
  const lines = new THREE.LineSegments(geometry, material);
  lines.visible = false
  const debugRenderer = {
    lines
  }
  scene.add(lines);

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


  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target.set(0,0,0);
  orbitControls.dampingFactor = 0.05;
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 5
  orbitControls.maxDistance = 20
  orbitControls.maxPolarAngle = Math.PI / 2 - 0.05 // prevent camera below ground
  orbitControls.minPolarAngle = Math.PI / 4        // prevent top down view
  orbitControls.update();

  const objects = new Map()

  const robotAnimations: Map<number, Map<number, THREE.AnimationAction>> = new Map()

  const time = { last: 0, delta: 0, elapsed: 0, dt: 0 }

  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false,
    shift: false,
  };
  const animations: THREE.AnimationClip[] = []
  const playersModels: Map<number, Group3DEntity> = new Map()

  return {
    functions: {},
    animations,
    playersModels,
    keys,
    camera,
    orbitControls,
    robotAnimations,
    renderer,
    objects,
    time,
    scene,
    world,
  } as Engine
}
