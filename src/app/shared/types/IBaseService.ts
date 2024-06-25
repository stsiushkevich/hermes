import Page from './Page';
import Primitive from './Primitive';
import QueryParams from './QueryParams';
import { IError } from "@shared/types/index";

export type BaseOptions = {
  url?: string,
  path?: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params?: QueryParams,
  [key: string]: Primitive | Primitive[] | QueryParams
};

export default interface IBaseService<E = unknown> {
  find: (options: BaseOptions) => Promise<E[] | Page<E[]> | IError>
  findOne: (options: BaseOptions) => Promise<E | IError>
  post: <R>(entity: E | FormData, options: BaseOptions) => Promise<R | IError>
  put: <R>(entity: E | FormData, options: BaseOptions) => Promise<R | IError>
  delete: <R>(options: BaseOptions) => Promise<R | IError>
}
