import { IError } from './';

class ServerError extends Error implements IError {
  public readonly code: string;

  constructor(code?: string, message?: string) {
    super(message || '');
    this.code = code || 'UNKNOWN_CODE';
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
