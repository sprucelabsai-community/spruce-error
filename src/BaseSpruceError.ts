import { SpruceErrorOptions, ISpruceErrorOptions } from './types'
import StackUtils from 'stack-utils'
const stack = new StackUtils({
	cwd: process.cwd(),
	internals: StackUtils.nodeInternals()
})

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
		this.stack = this.cleanStack()
	}

	/** Get a nice, readable version of the error. subclasses extend this */
	public friendlyMessage(): string {
		return this.options.friendlyMessage || this.message
	}

	/** Gets you a clean version of the track stack without all the extra node bs */
	public cleanStack() {
		return stack.clean(this.stack)
	}
}
