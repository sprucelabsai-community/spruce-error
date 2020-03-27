import { ISpruceErrorOptions, SpruceErrorMap, ISpruceErrorMap } from "./types";

export default class SpruceError<
	M extends ISpruceErrorMap = SpruceErrorMap,
	C extends keyof M = keyof M,
	T extends ISpruceErrorOptions<M, C> = ISpruceErrorOptions<M, C>
	> extends Error {

	public readonly code: C;
	public options?: T;

	public constructor(code: C, options?: T) {
		super(code as string);
		this.code = code;
		this.options = options;
	}
}

