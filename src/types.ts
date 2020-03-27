import { HttpStatusCode } from './lib/httpStatusCodes'
import {  ISpruceErrorContextUnknown} from "./errors/unknownError";
import { ISpruceErrorContextMissingParamaters } from './errors/missingParameters';
import { ISpruceErrorContextInvalidParameters } from './errors/invalidParameters';

export * from './errors/unknownError'
export * from './errors/missingParameters'

// the basic context for all errors
export interface ISpruceErrorContext {}

// all error codes get dropped into this enum
export enum SpruceErrorCode {
    UnknownError = 'UNKNOWN_ERROR',
    MissingParameters = 'MISSING_PARAMETERS',
    InvalidParameters = 'INVALID_PARAMATERS'
}

/** parent interface for all error options */
export interface ISpruceErrorOptions<M extends ISpruceErrorMap = SpruceErrorMap, T extends keyof M = keyof M> {
    /** an easy to read version of the error */
    friendlyReason?:string
    /** tracking the error we caught previously if one exists  */
    lastError?: Error
	/** The HTTP status code that most closely corresponds to this error: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
	httpStatusCode?: HttpStatusCode
	/** the context with this error  */
    context: M[T]
   
}

/** mapping of codes to options */
export interface ISpruceErrorMap {
    [code: string]: ISpruceErrorContext
}

export type SpruceErrorMap = {
    [SpruceErrorCode.UnknownError]: ISpruceErrorContextUnknown
    [SpruceErrorCode.MissingParameters]: ISpruceErrorContextMissingParamaters
    [SpruceErrorCode.InvalidParameters]: ISpruceErrorContextInvalidParameters
}
