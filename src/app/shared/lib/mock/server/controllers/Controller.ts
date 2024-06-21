import UrlPattern from 'url-pattern'

import { Request } from '../types'

type Handler = () => {}

export default class Controller {
    getPath() { return '' }

    getHandlers() { return [] }

    handle(request: Request) {
        const { url, params } = request
        const handlers = this.getHandlers()

        for (let i = 0; i < handlers.length; i++) {
            const { path, handler } = handlers[i]

            const pattern = new UrlPattern(this.getPath() + path)
            const vars = pattern.match(url)

            if (vars) return handler(vars, params)
        }

        return null;
    }
}