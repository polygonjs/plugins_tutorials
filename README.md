# How to create a plugin in a javascript project

First, set up your project:

- create a new folder.
- start polygonjs with `npx polygonjs-editor`
- save the default scene as `javascript` (as in the docs: [https://polygonjs.com/docs/getting_started/local/save_as_javascript](https://polygonjs.com/docs/getting_started/local/save_as_javascript)).
- run `npm init -y && yarn add polygonjs-editor @polygonjs/polygonjs`

Then, you can create a custom node:

- add the folders `src/engine/nodes/sop`
- inside the `sop` folder, create a file called `TransformCustom.js`.
- Then copy the content of the file from what's in the repo.

And once the node is created, you need to register it, so that it can be accessible from the UI:

- in the file `src/polygonjs/PolyConfig.js`, add the following line:
```js
import {TransformCustomSopNode} from '../engine/nodes/sop/TransformCustom'
```
and inside the function `configurePolygonjs`, add this line:
``` js
poly.nodesRegister.register(TransformCustomSopNode, 'myNodes');
```

And reload the page of the editor. You should now be able to create your custom node.