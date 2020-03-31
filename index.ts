export * from './src/SpruceError'
import SpruceError from './src/SpruceError'
export default SpruceError
export * from './src/types'
import { ISchemaDefinition } from '@sprucelabs/schema'

export function buildErrorDefinition<T extends ISchemaDefinition>(
	definition: T
): T {
	return definition
}
