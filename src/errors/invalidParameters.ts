
import { ISpruceErrorContext } from "../types";


export interface ISpruceErrorContextInvalidParameters extends ISpruceErrorContext {
    missingParamaters: string[]
}
