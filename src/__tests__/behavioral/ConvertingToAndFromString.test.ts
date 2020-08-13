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
	}
}
