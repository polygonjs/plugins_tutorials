import {TransformCustomSopNode} from '../engine/nodes/sop/TransformCustom'

export function configurePolygonjs(poly) {
	// configure the engine
	poly.nodesRegister.register(TransformCustomSopNode, 'myNodes');
}
export function configureScene(scene) {
	// configure the scene
}
