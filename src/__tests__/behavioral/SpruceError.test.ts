import { assert, test } from '@sprucelabs/test'
import AbstractSpruceError from '../../AbstractSpruceError'

class SpruceError extends AbstractSpruceError {}

export default class SpruceErrorTests {
	@test()
	public async createError() {
		const spruceError = new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['test'],
		})

		assert.isOk(spruceError)
	}
}
