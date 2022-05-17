import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import AbstractSpruceError from '../../AbstractSpruceError'

class SpruceError extends AbstractSpruceError {}

export default class ConvertingToAndFromStringTest extends AbstractSpruceTest {
	@test()
	protected static async convertingToAndFromString() {
		const error = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['taco'],
		})

		const string = error.toString()

		assert.doesInclude(string, 'taco')

		const parsedError = AbstractSpruceError.parse(string, SpruceError)

		assert.isEqual(parsedError.options.code, error.options.code)
		assert.isTruthy(parsedError.stack)
	}

	@test()
	protected static async convertingToAndFromObject() {
		const error = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['taco'],
		})

		const expectedStack = error.stack
		const parsedError = this.toStringAndBack(error)

		assert.isEqual(parsedError.options.code, error.options.code)
		assert.isEqualDeep(parsedError.stack, expectedStack)
		assert.isTruthy(parsedError.stack)
	}

	@test()
	protected static async handlesFailedConversion() {
		const parsedError = AbstractSpruceError.parse('taco bell', SpruceError)
		assert.isEqual(parsedError.options.code, 'UNKNOWN_ERROR')
	}

	@test()
	protected static async canStringifyOriginalErrorAsSpruceError() {
		const error = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['taco'],
			originalError: new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['bell'],
			}),
		})

		const parsedError = this.toStringAndBack(error)
		assert.isTruthy(parsedError.originalError instanceof AbstractSpruceError)
		assert.isEqual(
			//@ts-ignore
			parsedError.originalError?.options.code,
			'INVALID_PARAMETERS'
		)
		//@ts-ignore
		assert.isEqual(parsedError.originalError.options.parameters[0], 'bell')
	}

	@test()
	protected static async canStringifyOriginalErrorAsError() {
		const error = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['taco'],
			originalError: new Error('Bell'),
		})

		const parsedError = this.toStringAndBack(error)
		assert.isTruthy(parsedError.originalError instanceof Error)
		assert.isEqual(parsedError.originalError?.message, 'Bell')
	}

	@test()
	protected static errorMessagesAreRetainedOnSpruceErrors() {
		const err = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['test'],
		})

		err.message = 'go team!'
		const parsedError = AbstractSpruceError.parse(err, SpruceError)
		assert.isEqual(parsedError.message, 'go team!')
	}

	@test.only()
	protected static errorMessagesAreRetainedOnStandardErrors() {
		const message = 'a fancy message -' + new Date().getTime()
		const err = new Error(message)
		const parsedError = AbstractSpruceError.parse(err, SpruceError)
		assert.isEqual(parsedError.options.code, 'UNKNOWN_ERROR')
		assert.isEqual(parsedError.message, message)
		assert.isEqual(parsedError.originalError, err)
		assert.isEqual(parsedError.stack, err.stack)
	}

	private static toStringAndBack(error: SpruceError) {
		const string = error.toString()
		const parsedError = AbstractSpruceError.parse(string, SpruceError)
		return parsedError
	}
}
