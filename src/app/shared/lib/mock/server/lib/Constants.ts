export const ERROR_CODES = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS'
}

export const ERROR_MESSAGES: Record<keyof typeof ERROR_CODES | string, string> = {
    [ERROR_CODES.INVALID_CREDENTIALS]: "Login or password are invalid, please try again"
}

export const ERRORS: Record<keyof typeof ERROR_CODES | string, { code: keyof typeof ERROR_CODES | string, message: string, statusCode: number }> = {
    [ERROR_CODES.INVALID_CREDENTIALS]: {
        code: ERROR_CODES.INVALID_CREDENTIALS,
        message: ERROR_MESSAGES[ERROR_CODES.INVALID_CREDENTIALS],
        statusCode: 403
    }
}