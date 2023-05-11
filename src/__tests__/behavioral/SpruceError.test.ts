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
	protected errorPrettyPrintIncludesStack() {
		const error = new SpruceError({
			code: 'MISSING_PARAMETERS',
			parameters: ['test'],
			friendlyMessage: 'This has some message in it',
		})

		const pretty = error.prettyPrint()

		assert.doesInclude(pretty, 'some message')
		assert.doesInclude(pretty, 'test')
		assert.doesInclude(pretty, 'Object.errorPrettyPrintIncludesStack')
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

	@test('stack includes options 1', { test: 'true' })
	@test('stack includes options 2', { cheesey: 'crunch' })
	protected static async stackIncludesOptions(options: any) {
		const error = new SpruceError({
			code: 'UNKNOWN_ERROR',
			...options,
		})

		assert.doesInclude(error.stack, JSON.stringify(options, null, 2))
	}

	@test()
	protected static async stackDoesNotIncludeOriginalError() {
		const error = new SpruceError({
			code: 'UNKNOWN_ERROR',
			//@ts-ignore
			originalError: 'taco',
		})

		assert.doesNotInclude(error.stack, 'taco')
	}
}
