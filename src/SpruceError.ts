import { HttpStatusCode } from './lib/httpStatusCodes'

export enum SpruceErrorCode {
	ServerError = 'SERVER_ERROR'
}

export interface IErrorOptions {
	/** A string error code. This should be in UPPER_SNAKE_CASE */
	code: SpruceErrorCode
	/** The HTTP status code that most closely corresponds to this error: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
	httpStatusCode: HttpStatusCode
}

export class SpruceError extends Error {
	/** The HTTP status code that most closely corresponds to this error: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
	public get httpStatusCode(): HttpStatusCode {
		return this._httpStatusCode
	}
	/** The error code */
	public get code(): SpruceErrorCode {
		return this._code
	}
	/** A reason this error was thrown that would be helpful to a developer */
	public get reason(): string {
		return this._reason
	}

	/** A message explaining what happened to a (non-developer) human */
	public get friendlyReason(): string {
		return this._friendlyReason
	}

	private _httpStatusCode: HttpStatusCode = HttpStatusCode.InternalServerError
	private _code: SpruceErrorCode = SpruceErrorCode.ServerError
	private _reason = ''
	private _friendlyReason = ''

	public constructor(options?: IErrorOptions | string) {
		super(
			typeof options === 'string'
				? (options as string)
				: options?.code || 'UNKNOWN_ERROR'
		)

		const errorOptions = options as IErrorOptions

		if (errorOptions?.code) {
			this.setCode(errorOptions.code)
		}
	}

	private setCode(code: SpruceErrorCode) {
		this._code = code
	}
}
