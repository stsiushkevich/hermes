import axios from 'axios'

import {
    Page,
    IError,
    QueryParams,
    ServerError,
    ServerResponse,
} from '../types';

import IBaseService, {
    BaseOptions,
} from '../types/IBaseService';

import server from '../lib/mock/server/Server'

import { Response } from '../lib/mock/server/types'

import { config } from '../../../../config'

const BACKEND_SERVER_URL = config.backendServer.url

type Request = {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    params?: QueryParams
    body?: unknown
}

function getUrl(path: string, params?: QueryParams): string {
    const s = path.charAt(0) === '/' ? '' : '/';
    const url = `${BACKEND_SERVER_URL}${s}${path}`;

    if (!params) return url;

    const isNotEmpty = (v: unknown) => ![null, undefined].includes(v);

    const parameters = Object.entries(params).reduce((m, [name, value]) => (
        isNotEmpty(value) ? { ...m, [name]: value } : m
    ), {});

    if (!Object.keys(parameters).length) return url;

    const builder = new URLSearchParams();

    Object.entries(parameters).forEach(([name, value]) => {
        builder.append(name, String(value));
    });

    return `${url}?${builder.toString()}`;
}

function onSuccess<D>(o: Response<D>): Promise<D> {
    if ([200, 201, 202].includes(o.statusCode)) {
        return Promise.resolve(o.body?.data)
    }

    const { code, message } = o.body?.error
    throw new ServerError(code, message)
}

export default class BaseService<E = unknown> implements IBaseService<E> {
    request<D>(request: Request): Promise<D> {
      return server.service(request) as Promise<D>
    }

    find(options: BaseOptions): Promise<E[] | Page<E[]>> {
        const {
            url,
            path,
            params,
        } = options;

        //return axios.get<E[]>(url ?? getUrl(path, params)).then(onSuccess);
        return this
            .request({ url: url ?? getUrl(path, params), method: 'GET', params })
            .then((o: Response<E[] | Page<E[]>>) => onSuccess(o));
    }

    findOne(options: BaseOptions): Promise<E> {
        const {
            url,
            path,
            params,
        } = options;

        //return axios.get(url ?? getUrl(path, params)).then(onSuccess);
        return this
            .request({ url: url ?? getUrl(path, params), method: 'GET', params })
            .then((o: Response<E>) => onSuccess(o))
    }

    post<R>(entity: E | FormData, options: BaseOptions): Promise<R> {
        const {
            url,
            path,
            params,
        } = options;

        //return axios.post(url ?? getUrl(path, params), entity);
        return this
            .request({ url: url ?? getUrl(path, params), method: 'POST', body: entity })
            .then((o: Response<R>) => onSuccess(o));
    }

    put<R>(entity: E | FormData, options: BaseOptions): Promise<R> {
        const {
            url,
            path,
            params,
        } = options;

        //return axios.put(url ?? getUrl(path, params), entity).then(onSuccess);
        return this
            .request({ url: url ?? getUrl(path, params), method: 'PUT', body: entity })
            .then((o: Response<R>) => onSuccess(o));
    }

    delete<R>(options: BaseOptions): Promise<R> {
        const {
            url,
            path,
            params
        } = options;

        //return axios.delete(url ?? getUrl(path, params)).then(onSuccess);
        return this
            .request({ url: url ?? getUrl(path, params), method: 'DELETE', params })
            .then((o: Response<R>) => onSuccess(o));
    }
}
