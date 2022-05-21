import { AxesHelper, Object3D } from "three";

const helpers: Object3D[] = [];
const axesHelper: AxesHelper = new AxesHelper(40);

helpers.push(axesHelper);
export default helpers;
