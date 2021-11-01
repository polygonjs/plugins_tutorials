# How to create a plugin in a javascript project

## First, set up your project:

- 1. Create a new folder.
- 2. Start polygonjs with `npx polygonjs-editor`
- 3. Save the default scene as `javascript` (as in the docs: [https://polygonjs.com/docs/getting_started/local/save_as_javascript](https://polygonjs.com/docs/getting_started/local/save_as_javascript)).
- 4. Run `npm init -y && yarn add polygonjs-editor @polygonjs/polygonjs`

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


## And once the node is created, you need to register it, so that it can be accessible from the UI:

- 1. in the file `src/polygonjs/PolyConfig.js`, add the following line:
```js
import {TransformCustomSopNode} from '../engine/nodes/sop/TransformCustom'
```
- 2. And inside the function `configurePolygonjs`, add this line:
``` js
poly.nodesRegister.register(TransformCustomSopNode, 'myNodes');
```

- 3. And reload the page of the editor. You should now be able to load your custom nodes:

![Custom node loaded](https://github.com/polygonjs/plugins_tutorials/blob/main/public/registered_node.jpg?raw=true)
