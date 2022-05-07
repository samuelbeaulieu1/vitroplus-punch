import { AuthenticationCtx } from 'components/Authentication';
import { AdminUpdate } from 'data/admin_update';
import { Message } from 'data/message';
import { Session } from 'data/session';
import { api, post, put } from './api';

const endpoint = "Admin";

export const updatePassword = (auth: AuthenticationCtx, req: AdminUpdate): Promise<Message> => {
    return put<Message>({
        url: `${api}/${endpoint}`,
        authentication: auth,
    }, req).then(res => res.data);
}

export const authenticate = (password: string): Promise<Session> => {
    return post<Session>({
        url: `${api}/${endpoint}`,
    }, { password }).then(res => res.data);
}