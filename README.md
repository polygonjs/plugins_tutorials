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

- 3. Then copy the content of the file from what's in the repo.

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
