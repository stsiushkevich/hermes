import {
  setLocale,
  AnySchema,
  defaultLocale,
  ValidationError as YupValidationError,
} from 'yup';

import { setProperty } from '../lib/utils/ObjectMutationUtils';

import IValidator from '../types/IValidator';
import ValidationErrors from '../types/ValidationErrors';

type Options = {
  // when true, parsing is skipped and the input is validated "as-is"
  strict: boolean;
  // Throw on the first error or collect and return all
  abortEarly: boolean;
  // Remove unspecified keys from objects
  stripUnknown: boolean;
  // when `false` validations will be performed shallowly
  recursive: boolean;
  // External values that can be provided to validations and conditionals
  context?: object;
};

class BaseSchemeValidator<Data, Errors extends ValidationErrors> implements IValidator<Data, Errors> {
  constructor(private scheme: AnySchema) {}

  static setup(configuration: typeof defaultLocale) {
    setLocale(configuration);
  }

  formatErrors({ inner }: YupValidationError): ValidationErrors {
    return inner.reduce((m, error) => {
      const e = !Object.keys(error.inner).length ? error.errors[0] : this.formatErrors(error);
      setProperty(m, error.path.replace(/\[(\w+)\]/g, '.[$1]'), e);
      return m;
    }, {});
  }

  validate(data: Data, options?: Options): Promise<boolean | Errors> {
    return new Promise((resolve, reject) => {
      this.scheme.validate(data, {
        abortEarly: false,
        context: options,
      })
        .then(() => resolve(true))
        .catch((error: YupValidationError) => reject(this.formatErrors(error)));
    });
  }
}

export default BaseSchemeValidator;
