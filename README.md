# Vite + Three + Vue3 demo

本 Repo 使用上述工具完成，用于免配置进行快速测试和简单开发 threejs 相关效果和模型的简单环境。

## 运行命令

```shell
npm install
npm run dev
```

## 使用说明

核心是TEngine对象，该对象实例后自动创建一个Scene，并提供一系列对Object3D的操作方法。

```javascript
    import { TEngine } from "../libs/TEngine";
    import { setController } from "../libs/TController";

    // init TE object, threeTarget is a HTML DOM.
    const TE = new TEngine(threeTarget.value!);
    // add some object3Ds
    TE.addObjects(...lightArray);
    // init controller
    setController(TE);
    // render scene
    TE.render();
    // dispose TE and terminate the render cycle.
    TE.dispose();
```

TController操作：（以下操作只有调用setController才会生效）
- 鼠标左键点击
- 鼠标右键按住拖动改变视角
## 参考资料

- [three.js 实战式入门教程](https://www.bilibili.com/video/BV1F3411k7sw)
- [cpc-web-library](https://shiotsukikaedesari.gitee.io/)

## TODO

- TEngine: 补充查询并取出Scene中任意层级的Object3D对象
- 动画系统
- 物理系统 
- 粒子系统
- Shader测试

## Notes

`MeshStandardMaterial({wireframe:true})` 与  `<Mesh>Line` 完全不同，虽然在某些情况下看着是一样的
