import {
  BoxBufferGeometry,
  Line,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Points,
  PointsMaterial,
  SphereBufferGeometry,
} from "three";
import { pictureTexture } from "./TTextureLoader";

let geometry_box = new BoxBufferGeometry(10, 10, 10);
let geometry_sphere = new SphereBufferGeometry(5);
let material = new MeshStandardMaterial();

// BOX  mesh
export const boxMeshGeometry: Mesh = new Mesh(geometry_box, material);
boxMeshGeometry.position.set(0, 5, 0);
// BOX  line
export const boxLineGeometry: Line = new Line(geometry_box, material);
boxLineGeometry.position.set(-20, 5, 0);
// BOX  points
export const boxPointsGeometry: Points = new Points(
  geometry_box,
  new PointsMaterial({ color: "white" })
);
boxPointsGeometry.position.set(-40, 5, 0);

// Box with texture
export const boxWithMaterialGeometry: Mesh = new Mesh(
  geometry_box,
  new MeshStandardMaterial({
    map: pictureTexture("./textures/testtexture.png"),
  })
);
boxWithMaterialGeometry.position.set(20, 5, 0);

// sphere  mesh
export const sphereMeshGeometry: Mesh = new Mesh(geometry_sphere, material);
sphereMeshGeometry.position.set(0, 5, -20);
// sphere  line
export const sphereLineGeometry: Line = new Line(geometry_sphere, material);
sphereLineGeometry.position.set(-20, 5, -20);
// sphere  points
export const spherePointsGeometry: Points = new Points(
  geometry_sphere,
  new PointsMaterial({ color: "white" })
);
spherePointsGeometry.position.set(-40, 5, -20);

// Sphere with texture
export const sphereWithMaterialGeometry: Mesh = new Mesh(
  geometry_sphere,
  new MeshStandardMaterial({
    map: pictureTexture("./textures/testtexture.png"),
  })
);
sphereWithMaterialGeometry.position.set(20, 5, -20);

let geometryArray: Object3D[] = [
  boxMeshGeometry,
  boxLineGeometry,
  boxPointsGeometry,
  boxWithMaterialGeometry,
  sphereMeshGeometry,
  sphereLineGeometry,
  spherePointsGeometry,
  sphereWithMaterialGeometry,
];
export default geometryArray;
