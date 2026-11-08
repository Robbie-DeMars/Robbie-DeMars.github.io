// Three.js scene that shows one FBX model at a time. Loaded on demand by js/render/models.js.
// Requires the import map in art.html (maps "three" and "three/addons/" to vendor/three/).

import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const FIELD_OF_VIEW = 40;
const FRAMING_MARGIN = 1.4;
const VIEW_DIRECTION = new THREE.Vector3(0.6, 0.4, 1).normalize();

function disposeNode(node) {
  if (!node.isMesh) {
    return;
  }
  node.geometry.dispose();
  const materials = Array.isArray(node.material) ? node.material : [node.material];
  for (const material of materials) {
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && value.isTexture) {
        value.dispose();
      }
    }
    material.dispose();
  }
}

/**
 * @param {HTMLElement} container element the canvas is appended to; it must have a fixed size in CSS
 * @returns {{load: (src: string) => Promise<void>}}
 */
export function createStage(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'viewer__canvas';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, 1, 0.01, 1000);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x444455, 1.6));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
  fillLight.position.set(-4, 1, -3);
  scene.add(fillLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotateSpeed = 1.5;
  controls.addEventListener('start', () => {
    controls.autoRotate = false;
  });

  const loader = new FBXLoader();
  const timer = new THREE.Timer();
  let current = null;
  let mixer = null;
  let latestRequest = 0;

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) {
      return;
    }
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  function removeCurrent() {
    if (!current) {
      return;
    }
    scene.remove(current);
    current.traverse(disposeNode);
    current = null;
    mixer = null;
  }

  // Centers the object at the origin and moves the camera back until it fits.
  function frame(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    object.position.sub(box.getCenter(new THREE.Vector3()));

    const radius = Math.max(size.x, size.y, size.z) / 2 || 1;
    const distance = (radius / Math.tan(THREE.MathUtils.degToRad(FIELD_OF_VIEW / 2))) * FRAMING_MARGIN;

    camera.position.copy(VIEW_DIRECTION).multiplyScalar(distance);
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    controls.target.set(0, 0, 0);
    controls.minDistance = distance * 0.2;
    controls.maxDistance = distance * 5;
    controls.update();
  }

  async function load(src) {
    const request = ++latestRequest;
    const object = await loader.loadAsync(src);

    if (request !== latestRequest) {
      object.traverse(disposeNode);
      return;
    }

    removeCurrent();
    current = object;
    scene.add(object);
    frame(object);

    if (object.animations.length > 0) {
      mixer = new THREE.AnimationMixer(object);
      mixer.clipAction(object.animations[0]).play();
    }
    controls.autoRotate = !prefersReducedMotion;
  }

  renderer.setAnimationLoop(() => {
    timer.update();
    if (mixer) {
      mixer.update(timer.getDelta());
    }
    controls.update();
    renderer.render(scene, camera);
  });

  return { load };
}
