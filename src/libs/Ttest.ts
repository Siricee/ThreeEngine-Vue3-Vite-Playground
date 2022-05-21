import {
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  AmbientLight,
  Object3D,
  PointLight,
  Raycaster,
  Vector2,
} from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { TEngine } from "./TEngine";

let geometry_box = new BoxBufferGeometry(10, 10, 10);
let material = new MeshStandardMaterial();
export const boxMeshGeometry: Mesh = new Mesh(geometry_box, material);
boxMeshGeometry.position.set(0, 5, 0);

const lights: Array<Object3D> = [];
// 环境光
const ambientlight = new AmbientLight("#fff", 0.8);
lights.push(ambientlight);
// 点光源
const pointLight = new PointLight("#f0f0f0", 0.7, 70, 0);
pointLight.position.set(10, 30, 30);
lights.push(pointLight);

// 行为
// export function setTransformController(
//   TEngineInstance: TEngine
// ): TransformControls {
//   let tc = new TransformControls(TEngineInstance.getCamera(),TEngineInstance.getRenderer().domElement);
//   tc.attach(boxMeshGeometry);
//   return tc;
// }



const ObjectsArray: Object3D[] = [];
ObjectsArray.push(boxMeshGeometry);
ObjectsArray.push(...lights);

export default ObjectsArray;
