import { Response } from '../../types'

export default class ResponseUtils {
    static success = <Data>(data: Data): Response<Data> => {
        let body = { success: true, data }

        let resp: Response<Data> = {
            body: {
                data,
                success: true,

            },
            text: '',
            statusCode: 200,
            headers: {}
        }

        resp.text = JSON.stringify(resp)

        return resp
    }

    static failure = (code = 'error', message = 'Error', statusCode = 500): Response<null> => {
        let resp: Response<null> = {
            body: {
                data: null,
                success: false,
                error: { code, message }
            },
            text: '',
            headers: {},
            statusCode: statusCode,
        }

        resp.text = JSON.stringify(resp)

        return resp
    }
}