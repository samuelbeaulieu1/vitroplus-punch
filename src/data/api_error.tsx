import { Message } from "./message";
import { RequestFailure } from "./request_failure";
import { ApiResponse } from "./response";

export class ApiError extends Error {
    data: ApiResponse<Message | RequestFailure>;
    response: Response;

    constructor(response: Response, rawData: string, message?: string) {
        super(message);

        this.response = response;
        this.data = JSON.parse(rawData);
    }

    isMessageError(): boolean {
        return this.data.status === "error";
    }

    isInputError(): boolean {
        return this.data.status === "fail";
    }
}