export interface ISpruceErrorOptions {
	code: string
	friendlyMessage?: string
	originalError?: Error
}

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
