import { ErrorOptions, SpruceErrorOptions } from './error.types'

Error.stackTraceLimit = Infinity

type MyInstanceType<T extends { prototype: any }> = T['prototype']

export default abstract class AbstractSpruceError<
	T extends ErrorOptions = SpruceErrorOptions
> extends Error {
	public options: T
	public originalError?: Error
	public constructor(options: T) {
		const { code } = options

		super(code)
		this.options = options

		if (options.originalError) {
			if (options.originalError instanceof Error) {
				this.stack = options.originalError.stack
				this.originalError = options.originalError
				//@ts-ignore
			} else if (options.originalError.isJavascriptError) {
				//@ts-ignore
				this.originalError = new Error(options.originalError.message)
				//@ts-ignore
				this.originalError.name = options.originalError.name
				//@ts-ignore
				this.originalError.stack = options.originalError.stack
				//@ts-ignore
			} else if (options.originalError && options.originalError.options) {
				this.originalError = new GenericOriginalError(
					//@ts-ignore
					options.originalError.options
				)
			}
		}

		this.message = this.friendlyMessage()
	}

	public friendlyMessage(): string {
		return this.options.friendlyMessage || this.message
	}

	public toString() {
		return this.toJson()
	}

	private serializeOriginalError(options: T) {
		let serializedOptions = { ...options }

		if (
			!(serializedOptions.originalError instanceof AbstractSpruceError) &&
			serializedOptions.originalError instanceof Error
		) {
			serializedOptions.originalError = {
				//@ts-ignore
				isJavascriptError: true,
				message: serializedOptions.originalError.message,
				stack: serializedOptions.originalError.stack,
				name: serializedOptions.originalError.name,
			}
		}
		return serializedOptions
	}

	public toJson() {
		return JSON.stringify(this.toObject())
	}

	public toObject(): any {
		const obj: Record<string, any> = {
			options: {
				...this.serializeOriginalError(this.options),
				friendlyMessage: this.friendlyMessage(),
			},
		}
		if (this.stack) {
			obj.stack = this.stack
		}

		return obj
	}

	public static parse<T extends { prototype: any }>(
		json: string | Record<string, any>,
		ClassRef: T
	): MyInstanceType<T> {
		try {
			const { options, stack } =
				typeof json === 'string' ? JSON.parse(json) : json

			// @ts-ignore
			const err = new ClassRef(options)
			err.stack = stack

			return err
		} catch (err) {
			const stringified = typeof json === 'string' ? json : JSON.stringify(json)
			// @ts-ignore
			return new ClassRef({
				code: 'UNKNOWN_ERROR',
				friendlyMessage: `I was not able to parse an incoming error. Original message is ${stringified}.`,
				originalError: new Error(stringified),
			})
		}
	}
}

class GenericOriginalError extends AbstractSpruceError {}
