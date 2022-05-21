import {
  Object3D,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  CameraHelper,
  MOUSE,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "stats.js";
import { debounce } from "./Utils";

export class TEngine {
  private dom!: HTMLElement;
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private animateId!: number;
  private controller!: OrbitControls;
  private stats!: Stats;
  private resizeObserver!: ResizeObserver;

  constructor(dom: HTMLElement) {
    this.init(dom);
  }

  init(dom: HTMLElement) {
    // core
    this.setRenderer(dom);
    this.setScene();
    this.setCamera(dom);
    this.setController();
    // plugins
    this.stats = new Stats();
    this.setGridHelper();
    // final
    dom.appendChild(this.stats.dom);
    // post treatment
    this.setResize(
      dom,
      () => {
        this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
      },
      300
    );
  }
  render() {
    this.animateId = requestAnimationFrame(() => this.render());
    this.stats.update();
    this.renderer.render(this.scene, this.camera);
  }
  dispose(): void {
    cancelAnimationFrame(this.animateId);
    this.resizeObserver.unobserve(this.dom);
    this.renderer.dispose();
    this.controller.dispose();
  }
  setResize(target: HTMLElement, fn: Function, delay: number) {
    this.resizeObserver = new ResizeObserver(
      <ResizeObserverCallback>debounce(fn, delay)
    );
    this.resizeObserver.observe(target);
  }
  setRenderer(dom: HTMLElement) {
    this.dom = dom;
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    dom.appendChild(this.renderer.domElement);
  }
  getRenderer() {
    return this.renderer;
  }
  setScene() {
    this.scene = new Scene();
  }
  getScene() {
    return this.scene;
  }
  setCamera(dom: HTMLElement) {
    this.camera = new PerspectiveCamera(
      45,
      dom.offsetWidth / dom.offsetHeight,
      1,
      1000
    );
    this.camera.lookAt(0, 0, 0);
    this.camera.position.set(70, 70, 70);
    this.scene.add(this.camera);
  }
  getCamera() {
    return this.camera;
  }
  setController() {
    this.controller = new OrbitControls(this.camera, this.renderer.domElement);
    this.controller.mouseButtons = {
      LEFT: null as unknown as MOUSE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE,
    };
  }
  // helpers
  setCameraHelper() {
    let cameraHelper = new CameraHelper(this.camera);
    this.scene.add(cameraHelper);
  }
  setGridHelper() {
    let gridHelper = new GridHelper(
      500,
      20,
      "rgb(200,200,200)",
      "rgb(100,100,100)"
    );
    this.scene.add(gridHelper);
  }
  // Scene Camera Renderer Dispose Stats all ready.
  addObjects(...objects: Object3D[]) {
    objects.forEach((object) => {
      this.scene.add(object);
    });
  }

  getObject(object: Object3D): Object3D {
    // TODO return object3D in scene.
    return object;
  }
}
