import { ValidationError, type ErrorObject, type ValidateFunction } from "ajv/dist/2019";


export class ValidationService {
	// TODO: implement svelte logger
	//private readonly logger = new Logger(ValidationService.name);

	validate<T>(id: string, f: ValidateFunction<T>, data: unknown): T {
		if (f(data)) {
			return data as T;
		} else {
			//this.logger.error(`Invalid ${id}: ${JSON.stringify(f.errors, null, 4)}`);
			throw new ValidationError(f.errors as ErrorObject[]);
		}
	}
}
