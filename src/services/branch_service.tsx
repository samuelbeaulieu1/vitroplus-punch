import { AuthenticationCtx } from 'components/Authentication';
import { Branch } from 'data/branch';
import { Message } from 'data/message';
import { del, get, post, api, put } from './api';

const endpoint = "Branch";

export const getBranches = (auth: AuthenticationCtx): Promise<Branch[]> => {
    return get<Branch[]>({
        url: `${api}/${endpoint}`,
        authentication: auth,
    }).then(res => res.data);
}

export const getBranch = (auth: AuthenticationCtx, id: string): Promise<Branch> => {
    return get<Branch>({
        url: `${api}/${endpoint}/${id}`,
        authentication: auth,
    }).then(res => res.data);
}

export const deleteBranch = (auth: AuthenticationCtx, id: string): Promise<Message> => {
    return del<Message>({
        url: `${api}/${endpoint}/${id}`,
        authentication: auth,
    }).then(res => res.data);
}

export const createBranch = (auth: AuthenticationCtx, branch: Branch): Promise<Branch> => {
    return post<Branch>({
        url: `${api}/${endpoint}`,
        authentication: auth,
    }, branch).then(res => res.data);
}

export const updateBranch = (auth: AuthenticationCtx, branch: Branch): Promise<Message> => {
    return put<Message>({
        url: `${api}/${endpoint}/${branch.id}`,
        authentication: auth,
    }, branch).then(res => res.data);
}