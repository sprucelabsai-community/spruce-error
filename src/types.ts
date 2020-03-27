import { HttpStatusCode } from './lib/httpStatusCodes'

// all error codes get dropped into this enum
export enum SpruceErrorCode {
	UnknownError = 'UNKNOWN_ERROR',
	MissingParameters = 'MISSING_PARAMETERS',
	InvalidParameters = 'INVALID_PARAMATERS'
}

/** parent interface for all error options */
export interface ISpruceErrorOptions {
	/** the code that should match your error constant */
	code: SpruceErrorCode
	/** an easy to read version of the error */
	friendlyReason?: string
	/** tracking the error we caught previously if one exists  */
	lastError?: Error
	/** The HTTP status code that most closely corresponds to this error: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
	httpStatusCode?: HttpStatusCode
}

/** error options */
export type SpruceErrorOptions =
	| ISpruceErrorUnknownError
	| ISpruceErrorMissingParameters
	| ISpruceErrorInvalidParameters

/** we aren't sure what happened */
export interface ISpruceErrorUnknownError extends ISpruceErrorOptions {
	code: SpruceErrorCode.UnknownError
}

/** something is missing */
export interface ISpruceErrorMissingParameters extends ISpruceErrorOptions {
	code: SpruceErrorCode.MissingParameters
	missingParamaters: string[]
}

/** some parameter is bad */
export interface ISpruceErrorInvalidParameters extends ISpruceErrorOptions {
	code: SpruceErrorCode.InvalidParameters
	missingParamaters: string[]
}
