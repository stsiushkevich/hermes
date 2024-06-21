import BaseSchemeValidator from '@shared/validators/BaseSchemeValidator';

import { Credentials } from '@entities/Login/model/types';

import { CredentialsValidationErrors } from '../types';

import { CredentialsScheme } from '../schemes';

class CredentialsValidator extends BaseSchemeValidator<Credentials, CredentialsValidationErrors> {
  constructor() {
    super(CredentialsScheme);
  }
}

export default CredentialsValidator;
