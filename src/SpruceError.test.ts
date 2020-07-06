import { assert } from 'chai'
import AbstractSpruceError from './AbstractSpruceError'
import { SpruceErrorCode } from './error.types'

class SpruceError extends AbstractSpruceError {}

class SpruceErrorTests {
	public setup() {
		it('Can create a SpruceError', () => this.createError())
	}

	public async createError() {
		const spruceError = new SpruceError({
			code: SpruceErrorCode.InvalidParameters,
			parameters: ['test'],
		})

		assert.isOk(spruceError)
	}
}

describe('SpruceErrorTests', function Tests() {
	new SpruceErrorTests()
})
