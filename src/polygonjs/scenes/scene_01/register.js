import {Poly} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {AllExpressionsRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/expressions/All';
import {configurePolygonjs} from '../../PolyConfig';
// modules
import {ModuleName} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/modules/Common';
import {SVGLoader} from '@polygonjs/polygonjs/dist/src/modules/three/examples/jsm/loaders/SVGLoader';
// event
import {CameraOrbitControlsEventNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/event/CameraOrbitControls';
// mat
import {MeshLambertMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshLambert';
// obj
import {GeoObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/Geo';
import {HemisphereLightObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/HemisphereLight';
import {PerspectiveCameraObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/PerspectiveCamera';
import {SpotLightObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/SpotLight';
// sop
import {ColorSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Color';
import {EventsNetworkSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/EventsNetwork';
import {MaterialSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Material';
import {MaterialsNetworkSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/MaterialsNetwork';
import {MergeSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Merge';
import {TextSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Text';
import {TransformSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Transform';
import {TransformCustomSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/TransformCustom';
export class PolyRegister {
	static run() {
		AllExpressionsRegister.run(Poly);
		// modules
		Poly.modulesRegister.register(ModuleName.SVGLoader, SVGLoader);
		// event
		Poly.registerNode(CameraOrbitControlsEventNode);
		// mat
		Poly.registerNode(MeshLambertMatNode);
		// obj
		Poly.registerNode(GeoObjNode);
		Poly.registerNode(HemisphereLightObjNode);
		Poly.registerNode(PerspectiveCameraObjNode);
		Poly.registerNode(SpotLightObjNode);
		// sop
		Poly.registerNode(ColorSopNode);
		Poly.registerNode(EventsNetworkSopNode);
		Poly.registerNode(MaterialSopNode);
		Poly.registerNode(MaterialsNetworkSopNode);
		Poly.registerNode(MergeSopNode);
		Poly.registerNode(TextSopNode);
		Poly.registerNode(TransformSopNode);
		Poly.registerNode(TransformCustomSopNode);
		// custom configuration
		configurePolygonjs(Poly);
	}
}
