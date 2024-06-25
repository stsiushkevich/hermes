import UrlPattern from 'url-pattern'

import { Request } from '../types'
import { ERRORS } from '../lib/Constants'

import ResponseUtils from "@shared/lib/mock/server/lib/utils/ResponseUtils";


export default class Controller {
    getPath() { return '' }

    getHandlers() { return [] }

    handle(request: Request) {
        const { url, params, body } = request
        const handlers = this.getHandlers()

        for (let i = 0; i < handlers.length; i++) {
            const { path, handler } = handlers[i]

            const pattern = new UrlPattern(this.getPath() + path)
            const vars = pattern.match(url)

            if (vars) return handler(vars, params ?? body)
        }

        const e = ERRORS.NOT_FOUND
        return ResponseUtils.failure(e.code, e.message, e.statusCode);
    }
}