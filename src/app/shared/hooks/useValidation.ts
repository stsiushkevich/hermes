import {
  useState,
  useCallback,
} from 'react';

import IValidator from '../types/IValidator';
import ValidationErrors from '../types/ValidationErrors';

function useValidation<Data, Errors extends ValidationErrors>(validator: IValidator<Data, Errors>) {
  const [errors, setErrors] = useState<Errors>({} as Errors);

  const validate = useCallback((data: Data, options?: object) => (
    new Promise<boolean | Errors>((resolve, reject) => {
      validator.validate(data, options)
        .then(() => {
          setErrors({} as Errors);
          resolve(true);
          return true;
        })
        .catch((e: Errors) => {
          setErrors(e);
          reject(e);
        });
    })
  ), [validator]);

  return { errors, validate };
}

export default useValidation;
