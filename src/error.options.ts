export interface ErrorOptions {
	code: string
	friendlyMessage?: string
	originalError?: Error
}

export type SpruceErrorOptions =
	| SpruceErrorUnknownError
	| SpruceErrorMissingParameters
	| SpruceErrorInvalidParameters

export interface SpruceErrorUnknownError extends ErrorOptions {
	/** * We aren't sure what happened */
	code: 'UNKNOW`N_ERROR'
}

export interface SpruceErrorMissingParameters extends ErrorOptions {
	/** * Something is missing */
	code: 'MISSING_PARAMETERS'
	parameters: string[]
}

export interface SpruceErrorInvalidParameters extends ErrorOptions {
	/** * Some parameter is bad */
	code: 'INVALID_PARAMETERS'
	parameters: string[]
}
