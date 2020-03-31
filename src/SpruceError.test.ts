import { assert } from 'chai'
import SpruceError from './SpruceError'
import { SpruceErrorCode } from './types'
import Abstract from '../tests/Abstract'

class SpruceErrorTests extends Abstract {
	public setup() {
		it('Can create a SpruceError', () => this.createError())
	}

	public async createError() {
		const spruceError = new SpruceError({
			code: SpruceErrorCode.InvalidParameters,
			parameters: ['test']
		})

		assert.isOk(spruceError)
	}
}

describe('SpruceErrorTests', function Tests() {
	new SpruceErrorTests()
})
