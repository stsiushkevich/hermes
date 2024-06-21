import { AxiosResponse } from 'axios'

type ServerResponse<T = unknown, D = unknown> = AxiosResponse<T, D>

export default ServerResponse;