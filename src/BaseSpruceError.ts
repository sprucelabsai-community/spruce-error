import { SpruceErrorOptions, ISpruceErrorOptions } from './error.types'

Error.stackTraceLimit = Infinity

export default class BaseSpruceError<
	T extends ISpruceErrorOptions = SpruceErrorOptions
> extends Error {
	public options: T
	public originalError?: Error
	public constructor(options: T) {
		const { code } = options

		super(code)
		this.options = options

		// Preserve the stack
		if (options.originalError) {
			this.stack = options.originalError.stack
			this.originalError = options.originalError
		}

		this.message = this.friendlyMessage()
	}

	/** Get a nice, readable version of the error. subclasses extend this */
	public friendlyMessage(): string {
		return this.options.friendlyMessage || this.message
	}

	/** Spruce errors stringify into something serialize'able */
	public toString() {
		return this.toJson()
	}

	/** Turn this error into a json string */
	public toJson() {
		return JSON.stringify({
			options: {
				...this.options,
				friendlyMessage: this.friendlyMessage()
			},
			stack: this.stack
		})
	}
}
