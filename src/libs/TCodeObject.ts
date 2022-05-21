import {
  BoxBufferGeometry,
  BufferAttribute,
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneBufferGeometry,
} from "three";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

const modelByCode: Array<Object3D> = [];
/**
 * TCodeObjects为用代码组装模型的简单示例
 *
 * 重点理解geometry的attribute，
 * 如position表示顶点信息，
 * normal表示法线信息--与材质对光照处理有关
 * geometry.setIndex()方法为顶点索引，告诉片元怎么处理顶点序列
 */

/**
 * codeModelSampleSingleSide 为一个面的示例
 */
class codeModelSampleSingleSide extends Mesh {
  constructor() {
    super();

    const arcLength = 5; // 边长
    const cubicMatrix = [
      // 三角形片元
      -1, 1, 1, 1, 1, 1, 1, 1, -1,
      // 三角形片元
      -1, 1, -1, -1, 1, 1, 1, 1, -1,
    ]; // 顶点坐标，每三个数为一组，对应一个点的xyz坐标，每三组点组成一个三角形片元。所以每行9个点表示一个三角形
    const vertexList: Float32Array = new Float32Array(
      cubicMatrix.map((v) => v * arcLength)
    );
    const vertexIndex: number[] = [0, 1, 2, 5, 3, 4]; // [0, 1, 2, 2, 3, 0];
    const geometry: BufferGeometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(vertexList, 3));
    // vertex位置确定后材质无颜色：原因是光照是由面的法线确定的。所以需要加入法线的规则
    // 这里法线其实给的不对，不能直接用position数组，因为每条法线应该由该面两个向量计算垂直向量得来
    // 所以这里传入的虽然是vertexList，与官方planeBufferGeometry对比，正确值应为 new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0])
    geometry.setAttribute("normal", new BufferAttribute(vertexList, 3));
    // 添加顶点索引,注意默认法线有方向，右手定则，贴图为单面。
    geometry.setIndex(vertexIndex);
    const material: MeshStandardMaterial = new MeshStandardMaterial({
      color: "white",
    });
    return new Mesh(geometry, material);
  }
}
const customModel_s1: Mesh = new codeModelSampleSingleSide();
customModel_s1.position.set(0, 5, 0);
modelByCode.push(customModel_s1);

/**
 * codeModelSampleSixSides为6个面的示例，
 * 6个面每个面由4条边确定1条法线，
 * 与Three的BoxBufferGeometry的实现方式形成对比。
 */
class codeModelSampleSixSides extends Mesh {
  constructor() {
    super();

    const arcLength = 5; // 边长
    const cubicMatrix = [
      -1, 1, 1,

      1, 1, 1,

      1, 1, -1,

      -1, 1, -1,

      -1, -1, 1,

      1, -1, 1,

      1, -1, -1,

      -1, -1, -1,
    ]; // 顶点坐标，每三个数为一组，对应8个点的xyz坐标

    const vertexList: Float32Array = new Float32Array(
      cubicMatrix.map((v) => v * arcLength)
    );
    const vertexIndex: number[] = [
      0, 1, 2, 2, 3, 0,

      0, 4, 5, 5, 1, 0,

      1, 5, 6, 6, 2, 1,

      2, 6, 7, 7, 3, 2,

      0, 7, 4, 0, 3, 7,

      4, 6, 5, 4, 7, 6,
    ];
    const geometry: BufferGeometry = new BufferGeometry();

    geometry.setAttribute("position", new BufferAttribute(vertexList, 3));
    // vertex位置确定后材质无颜色：原因是光照是由面的法线确定的。所以需要加入法线的规则
    geometry.setAttribute("normal", new BufferAttribute(vertexList, 3));
    // 添加顶点索引,注意默认法线有方向，右手定则，贴图为单面。
    geometry.setIndex(vertexIndex);
    const material: MeshStandardMaterial = new MeshStandardMaterial({
      color: "white",
    });
    return new Mesh(geometry, material);
  }
}
const customModel_s2: Mesh = new codeModelSampleSixSides();
customModel_s2.position.set(-15, 5, 0);
modelByCode.push(customModel_s2);

/**
 * 每个面都用独立的4个点确定的正方体，法线UV与BoxBufferGeometry相同的效果
 *
 * 与codeModelSampleSixSides区别就在顶点顺序 vertexIndex 和 uv
 */
class codeModeSampleStandardBox extends Mesh {
  constructor() {
    super();
    const arcLength = 5; // 边长
    const cubicMatrix = [
      -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1,

      -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1,

      -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1,

      1, 1, 1, 1, 1, -1, 1, -1, -1, 1, -1, 1,

      -1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1,

      -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1,
    ];
    const vertexList: Float32Array = new Float32Array(
      cubicMatrix.map((v) => v * arcLength)
    );
    const normals: Float32Array = new Float32Array([
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,

      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,

      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,

      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    ]);

    const uv: Float32Array = new Float32Array([
      0, 0, 1, 0, 1, 1, 0, 1,

      0, 0, 1, 0, 1, 1, 0, 1,

      0, 0, 1, 0, 1, 1, 0, 1,

      0, 0, 1, 0, 1, 1, 0, 1,

      0, 0, 1, 0, 1, 1, 0, 1,

      0, 0, 1, 0, 1, 1, 0, 1,
    ]);

    const vertexIndex: number[] = [
      0, 1, 2, 2, 3, 0,

      4, 6, 5, 4, 7, 6,

      8, 9, 10, 10, 11, 8,

      12, 14, 13, 14, 12, 15,

      16, 18, 17, 18, 16, 19,

      20, 21, 22, 22, 23, 20,
    ];

    const geometry: BufferGeometry = new BufferGeometry();

    geometry.setAttribute("position", new BufferAttribute(vertexList, 3));
    // vertex位置确定后材质无颜色：原因是光照是由面的法线确定的。所以需要加入法线的规则
    geometry.setAttribute("normal", new BufferAttribute(normals, 3));
    // 添加顶点索引,注意默认法线有方向，右手定则，贴图为单面。
    geometry.setAttribute("uv", new BufferAttribute(uv, 2)); // UV

    geometry.setIndex(vertexIndex);

    const material: MeshStandardMaterial = new MeshStandardMaterial({
      color: "white",
    });
    return new Mesh(geometry, material);
  }
}
const customModel_s3: Mesh = new codeModeSampleStandardBox();
customModel_s3.position.set(-30, 5, 0);
modelByCode.push(customModel_s3);

/**
 * BoxBufferGeometry的对照组，可以看到在光照下官方的box棱角更加分明
 */
const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshStandardMaterial({
    color: "darkgray",
  })
);
box.position.set(15, 5, 0);
modelByCode.push(box);

const plane: Mesh = new Mesh(
  new PlaneBufferGeometry(10, 10),
  new MeshStandardMaterial({
    color: "darkgray",
  })
);
plane.position.set(30, 10, 0);
plane.rotateX((Math.PI / 180) * -90);
modelByCode.push(plane);

let vnh_s1 = new VertexNormalsHelper(customModel_s1, 3);
let vnh_s2 = new VertexNormalsHelper(customModel_s2, 3);
let vnh_s3 = new VertexNormalsHelper(customModel_s3, 3);
let vnh_box = new VertexNormalsHelper(box, 3);
let vnh_plane = new VertexNormalsHelper(plane, 3);
modelByCode.push(...[vnh_s1, vnh_s2, vnh_s3, vnh_box, vnh_plane]);

export default modelByCode;
