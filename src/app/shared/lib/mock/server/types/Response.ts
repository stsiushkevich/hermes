type Response<Data = null> = {
    statusCode: number
    headers?: Record<string, string>
    body: {
        success: boolean
        data: Data
        error?: {
            code: string
            message: string
        }
        [key: string]: unknown
    }
    text: string
}

export default Response