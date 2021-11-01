
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
