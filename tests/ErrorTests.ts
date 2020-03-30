import { assert } from 'chai'
import Base from './Base'
import SpruceError from '../src/SpruceError'
import { SpruceErrorCode } from '../src/types'

class ErrorTests extends Base {
	public setup() {
		it('Can create a SpruceError', () => this.createError())
	}

	public async createError() {
		const spruceError = new SpruceError({
			code: SpruceErrorCode.InvalidParameters,
			missingParameters: ['test']
		})

		assert.isOk(spruceError)
	}
}

describe('ErrorTests', function Tests() {
	new ErrorTests()
})
