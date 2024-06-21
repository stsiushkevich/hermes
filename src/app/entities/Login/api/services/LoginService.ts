import {
  IError,
} from '@shared/types';

import BaseService from '@shared/services/BaseService';

import { Credentials } from '../../model/types';

const BASE_PATH = '/login';
const LOGOUT_PATH = '/logout';

export class LoginService extends BaseService<unknown> {
  login<R>(data: Credentials): Promise<R> {
    return super.post(data, { path: BASE_PATH });
  }

  logout<R>(data: Credentials): Promise<R> {
    return super.post(data, { path: LOGOUT_PATH });
  }
}

export default new LoginService();
