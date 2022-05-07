import { AuthenticationCtx } from "components/Authentication";
import { NotificationHandler } from "components/Notification";
import { ApiError } from "data/api_error";
import { Message } from "data/message";
import { RequestFailure } from "data/request_failure";
import { ApiResponse } from "data/response";
import { env } from "env/env";

export const api = `${env.apiEndpoint}/${env.apiVersion}`

export interface RequestCtx {
    url: string;
    authentication?: AuthenticationCtx;
}

export function getHeaders(token?: string) {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token === undefined) {
        return headers;
    }

    return {
        ...headers,
        "Authorization": `Bearer ${token}`
    };
}

function responseToError(res: Response) {
    return res.text().then(text => {
        throw new ApiError(res, text, res.statusText);
    });
}

export function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
    if (!res.ok) {
        return responseToError(res);
    }

    return res.json() as Promise<ApiResponse<T>>;
}

export function handleBlobResponse(res: Response): Promise<Blob> {
    if (!res.ok) {
        return responseToError(res);
    }

    return res.blob() as Promise<Blob>;
}

export function handleError(error: Error, notificationHandler: NotificationHandler|null, authCtx?: AuthenticationCtx): string[] {
    if (error instanceof ApiError && error.response.status === 401) {
        authCtx?.connect();
    }
    
    if (notificationHandler !== null) {
        if (!(error instanceof ApiError)) {
            notificationHandler({
                message: error.message,
                type: "error",
            });
        } else {
            return handleApiError(error, notificationHandler);
        }
    }

    return [];
}

function handleApiError(error: ApiError, notificationHandler: NotificationHandler) {
    if (error.isInputError()) {
        const data = error.data.data as RequestFailure;
        notificationHandler({
            message: data.messages.join("\n"),
            type: "error",
            timeout: 2000 * data.messages.length,
        });

        return data.fields;
    } else {
        const data = error.data.data as Message;
        notificationHandler({
            message: data.message,
            type: "error",
        });
    }

    return [];
}

export function onError(e: Error): Error {
    if (!(e instanceof ApiError))
        return new Error("Erreur inattendue");

    return e;
}

export function get<T>(ctx: RequestCtx): Promise<ApiResponse<T>> {
    const opts = {
        headers: getHeaders(ctx.authentication?.session?.token),
    }

    return fetch(ctx.url, opts).then((res) => handleResponse<T>(res)).catch((e) => {
        throw onError(e);
    });
}

export function post<T>(ctx: RequestCtx, body: object = {}): Promise<ApiResponse<T>> {
    const opts = {
        method: "POST",
        headers: getHeaders(ctx.authentication?.session?.token),
        body: JSON.stringify(body)
    }

    return fetch(ctx.url, opts).then(res => handleResponse<T>(res)).catch((e) => {
        throw onError(e);
    });
}

export function put<T>(ctx: RequestCtx, body: object = {}): Promise<ApiResponse<T>> {
    const opts = {
        method: "PUT",
        headers: getHeaders(ctx.authentication?.session?.token),
        body: JSON.stringify(body)
    }

    return fetch(ctx.url, opts).then(res => handleResponse<T>(res)).catch((e) => {
        throw onError(e);
    });
}

export function del<T>(ctx: RequestCtx): Promise<ApiResponse<T>> {
    const opts = {
        method: "DELETE",
        headers: getHeaders(ctx.authentication?.session?.token),
    }

    return fetch(ctx.url, opts).then(res => handleResponse<T>(res)).catch((e) => {
        throw onError(e);
    });
}