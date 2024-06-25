import { useMutation } from '@tanstack/react-query';

import { IError } from "@shared/types";

import {
    User,
    Credentials
} from '../../model/types';

import service from '../services/LoginService';

function submit(data: Credentials) {
    return service.login<User>(data).catch(e => {
        console.log(e)
        throw e
    });
}

export default function useCredentialsSubmit() {
    return useMutation<User | IError, IError, Credentials, unknown>({ mutationFn: submit });
}
