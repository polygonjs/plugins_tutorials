# How to add custom nodes to Polygonjs

[Polygonjs](https://polygonjs.com) is node-based WebGL engine. It is [open-source](https://github.com/polygonjs/polygonjs) and allows you to create and import your own nodes.

This repository explains how to do so, it's very simple:


## First, set up your project:

- 1. Create a new folder.
- 2. Start polygonjs with `npx polygonjs-editor`.
- 3. Open your browser at `http://localhost:8091/` to open the editor.
- 4. Save the default scene, either with `Ctrl+S` or from the top menu `File -> Save`
- 5. When prompted, install the dependencies with `npm install` or `yarn`.
- 6. Once the dependencies are installed, click `Save again`.

## Then, you can create a custom node:

Here we are going to create a custom SOP node, which is specialized to manipulate geometries. So let's create it inside a `sop` folder:

- 1. Add the folders `src/engine/nodes/sop`.
- 2. Inside the `sop` folder, create a file called `TransformCustom.js`. You should now have this file structure:

![File Structure](https://github.com/polygonjs/plugins_tutorials/blob/main/public/files.jpg?raw=true)

- 3. Then copy the content of the file from [what's in the repo](https://github.com/polygonjs/plugins_tutorials/blob/main/src/engine/nodes/sop/TransformCustom.js). It looks like this:

``` js
import {TypedSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/_Base';
import {NodeParamsConfig, ParamConfig} from '@polygonjs/polygonjs/dist/src/engine/nodes/utils/params/ParamsConfig';
class TransformCustomSopParamsConfig extends NodeParamsConfig {
    height = ParamConfig.FLOAT(1);
}
const ParamsConfig = new TransformCustomSopParamsConfig();

export class TransformCustomSopNode extends TypedSopNode {
    paramsConfig = ParamsConfig;
    static type() {
        // This is the type of the node. All nodes within a specific context (such as SOP, COP, OBJ) must have a unique type.
        return 'transformCustom';
    }

    initializeNode() {
        // You can set properties of the nodes at initialization here, such as the number of inputs
        this.io.inputs.setCount(1);
    }

    cook(inputContents) {
        // This is where the core of the node is. We'll process its inputs (inputContents)
        // then modify them
        const coreGroup = inputContents[0]
        for(let object of coreGroup.objects()){
            // here we update the y position of the object by this.pv.y, which is the value of the parameter height;
            object.position.y += this.pv.height;
            object.updateMatrix();
        }
        this.setCoreGroup(coreGroup);
    }
}
```

Or **if you prefer using typescript**, you can also write your nodes with it.

<details>
<summary>Show typescript example</summary>

The file is [almost the same](https://github.com/polygonjs/plugins_tutorials/blob/main/src/engine/nodes/sop/TransformCustomInTS.ts):


``` ts
import { CoreGroup } from '@polygonjs/polygonjs/dist/src/core/geometry/Group';
import {TypedSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/_Base';
import {NodeParamsConfig, ParamConfig} from '@polygonjs/polygonjs/dist/src/engine/nodes/utils/params/ParamsConfig';
class TransformCustomSopParamsConfig extends NodeParamsConfig {
    height = ParamConfig.FLOAT(1);
}
const ParamsConfig = new TransformCustomSopParamsConfig();

export class TransformCustomInTSSopNode extends TypedSopNode<TransformCustomSopParamsConfig> {
    paramsConfig = ParamsConfig;
    static type() {
        // This is the type of the node. All nodes within a specific context (such as SOP, COP, OBJ) must have a unique type.
        return 'transformCustomInTS';
    }

    initializeNode() {
        // You can set properties of the nodes at initialization here, such as the number of inputs
        this.io.inputs.setCount(1);
    }

    override cook(inputContents:CoreGroup[]) {
        // This is where the core of the node is. We'll process its inputs (inputContents)
        // then modify them
        const coreGroup = inputContents[0]
        for(let object of coreGroup.objects()){
            // here we update the y position of the object by this.pv.y, which is the value of the parameter height;
            object.position.y += this.pv.height;
            object.updateMatrix();
        }
        this.setCoreGroup(coreGroup);
    }
}
```

The main differences between writing your node with javascript and typescript are:

- you need to give the parameter object as template: `TypedSopNode<TransformCustomSopParamsConfig>`. This allows the calls to a parameter ( `node.p.height` ) and to a parameter value ( `node.pv.height` ) to predict the type those return.
- you need to give the argument type of the cook method. For a [SOP node](https://polygonjs.com/docs/nodes/sop), this is: `cook(inputContents:CoreGroup[])`.


</details>



## And once the node is created, you need to register it, so that it can be accessible from the UI:

- 1. in the file [src/polygonjs/scenes/scene_01/PolyConfig.ts](https://github.com/polygonjs/plugins_tutorials/blob/main/src/polygonjs/scenes/scene_01/PolyConfig.ts), add the following line at the top:
```js
import {TransformCustomSopNode} from '../../../engine/nodes/sop/TransformCustom'
```
- 2. And inside the function `configurePolygonjs`, add this line:
``` js
poly.nodesRegister.register(TransformCustomSopNode, 'myNodes');
```

- 3. And reload the page of the editor. You should now be able to load your custom nodes:

![Custom node loaded](https://github.com/polygonjs/plugins_tutorials/blob/main/public/registered_node.jpg?raw=true)

## What's next?

Now that you see how easy it is to extend Polygonjs, have a look at all the nodes you can take inspiration from in the core engine:

- [Anim nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/anim)
- [Audio nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/audio)
- [Compositing/Texture nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/cop)
- [Event nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/event)
- [GLSL nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/gl)
- [Material nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/mat)
- [Object nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/obj)
- [Post processing nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/post)
- [Renderer nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/rop)
- [Geometry/Surface nodes](https://github.com/polygonjs/polygonjs/tree/master/src/engine/nodes/sop)
