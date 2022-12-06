import {
  defineComponent,
  defineQuery,
  enterQuery,
  exitQuery,
  Types
} from "bitecs"
const { f32 } = Types

export const Vector3Schema = { x: f32, y: f32, z: f32 }
export const QuaternionSchema = { x: f32, y: f32, z: f32, w: f32 }
export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
export const TransformSchema = {
  position: Vector3Schema,
  rotation: QuaternionSchema,
  scale: Vector3Schema,
}

function setFromAxisAngle( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this._onChangeCallback();

		return this;

	}

export type Vector3Component = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export type QuaternionComponent = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export type TransformComponentType = {
  position: Vector3Component,
  rotation: QuaternionComponent,
  scale: Vector3Component,
}


export const Transform = defineComponent<TransformComponentType>(TransformSchema)
export const transformQuery = defineQuery([Transform]);
export const enteredTransformQuery = enterQuery(transformQuery);
export const exitedTransformQuery = exitQuery(transformQuery);
