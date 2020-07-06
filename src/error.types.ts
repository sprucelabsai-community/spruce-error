import { HttpStatusCode } from './lib/httpStatusCodes'

// All error codes get dropped into this enum
export enum SpruceErrorCode {
	UnknownError = 'UNKNOWN_ERROR',
	MissingParameters = 'MISSING_PARAMETERS',
	InvalidParameters = 'INVALID_PARAMETERS',
}

// TODO find why `any` is required in Options generic
/** Parent interface for all error options */
export interface ISpruceErrorOptions<C extends any = any> {
	/** The code that should match your error constant */
	code: C
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

export interface ISpruceErrorUnknownError
	extends ISpruceErrorOptions<SpruceErrorCode> {
	/** * We aren't sure what happened */
	code: SpruceErrorCode.UnknownError
}

export interface ISpruceErrorMissingParameters
	extends ISpruceErrorOptions<SpruceErrorCode> {
	/** * Something is missing */
	code: SpruceErrorCode.MissingParameters
	parameters: string[]
}

export interface ISpruceErrorInvalidParameters
	extends ISpruceErrorOptions<SpruceErrorCode> {
	/** * Some parameter is bad */
	code: SpruceErrorCode.InvalidParameters
	parameters: string[]
}
