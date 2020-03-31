export * from './src/AbstractSpruceError'
import AbstractSpruceError from './src/AbstractSpruceError'
export default AbstractSpruceError

export * from './src/types'
import { ISchemaDefinition } from '@sprucelabs/schema'

export function buildErrorDefinition<T extends ISchemaDefinition>(
	definition: T
): T {
	return definition
}
