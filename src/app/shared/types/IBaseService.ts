import Page from './Page';
import Primitive from './Primitive';
import QueryParams from './QueryParams';

export type BaseOptions = {
  url?: string,
  path?: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params?: QueryParams,
  [key: string]: Primitive | Primitive[] | QueryParams
};

export default interface IBaseService<E = unknown> {
  find: (options: BaseOptions) => Promise<E[] | Page<E[]>>
  findOne: (options: BaseOptions) => Promise<E>
  post: <R>(entity: E | FormData, options: BaseOptions) => Promise<R>
  put: <R>(entity: E | FormData, options: BaseOptions) => Promise<R>
  delete: <R>(options: BaseOptions) => Promise<R>
}
