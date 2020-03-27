import { SpruceErrorOptions, ISpruceErrorOptions } from './types'

export default class SpruceError<
	T extends ISpruceErrorOptions = SpruceErrorOptions
> extends Error {
	public options?: T
	public lastError?: Error

	public constructor(options: T) {
		const { code } = options

		super(code)

		this.options = options

		// preserve the stack
		if (options?.lastError) {
			this.stack = options.lastError.stack
		}
	}

	/** get a nice, readable version of the error. subclasses extend this */
	public friendlyMessage(): string {
		return this.options?.friendlyMessage || this.message
	}
}
