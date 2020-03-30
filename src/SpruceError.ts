import {
	SpruceErrorOptions,
	ISpruceErrorOptions,
	SpruceErrorCode
} from './types'

export default class SpruceError<
	T extends ISpruceErrorOptions = SpruceErrorOptions
> extends Error {
	public options: T
	public originalError?: Error
	public constructor(options: T) {
		const { code } = options

		super(code)
		this.options = options

		switch (code) {
			case SpruceErrorCode.InvalidParameters:
				break
		}

		// Preserve the stack
		if (options.originalError) {
			this.stack = options.originalError.stack
			this.originalError = options.originalError
		}
	}

	/** Get a nice, readable version of the error. subclasses extend this */
	public friendlyMessage(): string {
		return this.options.friendlyMessage || this.message
	}
}
