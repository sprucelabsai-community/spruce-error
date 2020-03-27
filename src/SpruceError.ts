import { ISpruceErrorOptions, SpruceErrorMap, ISpruceErrorMap } from './types'

export default class SpruceError<
	M extends ISpruceErrorMap = SpruceErrorMap,
	C extends keyof M = keyof M,
	T extends ISpruceErrorOptions<M, C> = ISpruceErrorOptions<M, C>
> extends Error {
	public code: C
	public options?: T
	public lastError?: Error

	public constructor(code: C, options?: T) {
		super(code as string)

		this.code = code
		this.options = options

		// preserve the stac
		if (options?.lastError) {
			this.stack = options.lastError.stack
		}
	}

	/** get a nice, readable version of the error. subclasses extend this */
	public friendlyMessage(): string {
		return this.message
	}
}
