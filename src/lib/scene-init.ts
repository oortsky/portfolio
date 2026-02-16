import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
  scene: THREE.Scene | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  renderer: THREE.WebGLRenderer | undefined;

  fov: number;
  nearPlane: number;
  farPlane: number;
  canvasId: string;
  containerElement: HTMLElement | null;

  clock: THREE.Clock | undefined;
  // stats: Stats | undefined;
  // controls: OrbitControls | undefined;

  ambientLight: THREE.AmbientLight | undefined;
  directionalLight: THREE.DirectionalLight | undefined;

  constructor(canvasId: string, containerElement: HTMLElement | null) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.containerElement = containerElement;

    // NOTE: Additional components.
    this.clock = undefined;
    // this.stats = undefined;
    // this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();

    const width = this.containerElement
      ? this.containerElement.clientWidth
      : window.innerWidth;
    const height = this.containerElement
      ? this.containerElement.clientHeight
      : window.innerHeight;

    // FIXED: Correct parameter order is (fov, aspect, near, far)
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      width / height,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 48;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement | null;
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    // this.renderer.shadowMap.enabled = true;
    // document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    // this.stats.update();
    // this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer!.render(this.scene!, this.camera!);
  }

  onWindowResize() {
    const width = this.containerElement
      ? this.containerElement.clientWidth
      : window.innerWidth;
    const height = this.containerElement
      ? this.containerElement.clientHeight
      : window.innerHeight;

    this.camera!.aspect = width / height;
    this.camera!.updateProjectionMatrix();
    this.renderer!.setSize(width, height);
  }
}
