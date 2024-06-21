type Request = {
    url: string
    method: string
    params?: Record<string, unknown>
    headers?: Record<string, string>
    body?: unknown
}

export default Request