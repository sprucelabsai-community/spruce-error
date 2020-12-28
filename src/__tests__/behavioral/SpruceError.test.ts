import { assert, test } from '@sprucelabs/test'
import AbstractSpruceError from '../../AbstractSpruceError'

class SpruceError extends AbstractSpruceError {}

export default class SpruceErrorTests {
	@test()
	public createError() {
		const error = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['test'],
		})

		assert.isTruthy(error)
	}

	@test()
	protected errorToObjectIncludesStack() {
		const error = new SpruceError({
			code: 'MISSING_PARAMETERS',
			parameters: ['test'],
		})

		const obj = error.toObject()
		assert.isTruthy(obj.stack)
	}

	@test()
	protected errorToObjectWithoutStackHasNoStackProp() {
		const error = new SpruceError({
			code: 'MISSING_PARAMETERS',
			parameters: ['test'],
		})

		delete error.stack

		const obj = error.toObject()
		assert.isFalse('stack' in obj)
	}

	@test()
	protected errorToObjectWithoutStackHasNoFalseStackProp() {
		const error = new SpruceError({
			code: 'MISSING_PARAMETERS',
			parameters: ['test'],
		})

		//@ts-ignore
		error.stack = false

		const obj = error.toObject()
		assert.isFalse('stack' in obj)
	}
}
