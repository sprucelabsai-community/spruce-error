import { HttpStatusCode } from './lib/httpStatusCodes'

// TODO find why `any` is required in Options generic
/** Parent interface for all error options */
export interface ISpruceErrorOptions {
	/** Error code in CONST_CASE */
	code: string
	/** An easy to read version of the error */
	friendlyMessage?: string
	/** Tracking the error we caught previously if one exists  */
	originalError?: Error
	/** The HTTP status code that most closely corresponds to this error: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
	httpStatusCode?: HttpStatusCode
}

/** Error options */
export type SpruceErrorOptions =
	| ISpruceErrorUnknownError
	| ISpruceErrorMissingParameters
	| ISpruceErrorInvalidParameters

export interface ISpruceErrorUnknownError extends ISpruceErrorOptions {
	/** * We aren't sure what happened */
	code: 'UNKNOWN_ERROR'
}

export interface ISpruceErrorMissingParameters extends ISpruceErrorOptions {
	/** * Something is missing */
	code: 'MISSING_PARAMETERS'
	parameters: string[]
}

export interface ISpruceErrorInvalidParameters extends ISpruceErrorOptions {
	/** * Some parameter is bad */
	code: 'INVALID_PARAMETERS'
	parameters: string[]
}
