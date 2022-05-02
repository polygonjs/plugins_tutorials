import {TransformCustomSopNode} from '../../../engine/nodes/sop/TransformCustom'
import {TransformCustomInTSSopNode} from '../../../engine/nodes/sop/TransformCustomInTS'

export function configurePolygonjs(poly) {
	// You can configure the engine,
	// which for instance could allow you to create your own nodes.
	// See https://github.com/polygonjs/plugins_tutorials
	poly.nodesRegister.register(TransformCustomSopNode, 'myNodes');
	poly.nodesRegister.register(TransformCustomInTSSopNode, 'myNodes');
}

export function configureScene(scene) {
	// see scene and node API:
	// https://polygonjs.com/docs/api
}
