import { useMutation } from '@tanstack/react-query';

import { IError } from "@shared/types";

import {
    User,
    Credentials
} from '../../model/types';

import service from '../services/LoginService';

function submit(data: Credentials) {
    return service.login<User>(data);
}

export default function useCredentialsSubmit() {
    return useMutation<User, IError, Credentials, unknown>({ mutationFn: submit });
}
