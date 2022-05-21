import { AmbientLight, Object3D, PointLight, PointLightHelper } from "three";

const lights: Array<Object3D> = [];
// 环境光
const ambientlight = new AmbientLight("#fff", 0.8);
lights.push(ambientlight);
// 点光源
const pointLight = new PointLight("#f0f0f0", 0.7, 70, 0);
pointLight.position.set(10, 30, 30);
const pointLightHelper = new PointLightHelper(
  pointLight,
  pointLight.distance,
  pointLight.color
);
lights.push(pointLight);
lights.push(pointLightHelper);

export default lights;
