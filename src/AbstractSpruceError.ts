import { SpruceErrorOptions, ISpruceErrorOptions } from './error.types'

Error.stackTraceLimit = Infinity

type MyInstanceType<T extends { prototype: any }> = T['prototype']

export default abstract class AbstractSpruceError<
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
			if (options.originalError instanceof Error) {
				this.stack = options.originalError.stack
				this.originalError = options.originalError
			} else if (typeof options.originalError === 'string') {
				this.originalError = new Error(options.originalError)
			}
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
				friendlyMessage: this.friendlyMessage(),
			},
			stack: this.stack,
		})
	}

	public static parse<T extends { prototype: any }>(
		json: string,
		ClassRef: T
	): MyInstanceType<T> {
		try {
			const { options, stack } = JSON.parse(json)

			// @ts-ignore
			const err = new ClassRef(options)
			err.stack = stack

			return err
		} catch (err) {
			// @ts-ignore
			return new ClassRef({
				code: 'UNKNOWN_ERROR',
				friendlyMessage: `I was not able to parse an incoming error. Original message is ${json}.`,
				originalError: new Error(json),
			})
		}
	}
}
