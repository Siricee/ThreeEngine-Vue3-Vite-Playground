import { Raycaster, Vector2 } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { TEngine } from "./TEngine";

export function setController(TEngineInstance: TEngine) {
  let _camera = TEngineInstance.getCamera();
  let _renderer = TEngineInstance.getRenderer();
  let _scene = TEngineInstance.getScene();

  // 初始变换控制器
  const transformControls = new TransformControls(
    _camera,
    _renderer.domElement
  );
  let transing = false;
  transformControls.addEventListener("mouseDown", () => {
    transing = true;
  });

  document.addEventListener("keydown", (event) => {
    if (event.repeat) {
      return false;
    }

    console.log(event);
    if (event.key === "e") {
      transformControls.mode = "scale";
      return false;
    }

    if (event.key === "r") {
      transformControls.mode = "rotate";
      return false;
    }

    if (event.key === "t") {
      transformControls.mode = "translate";
      return false;
    }
  });

  // 初始射线发射器
  const raycaster = new Raycaster();

  // 给renderer的canvas对象添加鼠标事件
  const mouse = new Vector2();
  let x = 0;
  let y = 0;
  let width = 0;
  let height = 0;
  _renderer.domElement.addEventListener("mousemove", (event) => {
    x = event.offsetX;
    y = event.offsetY;
    width = _renderer.domElement.offsetWidth;
    height = _renderer.domElement.offsetHeight;
    mouse.x = (x / width) * 2 - 1;
    mouse.y = (-y * 2) / height + 1;
  });

  _renderer.domElement.addEventListener("click", (event) => {
    // 拖动结束的操作
    if (transing) {
      transing = false;
      return;
    }

    // 选取物体的操作
    raycaster.setFromCamera(mouse, _camera);

    _scene.remove(transformControls);
    const intersection = raycaster.intersectObjects(_scene.children);

    if (intersection.length) {
      const object = intersection[0].object;
      _scene.add(transformControls);
      transformControls.attach(object);
    }
  });
}
